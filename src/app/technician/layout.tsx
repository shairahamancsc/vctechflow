import AppLayout from '@/components/app-layout';
import { getUserById } from '@/lib/data';

export default async function TechnicianLayout({ children }: { children: React.ReactNode }) {
  // In a real app, you'd get the logged-in user's ID from a session.
  const user = await getUserById('user-2');

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <AppLayout user={user} userRole="technician">
      {children}
    </AppLayout>
  );
}
