
import type { User, Part, ServiceRequest, ServiceLog } from './types';
import { PlaceHolderImages } from './placeholder-images';

const customerAvatar = PlaceHolderImages.find(p => p.id === 'customer-avatar')?.imageUrl || '';
const technicianAvatar = PlaceHolderImages.find(p => p.id === 'technician-avatar')?.imageUrl || '';
const adminAvatar = PlaceHolderImages.find(p => p.id === 'admin-avatar')?.imageUrl || '';

export const users: User[] = [
  { id: 'user-1', name: 'Rajib', email: 'rajib@example.com', role: 'customer', avatarUrl: customerAvatar },
  { id: 'user-2', name: 'Chintu', email: 'chintu@vctechflow.com', role: 'technician', avatarUrl: technicianAvatar },
  { id: 'user-3', name: 'Saddam Husain', email: 'admin@vctechflow.com', role: 'admin', avatarUrl: adminAvatar },
];

export const parts: Part[] = [
  { id: 'part-1', name: 'HP LaserJet Fuser Kit', stock: 12 },
  { id: 'part-2', name: 'Canon PIXMA Ink Cartridge - Black', stock: 50 },
  { id: 'part-3', name: 'Epson WorkForce Roller Kit', stock: 25 },
  { id: 'part-4', name: 'Brother DR420 Drum Unit', stock: 8 },
  { id: 'part-5', name: 'Xerox Phaser 6510 Toner - Cyan', stock: 15 },
];

const now = new Date();
const yesterday = new Date(now);
yesterday.setDate(now.getDate() - 1);
const twoDaysAgo = new Date(now);
twoDaysAgo.setDate(now.getDate() - 2);
const threeDaysAgo = new Date(now);
threeDaysAgo.setDate(now.getDate() - 3);

const request1Logs: ServiceLog[] = [
  { timestamp: threeDaysAgo, note: 'Customer reported printer not turning on.', statusChange: 'Pending Pickup' },
  { timestamp: twoDaysAgo, note: 'Picked up printer from customer location.', statusChange: 'In-Shop' },
  { timestamp: yesterday, note: 'Initial diagnostics complete. Power supply unit failure suspected.', statusChange: 'Diagnostics' },
  { timestamp: now, note: 'Power supply replaced. Printer is now functional. Beginning final tests.', statusChange: 'In Repair', partsUsed: [{ id: 'part-1', name: 'Generic Power Supply Unit', stock: 1 }], amount: 12500.00 }
];

const request2Logs: ServiceLog[] = [
    { timestamp: twoDaysAgo, note: 'Customer reported paper jamming issue.', statusChange: 'Pending Pickup' },
    { timestamp: yesterday, note: 'Technician Chintu picked up the device.', statusChange: 'In-Shop' },
    { timestamp: now, note: 'Diagnosed a worn-out roller. Part ordered.', statusChange: 'Awaiting Parts' }
];

const request3Logs: ServiceLog[] = [
    { timestamp: yesterday, note: 'Device delivered and confirmed working by customer.', statusChange: 'Delivered', amount: 5500.00 }
];

export const serviceRequests: ServiceRequest[] = [
  {
    id: 'req-001',
    customer: users[0],
    technician: users[1],
    printerModel: 'HP LaserJet Pro M404dn',
    issueDescription: 'The printer is not turning on. I have tried different power outlets, but it seems to be completely dead. It was working fine yesterday.',
    status: 'In Repair',
    createdAt: threeDaysAgo,
    updatedAt: now,
    logs: request1Logs,
    amount: 12500.00,
  },
  {
    id: 'req-002',
    customer: users[0],
    technician: users[1],
    printerModel: 'Epson EcoTank ET-2720',
    issueDescription: 'Constant paper jams, even with new paper. It makes a loud grinding noise when trying to feed.',
    status: 'Awaiting Parts',
    createdAt: twoDaysAgo,
    updatedAt: now,
    logs: request2Logs
  },
  {
    id: 'req-003',
    customer: users[0],
    technician: users[1],
    printerModel: 'Brother HL-L2395DW',
    issueDescription: 'Streaks on all printed pages.',
    status: 'Delivered',
    createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: yesterday,
    logs: request3Logs,
    amount: 5500.00,
  },
];

// Helper functions to simulate data fetching
export const getServiceRequestsByCustomerId = async (customerId: string) => {
    // Return a copy to avoid mutation issues in client components
    return JSON.parse(JSON.stringify(serviceRequests.filter(req => req.customer.id === customerId)));
}

export const getServiceRequestById = async (id: string) => {
    const request = serviceRequests.find(req => req.id === id);
    // Return a copy to avoid mutation issues in client components
    return request ? JSON.parse(JSON.stringify(request)) : undefined;
}

export const getAllServiceRequests = async () => {
    // Return a copy to avoid mutation issues in client components
    return JSON.parse(JSON.stringify(serviceRequests));
}

export const getAllParts = async () => {
    return parts;
}

export const getUserById = async (id: string) => {
    const user = users.find(user => user.id === id);
    return user ? {...user} : undefined;
}

export const getAllUsers = async () => {
    return [...users];
}
