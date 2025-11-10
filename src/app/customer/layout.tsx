import AppLayout from '@/components/app-layout';
import { getUserById } from '@/lib/data';

export default async function CustomerLayout({ children }: { children: React.ReactNode }) {
  // In a real app, you'd get the logged-in user's ID from a session.
  const user = await getUserById('user-1');

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <AppLayout user={user} userRole="customer">
      {children}
    </AppLayout>
  );
}
