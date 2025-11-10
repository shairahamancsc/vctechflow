export type User = {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'technician';
  avatarUrl: string;
};

export type Part = {
  id: string;
  name: string;
  stock: number;
};

export const serviceRequestStatuses = [
  'Pending Pickup',
  'In-Shop',
  'Diagnostics',
  'Awaiting Parts',
  'In Repair',
  'Ready for Delivery',
  'Delivered',
  'Cancelled',
] as const;

export type ServiceRequestStatus = (typeof serviceRequestStatuses)[number];

export type ServiceLog = {
  timestamp: Date;
  note: string;
  statusChange?: ServiceRequestStatus;
  partsUsed?: Part[];
  amount?: number;
};

export type ServiceRequest = {
  id: string;
  customer: User;
  technician?: User;
  printerModel: string;
  issueDescription: string;
  status: ServiceRequestStatus;
  createdAt: Date;
  updatedAt: Date;
  logs: ServiceLog[];
  amount?: number;
};
