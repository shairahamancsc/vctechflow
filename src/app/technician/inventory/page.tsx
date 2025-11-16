
'use client';
import { getAllParts } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useStream } from '@/hooks/use-stream';
import { Part } from '@/lib/types';

export default function InventoryPage() {
  const { data: parts, loading } = useStream<Part>(getAllParts());

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Parts Inventory</h1>
        <p className="text-muted-foreground">A list of all available replacement parts.</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Available Parts</CardTitle>
          <CardDescription>Current stock levels for all parts.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Part ID</TableHead>
                <TableHead>Part Name</TableHead>
                <TableHead className="text-right">Stock</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">Loading parts...</TableCell>
                </TableRow>
              )}
              {parts && parts.map((part) => (
                <TableRow key={part.id}>
                  <TableCell className="font-medium">{part.id}</TableCell>
                  <TableCell>{part.name}</TableCell>
                  <TableCell className="text-right">{part.stock}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
