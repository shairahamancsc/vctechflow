'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { serviceRequests, parts } from '@/lib/data';
import { serviceRequestStatuses } from '@/lib/types';

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

  // In a real app, you would save this to a database.
  console.log('New Service Request:', validatedFields.data);

  // Revalidate the path to show the new request
  revalidatePath('/customer/dashboard');

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
    
    // In a real app, you would find and update the request in the database.
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
