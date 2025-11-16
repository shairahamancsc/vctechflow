
'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Logo from '@/components/logo';
import type { User } from '@/lib/types';
import { LogOut, ClipboardList, PlusCircle, PackageSearch, MoreVertical, ShieldCheck } from 'lucide-react';
import NavigationButtons from './navigation-buttons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from './ui/button';

const iconMap = {
  ClipboardList,
  PlusCircle,
  PackageSearch,
  ShieldCheck,
};

type NavItem = {
  href: string;
  label: string;
  icon: keyof typeof iconMap;
  tooltip: string;
};

const customerNavItems: NavItem[] = [
  { href: '/customer/dashboard', label: 'My Dashboard', icon: 'ClipboardList', tooltip: 'Dashboard' },
  { href: '/customer/requests/new', label: 'New Request', icon: 'PlusCircle', tooltip: 'New Request' },
];

const technicianNavItems: NavItem[] = [
  { href: '/technician/dashboard', label: 'Task Dashboard', icon: 'ClipboardList', tooltip: 'Dashboard' },
  { href: '/technician/inventory', label: 'Parts Inventory', icon: 'PackageSearch', tooltip: 'Inventory' },
];

const baseAdminNavItems: NavItem[] = [
  { href: '/admin/dashboard', label: 'Admin Dashboard', icon: 'ShieldCheck', tooltip: 'Admin Dashboard' },
];

const adminNavItems: NavItem[] = [
  ...baseAdminNavItems,
  ...customerNavItems.map(item => ({...item, label: `Customer: ${item.label}`})),
  ...technicianNavItems.map(item => ({...item, label: `Technician: ${item.label}`})),
];


const navItemsMap = {
  customer: customerNavItems,
  technician: technicianNavItems,
  admin: adminNavItems,
}

type AppLayoutProps = {
  user: User;
  userRole: 'customer' | 'technician' | 'admin';
  children: React.ReactNode;
};

function AppSidebar({ user, navItems }: { user: User; navItems: NavItem[] }) {
  const pathname = usePathname();
  const { open: sidebarOpen } = useSidebar();

  return (
    <>
      <SidebarHeader>
        <Logo showText={sidebarOpen} />
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith(item.href)}
                  tooltip={{ children: item.tooltip, side: 'right' }}
                >
                  <Link href={item.href}>
                    <Icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <Separator />
      <SidebarFooter>
        <div className="flex items-center gap-3 p-2">
          <Avatar>
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className={`overflow-hidden transition-all ${sidebarOpen ? 'w-full' : 'w-0'}`}>
            <p className="font-semibold truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
        </div>
        <SidebarMenuButton asChild tooltip={{ children: 'Logout', side: 'right' }}>
          <Link href="/">
            <LogOut />
            <span>Logout</span>
          </Link>
        </SidebarMenuButton>
      </SidebarFooter>
    </>
  );
}


export default function AppLayout({ user, userRole, children }: AppLayoutProps) {
  const [open, setOpen] = React.useState(true);
  const navItems = navItemsMap[userRole];

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <div className="md:flex">
        <Sidebar>
          <AppSidebar user={user} navItems={navItems} />
        </Sidebar>
        <div className="flex-1">
          <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 sm:py-4">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="md:hidden" />
              <NavigationButtons />
            </div>
            <nav className="flex items-center gap-4">
              <div className="hidden md:flex gap-2">
                 <Button variant="ghost" asChild>
                    <Link href="/about">About</Link>
                  </Button>
              </div>
              <div className="md:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical />
                      <span className="sr-only">More</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href="/about">About</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </nav>
          </header>
          <main className="p-4 sm:px-6 sm:py-0">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
