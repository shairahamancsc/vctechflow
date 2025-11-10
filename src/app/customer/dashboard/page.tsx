import Link from 'next/link';
import { ArrowRight, PlusCircle } from 'lucide-react';
import { getServiceRequestsByCustomerId } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import StatusBadge from '@/components/status-badge';
import { Separator } from '@/components/ui/separator';

export default async function CustomerDashboard() {
  // In a real app, you'd get the logged-in user's ID from a session.
  const requests = await getServiceRequestsByCustomerId('user-1');

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-headline">My Service Requests</h1>
          <p className="text-muted-foreground">Track all your ongoing and past printer repairs.</p>
        </div>
        <Button asChild>
          <Link href="/customer/requests/new">
            <PlusCircle className="mr-2" />
            New Request
          </Link>
        </Button>
      </div>

      {requests.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {requests.map((request) => (
            <Card key={request.id} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-semibold">{request.printerModel}</CardTitle>
                  <StatusBadge status={request.status} />
                </div>
                <CardDescription>Request ID: {request.id}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-3">{request.issueDescription}</p>
              </CardContent>
              <Separator className="my-4" />
              <CardFooter className="flex justify-between items-center">
                 <p className="text-xs text-muted-foreground">
                    Last updated: {request.updatedAt.toLocaleDateString()}
                 </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/customer/dashboard/${request.id}`}>
                    View Details <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <CardHeader>
            <CardTitle>No service requests yet</CardTitle>
            <CardDescription>Ready to get your printer fixed? Submit your first request!</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/customer/requests/new">
                <PlusCircle className="mr-2" />
                Create New Service Request
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
