import type { ServiceRequestStatus } from '@/lib/types';
import { Badge, type BadgeProps } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type StatusBadgeProps = {
  status: ServiceRequestStatus;
} & BadgeProps;

export default function StatusBadge({ status, className, ...props }: StatusBadgeProps) {
  const statusStyles: Record<ServiceRequestStatus, string> = {
    'Delivered': 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/40 dark:text-green-300 dark:border-green-800/60',
    'In Repair': 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-800/60',
    'In-Shop': 'bg-cyan-100 text-cyan-800 border-cyan-200 dark:bg-cyan-900/40 dark:text-cyan-300 dark:border-cyan-800/60',
    'Diagnostics': 'bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/40 dark:text-indigo-300 dark:border-indigo-800/60',
    'Ready for Delivery': 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/40 dark:text-purple-300 dark:border-purple-800/60',
    'Pending Pickup': 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/40 dark:text-yellow-300 dark:border-yellow-800/60',
    'Awaiting Parts': 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/40 dark:text-orange-300 dark:border-orange-800/60',
    'Cancelled': 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/40 dark:text-red-300 dark:border-red-800/60',
  };

  return (
    <Badge variant="outline" className={cn('font-medium', statusStyles[status], className)} {...props}>
      {status}
    </Badge>
  );
}
