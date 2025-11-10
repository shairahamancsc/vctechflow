import { ClipboardList, PlusCircle } from 'lucide-react';
import AppLayout from '@/components/app-layout';
import { getUserById } from '@/lib/data';

const navItems = [
  { href: '/customer/dashboard', label: 'My Dashboard', icon: ClipboardList, tooltip: 'Dashboard' },
  { href: '/customer/requests/new', label: 'New Request', icon: PlusCircle, tooltip: 'New Request' },
];

export default async function CustomerLayout({ children }: { children: React.ReactNode }) {
  // In a real app, you'd get the logged-in user's ID from a session.
  const user = await getUserById('user-1');

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <AppLayout user={user} navItems={navItems}>
      {children}
    </AppLayout>
  );
}
