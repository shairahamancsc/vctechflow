
'use client';
import { use, useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { getUserById, getServiceRequestsByCustomerId } from '@/lib/data';
import type { User, ServiceRequest, ServiceLog, Part } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Mail, Phone, MessageSquare, Wrench, Package, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

function CustomerDetails({ user, requests }: { user: User; requests: ServiceRequest[] }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Service History</CardTitle>
          <CardDescription>All service requests submitted by {user.name}.</CardDescription>
        </CardHeader>
        <CardContent>
          {requests.length > 0 ? (
            <div className="space-y-8">
              {requests.map((req) => (
                <div key={req.id} className="border-b pb-8 last:border-b-0">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{req.printerModel}</h3>
                      <p className="text-sm text-muted-foreground">Request ID: {req.id}</p>
                    </div>
                    <Badge variant="outline">{req.status}</Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">{req.issueDescription}</p>
                  <h4 className="font-semibold mb-2">Service Log & Parts</h4>
                  <div className="space-y-4">
                    {req.logs
                      .filter((log) => log.partsUsed && log.partsUsed.length > 0)
                      .map((log, index) => (
                        <Card key={index} className="bg-muted/50">
                          <CardContent className="p-4">
                            <p className="font-medium text-sm mb-2">{log.note}</p>
                            <div className="flex items-center text-xs text-muted-foreground mb-2">
                              <span>{log.timestamp.toLocaleDateString()}</span>
                            </div>
                            <div className="space-y-1">
                              {log.partsUsed?.map((part) => (
                                <div key={part.id} className="flex items-center gap-2 text-sm">
                                  <Package className="h-4 w-4" />
                                  <span>{part.name}</span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No service requests found for this customer.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function TechnicianDetails({ user }: { user: User }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Technician Details</CardTitle>
          <CardDescription>Profile and communication.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Assigned tasks and performance metrics would be displayed here.</p>
          <div className="space-y-2">
            <label htmlFor="message" className="font-medium">Send a Message</label>
            <textarea
              id="message"
              placeholder={`Write a message or guidance for ${user.name}...`}
              className="w-full min-h-[100px] p-2 border rounded-md bg-transparent"
            />
          </div>
          <Button>
            <MessageSquare className="mr-2 h-4 w-4" />
            Send Message
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default function UserDetailsPage({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [requests, setRequests] = useState<ServiceRequest[]>([]);

  useEffect(() => {
    async function fetchData() {
      const fetchedUser = await getUserById(params.id);
      setUser(fetchedUser);

      if (fetchedUser?.role === 'customer') {
        const fetchedRequests = await getServiceRequestsByCustomerId(fetchedUser.id);
        setRequests(fetchedRequests);
      }
    }
    fetchData();
  }, [params.id]);


  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading user details...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
         <Button variant="outline" size="icon" asChild>
            <Link href="/admin/users"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <h1 className="text-3xl font-bold font-headline">User Profile</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader className="items-center text-center">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <CardTitle>{user.name}</CardTitle>
              <Badge variant="secondary" className="capitalize">{user.role}</Badge>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>(123) 456-7890</span>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2">
          {user.role === 'customer' && <CustomerDetails user={user} requests={requests} />}
          {user.role === 'technician' && <TechnicianDetails user={user} />}
          {user.role === 'admin' && (
            <Card>
              <CardHeader>
                <CardTitle>Administrator</CardTitle>
              </CardHeader>
              <CardContent>
                <p>This user has full system privileges.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
