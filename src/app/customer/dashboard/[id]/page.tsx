import { getServiceRequestById } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import StatusBadge from '@/components/status-badge';
import StatusTimeline from '@/components/status-timeline';
import { notFound } from 'next/navigation';
import { Printer, User, Wrench } from 'lucide-react';

export default async function RequestDetailsPage({ params }: { params: { id: string } }) {
  const request = await getServiceRequestById(params.id);

  if (!request) {
    notFound();
  }

  return (
    <div className="space-y-6">
       <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold font-headline">Request Details</h1>
          <p className="text-muted-foreground">Detailed view of service request {request.id}</p>
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
                        <Wrench className="h-5 w-5 text-muted-foreground" />
                        <div>
                            <p className="text-sm text-muted-foreground">Technician</p>
                            <p className="font-medium">{request.technician?.name || 'Not assigned'}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Issue Description</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{request.issueDescription}</p>
                </CardContent>
            </Card>
        </div>

        <div className="md:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle>Status History</CardTitle>
                </CardHeader>
                <CardContent>
                    <StatusTimeline logs={request.logs} currentStatus={request.status} />
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
