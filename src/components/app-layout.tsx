'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import Logo from '@/components/logo';
import type { User } from '@/lib/types';
import { LogOut } from 'lucide-react';

type NavItem = {
  href: string;
  label: string;
  icon: React.ElementType;
  tooltip: string;
};

type AppLayoutProps = {
  user: User;
  navItems: NavItem[];
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
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith(item.href)}
                tooltip={{ children: item.tooltip, side: 'right' }}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
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


export default function AppLayout({ user, navItems, children }: AppLayoutProps) {
  const [open, setOpen] = React.useState(true);

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <div className="md:flex">
        <Sidebar>
          <AppSidebar user={user} navItems={navItems} />
        </Sidebar>
        <div className="flex-1">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 sm:py-4">
            <SidebarTrigger className="md:hidden" />
          </header>
          <main className="p-4 sm:px-6 sm:py-0">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
