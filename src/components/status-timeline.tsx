import { Circle, CircleCheck, CircleDot, Truck, Wrench, Package, Search } from 'lucide-react';
import type { ServiceLog, ServiceRequestStatus } from '@/lib/types';
import { cn } from '@/lib/utils';
import { serviceRequestStatuses } from '@/lib/types';

type StatusTimelineProps = {
  logs: ServiceLog[];
  currentStatus: ServiceRequestStatus;
};

const statusIcons: Record<ServiceRequestStatus, React.ElementType> = {
  'Pending Pickup': Truck,
  'In-Shop': Wrench,
  'Diagnostics': Search,
  'Awaiting Parts': Package,
  'In Repair': Wrench,
  'Ready for Delivery': Truck,
  'Delivered': CircleCheck,
  'Cancelled': Circle,
};

export default function StatusTimeline({ logs, currentStatus }: StatusTimelineProps) {
  const currentStatusIndex = serviceRequestStatuses.indexOf(currentStatus);

  const relevantLogs = serviceRequestStatuses.map((status, index) => {
    const log = logs.slice().reverse().find(l => l.statusChange === status);
    const isCompleted = index < currentStatusIndex;
    const isCurrent = index === currentStatusIndex;

    if (!log && !isCurrent) return null;

    const Icon = isCurrent ? CircleDot : isCompleted ? CircleCheck : Circle;
    const LogIcon = statusIcons[status] || Circle;

    return {
      status,
      note: log?.note || `Status updated to ${status}`,
      timestamp: log?.timestamp,
      Icon,
      LogIcon,
      isCurrent,
      isCompleted,
    };
  }).filter(Boolean);

  return (
    <div className="space-y-8">
      {relevantLogs.map((item, index) => item && (
        <div key={index} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                'rounded-full h-10 w-10 flex items-center justify-center',
                item.isCurrent ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              )}
            >
              <item.LogIcon className="h-5 w-5" />
            </div>
            {index < relevantLogs.length - 1 && <div className="w-px h-full bg-border" />}
          </div>
          <div>
            <p className={cn('font-semibold', item.isCurrent && 'text-primary')}>{item.status}</p>
            <p className="text-sm text-muted-foreground">{item.note}</p>
            {item.timestamp && <p className="text-xs text-muted-foreground mt-1">{item.timestamp.toLocaleString()}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
