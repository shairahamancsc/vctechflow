import type { ServiceRequestStatus } from '@/lib/types';
import { Badge, type BadgeProps } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type StatusBadgeProps = {
  status: ServiceRequestStatus;
} & BadgeProps;

export default function StatusBadge({ status, className, ...props }: StatusBadgeProps) {
  const statusStyles: Record<ServiceRequestStatus, string> = {
    'Delivered': 'bg-green-500/10 text-green-700 border-green-500/20 dark:text-green-300',
    'In Repair': 'bg-blue-500/10 text-blue-700 border-blue-500/20 dark:text-blue-300',
    'In-Shop': 'bg-cyan-500/10 text-cyan-700 border-cyan-500/20 dark:text-cyan-300',
    'Diagnostics': 'bg-indigo-500/10 text-indigo-700 border-indigo-500/20 dark:text-indigo-300',
    'Ready for Delivery': 'bg-purple-500/10 text-purple-700 border-purple-500/20 dark:text-purple-300',
    'Pending Pickup': 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20 dark:text-yellow-300',
    'Awaiting Parts': 'bg-orange-500/10 text-orange-700 border-orange-500/20 dark:text-orange-300',
    'Cancelled': 'bg-red-500/10 text-red-700 border-red-500/20 dark:text-red-300',
  };

  return (
    <Badge variant="outline" className={cn('font-medium', statusStyles[status], className)} {...props}>
      {status}
    </Badge>
  );
}
