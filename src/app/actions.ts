
'use client';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { serviceRequestStatuses } from '@/lib/types';
import { getFirestore, collection, addDoc, updateDoc, doc, serverTimestamp, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { getUserById } from '@/lib/data';

const db = getFirestore();

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

  // In a real app, you'd get the current logged in user
  const customer = await getUserById('user-1');
  if (!customer) {
    return { message: 'Customer not found.' };
  }
  
  try {
    const newRequest = {
      customer,
      printerModel: validatedFields.data.printerModel,
      issueDescription: validatedFields.data.issueDescription,
      status: 'Pending Pickup' as const,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      logs: [{
          timestamp: new Date().toISOString(),
          note: 'Service request created by customer.',
          statusChange: 'Pending Pickup' as const,
      }],
    };
    
    await addDoc(collection(db, 'serviceRequests'), newRequest);

    revalidatePath('/customer/dashboard');
    revalidatePath('/technician/dashboard');
    revalidatePath('/admin/dashboard');

    return { message: 'Service request created successfully.' };
  } catch (error) {
    console.error('Error creating service request:', error);
    return { message: 'Failed to create service request.' };
  }
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

    try {
      const requestRef = doc(db, 'serviceRequests', id);
      
      const newLogEntry: any = {
        timestamp: new Date().toISOString(),
        note: technicianNote || `Status updated to ${status}`,
        statusChange: status,
      };

      const requestDoc = await getDoc(requestRef);
      const requestData = requestDoc.data();
      const existingLogs = requestData?.logs || [];
      
      const updatePayload: any = {
        status,
        updatedAt: serverTimestamp(),
        logs: [...existingLogs, newLogEntry],
      };

      if (amount) {
        updatePayload.amount = amount;
        newLogEntry.amount = amount;
      }
      
      await updateDoc(requestRef, updatePayload);

      revalidatePath(`/technician/dashboard/${id}`);
      revalidatePath(`/customer/dashboard/${id}`);
      revalidatePath('/technician/dashboard');

      return { message: 'Service request updated successfully.' };
    } catch (error) {
      console.error('Error updating service request:', error);
      return { message: 'Failed to update service request.' };
    }
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

  try {
    const newUser = {
      id: newId,
      name,
      email,
      role: role as 'customer' | 'technician',
      avatarUrl: `https://i.pravatar.cc/150?u=${newId}`,
    };
    
    await setDoc(doc(db, "users", newId), newUser);

    if (newUser.role === 'customer') {
      const technician = await getUserById('user-2');
      const newRequest = {
        customer: newUser,
        technician: technician,
        printerModel: 'New Customer Printer',
        issueDescription: 'This is an automatically generated service request for a new customer.',
        status: 'Pending Pickup',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        logs: [{
            timestamp: new Date().toISOString(),
            note: 'Request automatically created.',
            statusChange: 'Pending Pickup',
        }],
      };
      await addDoc(collection(db, 'serviceRequests'), newRequest);
    }

    revalidatePath('/admin/users');
    return { message: `User ${name} created successfully.` };
  } catch (error) {
    console.error('Error creating user:', error);
    return { message: 'Failed to create user.' };
  }
}

export async function deleteUser(userId: string) {
  try {
    // In a real production app you might want to soft delete or archive.
    // For now we will delete it.
    await deleteDoc(doc(db, "users", userId));
    
    revalidatePath('/admin/users');
    return { message: 'User deleted successfully.' };
  } catch (error) {
    console.error('Error deleting user:', error);
    return { message: 'Failed to delete user.' };
  }
}
