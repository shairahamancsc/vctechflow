import type { ServiceRequestStatus } from '@/lib/types';
import { Badge, type BadgeProps } from '@/components/ui/badge';

type StatusBadgeProps = {
  status: ServiceRequestStatus;
} & BadgeProps;

export default function StatusBadge({ status, ...props }: StatusBadgeProps) {
  const getVariant = (): BadgeProps['variant'] => {
    switch (status) {
      case 'Delivered':
        return 'default'; // Uses accent color via CSS override
      case 'In Repair':
      case 'In-Shop':
      case 'Diagnostics':
        return 'secondary';
      case 'Pending Pickup':
      case 'Awaiting Parts':
      case 'Ready for Delivery':
        return 'outline';
      case 'Cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };
  
  const getClassName = () => {
    if (status === 'Delivered') {
      return 'bg-accent text-accent-foreground border-accent';
    }
    return '';
  }

  return (
    <Badge variant={getVariant()} className={getClassName()} {...props}>
      {status}
    </Badge>
  );
}
