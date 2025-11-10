import { getServiceRequestById, getAllParts } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Printer, User, Wrench, MessageSquare } from 'lucide-react';
import StatusBadge from '@/components/status-badge';
import StatusTimeline from '@/components/status-timeline';
import { updateServiceRequest } from '@/app/actions';
import { serviceRequestStatuses } from '@/lib/types';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

async function UpdateStatusForm({ requestId, currentStatus }: { requestId: string, currentStatus: string }) {
    return (
        <form action={updateServiceRequest} className="space-y-4">
            <input type="hidden" name="id" value={requestId} />
            <div className="space-y-2">
                <Label htmlFor="status">Update Status</Label>
                <Select name="status" defaultValue={currentStatus}>
                    <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                        {serviceRequestStatuses.map((status) => (
                            <SelectItem key={status} value={status}>
                                {status}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
             <div className="space-y-2">
                <Label htmlFor="technicianNote">Add a Note</Label>
                <Textarea id="technicianNote" name="technicianNote" placeholder="Log parts used, work performed, etc." />
            </div>
            <Button type="submit" className="w-full">Update Request</Button>
        </form>
    );
}

export default async function ManageRequestPage({ params }: { params: { id: string } }) {
  const request = await getServiceRequestById(params.id);

  if (!request) {
    notFound();
  }

  return (
    <div className="space-y-6">
       <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold font-headline">Manage Request</h1>
          <p className="text-muted-foreground">Updating service request {request.id}</p>
        </div>
        <StatusBadge status={request.status} className="text-base" />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Service Request Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="flex items-center gap-4">
                        <Printer className="h-5 w-5 text-muted-foreground" />
                        <div>
                            <p className="text-sm text-muted-foreground">Printer Model</p>
                            <p className="font-medium">{request.printerModel}</p>
                        </div>
                    </div>
                    <Separator />
                     <div className="flex items-center gap-4">
                        <User className="h-5 w-5 text-muted-foreground" />
                        <div>
                            <p className="text-sm text-muted-foreground">Customer</p>
                            <p className="font-medium">{request.customer.name}</p>
                        </div>
                    </div>
                    <Separator />
                     <div className="flex items-center gap-4">
                        <MessageSquare className="h-5 w-5 text-muted-foreground" />
                        <div>
                            <p className="text-sm text-muted-foreground">Issue Description</p>
                            <p className="font-medium">{request.issueDescription}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Service Log</CardTitle>
                </CardHeader>
                <CardContent>
                    <StatusTimeline logs={request.logs} currentStatus={request.status} />
                </CardContent>
            </Card>
        </div>

        <div className="md:col-span-1">
            <Card className="sticky top-20">
                <CardHeader>
                    <CardTitle>Update Service</CardTitle>
                    <CardDescription>Change the request status and add notes.</CardDescription>
                </CardHeader>
                <CardContent>
                    <UpdateStatusForm requestId={request.id} currentStatus={request.status} />
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
