import { ClipboardList, PackageSearch } from 'lucide-react';
import AppLayout from '@/components/app-layout';
import { getUserById } from '@/lib/data';

const navItems = [
  { href: '/technician/dashboard', label: 'Task Dashboard', icon: ClipboardList, tooltip: 'Dashboard' },
  { href: '/technician/inventory', label: 'Parts Inventory', icon: PackageSearch, tooltip: 'Inventory' },
];

export default async function TechnicianLayout({ children }: { children: React.ReactNode }) {
  // In a real app, you'd get the logged-in user's ID from a session.
  const user = await getUserById('user-2');

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <AppLayout user={user} navItems={navItems}>
      {children}
    </AppLayout>
  );
}
