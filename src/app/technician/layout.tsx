import AppLayout from '@/components/app-layout';
import { getUserById } from '@/lib/data';
import { headers } from 'next/headers';

export default async function TechnicianLayout({ children }: { children: React.ReactNode }) {
  // Check if navigating from the admin portal
  const referer = headers().get('referer');
  const isAdminReferer = referer?.includes('/admin');

  // In a real app, you'd get the logged-in user's ID from a session.
  // For this demo, we'll use the admin user if coming from the admin section.
  const userId = isAdminReferer ? 'user-3' : 'user-2';
  const user = await getUserById(userId);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <AppLayout user={user} userRole={user.role as 'technician' | 'admin'}>
      {children}
    </AppLayout>
  );
}
