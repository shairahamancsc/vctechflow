import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the admin control panel.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
          <CardDescription>System statistics and quick actions.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Admin content will go here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
