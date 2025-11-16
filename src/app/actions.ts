'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { serviceRequests, parts, users, User } from '@/lib/data';
import { serviceRequestStatuses } from '@/lib/types';
import { users as usersData, serviceRequests as serviceRequestsData } from '@/lib/data';

const NewRequestSchema = z.object({
  printerModel: z.string().min(3, 'Printer model is required'),
  issueDescription: z.string().min(10, 'Please provide a detailed description'),
});

const UpdateRequestSchema = z.object({
    id: z.string(),
    status: z.enum(serviceRequestStatuses),
    technicianNote: z.string().optional(),
    amount: z.coerce.number().optional(),
});

const NewUserSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['customer', 'technician']),
});

export async function createServiceRequest(prevState: any, formData: FormData) {
  const validatedFields = NewRequestSchema.safeParse({
    printerModel: formData.get('printerModel'),
    issueDescription: formData.get('issueDescription'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const newRequest = {
    id: `req-${String(Date.now()).slice(-4)}`,
    customer: users.find(u => u.id === 'user-1')!,
    printerModel: validatedFields.data.printerModel,
    issueDescription: validatedFields.data.issueDescription,
    status: 'Pending Pickup' as const,
    createdAt: new Date(),
    updatedAt: new Date(),
    logs: [{
        timestamp: new Date(),
        note: 'Service request created by customer.',
        statusChange: 'Pending Pickup' as const,
    }],
  };

  serviceRequests.unshift(newRequest);

  revalidatePath('/customer/dashboard');
  revalidatePath('/technician/dashboard');
  revalidatePath('/admin/dashboard');

  return { message: 'Service request created successfully.' };
}

export async function updateServiceRequest(prevState: any, formData: FormData) {
    const validatedFields = UpdateRequestSchema.safeParse({
        id: formData.get('id'),
        status: formData.get('status'),
        technicianNote: formData.get('technicianNote'),
        amount: formData.get('amount'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }
    
    const { id, status, technicianNote, amount } = validatedFields.data;

    console.log('Updating service request:', { id, status, technicianNote, amount });
    
    const requestIndex = serviceRequests.findIndex(req => req.id === id);
    if(requestIndex !== -1) {
        const newLogEntry: any = {
            timestamp: new Date(),
            note: technicianNote || `Status updated to ${status}`,
            statusChange: status,
        };
        
        if(amount) {
          serviceRequests[requestIndex].amount = amount;
          newLogEntry.amount = amount;
        }

        serviceRequests[requestIndex].status = status;
        serviceRequests[requestIndex].updatedAt = new Date();
        if (technicianNote || amount) {
            serviceRequests[requestIndex].logs.push(newLogEntry);
        }
    }

    revalidatePath(`/technician/dashboard/${id}`);
    revalidatePath(`/customer/dashboard/${id}`);
    revalidatePath('/technician/dashboard');

    return { message: 'Service request updated successfully.' };
}

export async function createUser(prevState: any, formData: FormData) {
  const validatedFields = NewUserSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    role: formData.get('role'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to create user.',
    };
  }

  const { name, email, role } = validatedFields.data;
  const newId = `user-${Date.now()}`;

  const newUser: User = {
    id: newId,
    name,
    email,
    role: role as 'customer' | 'technician',
    avatarUrl: `https://i.pravatar.cc/150?u=${newId}`,
  };

  usersData.push(newUser);

  if (newUser.role === 'customer') {
    serviceRequestsData.push({
        id: `req-${String(Date.now()).slice(-4)}`,
        customer: newUser,
        technician: usersData.find(u => u.role === 'technician'),
        printerModel: 'New Customer Printer',
        issueDescription: 'This is an automatically generated service request for a new customer.',
        status: 'Pending Pickup',
        createdAt: new Date(),
        updatedAt: new Date(),
        logs: [{
            timestamp: new Date(),
            note: 'Request automatically created.',
            statusChange: 'Pending Pickup',
        }],
    });
  }


  revalidatePath('/admin/users');
  return { message: `User ${name} created successfully.` };
}

export async function deleteUser(userId: string) {
  // In a real app, you'd delete from a database.
  // For this mock data, we'll just log it.
  console.log(`Attempting to delete user: ${userId}`);

  // This would remove the user from the array, but it's commented out
  // to avoid breaking relationships in the mock data during the demo.
  // const userIndex = usersData.findIndex(u => u.id === userId);
  // if (userIndex > -1) {
  //   usersData.splice(userIndex, 1);
  // }
  
  revalidatePath('/admin/users');
  
  return { message: 'User deletion initiated (see server log).' };
}
