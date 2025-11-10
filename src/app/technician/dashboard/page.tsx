import Link from 'next/link';
import { getAllServiceRequests } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import StatusBadge from '@/components/status-badge';

export default async function TechnicianDashboard() {
  const requests = await getAllServiceRequests();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Technician Dashboard</h1>
        <p className="text-muted-foreground">Manage all incoming and ongoing service requests.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Service Requests</CardTitle>
          <CardDescription>A list of all service requests in the system.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Printer Model</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.id}</TableCell>
                  <TableCell>{request.customer.name}</TableCell>
                  <TableCell>{request.printerModel}</TableCell>
                  <TableCell>
                    <StatusBadge status={request.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/technician/dashboard/${request.id}`}>
                        Manage
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
