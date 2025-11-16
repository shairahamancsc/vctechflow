export type WithId<T> = T & { id: string };

export type User = {
  name: string;
  email: string;
  role: 'customer' | 'technician' | 'admin';
  avatarUrl: string;
};

export type Part = {
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
  timestamp: string; // ISO 8601 string
  note: string;
  statusChange?: ServiceRequestStatus;
  partsUsed?: WithId<Part>[];
  amount?: number;
};

export type ServiceRequest = {
  customer: WithId<User>;
  technician?: WithId<User>;
  printerModel: string;
  issueDescription: string;
  status: ServiceRequestStatus;
  createdAt: string; // ISO 8601 string
  updatedAt: string; // ISO 8601 string
  logs: ServiceLog[];
  amount?: number;
};
