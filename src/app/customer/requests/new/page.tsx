'use client';

import { useActionState, useEffect, useRef } from 'react';
import { createServiceRequest } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export default function NewRequestPage() {
  const router = useRouter();
  const [state, formAction] = useActionState(createServiceRequest, null);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.message) {
      toast({
        title: "Success",
        description: state.message,
        className: 'bg-accent text-accent-foreground'
      });
      formRef.current?.reset();
      router.push('/customer/dashboard');
    }
  }, [state, toast, router]);

  return (
    <div>
      <h1 className="text-3xl font-bold font-headline mb-2">New Service Request</h1>
      <p className="text-muted-foreground mb-6">Describe your printer issue and we'll get a technician on it.</p>
      
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Printer Details</CardTitle>
          <CardDescription>Please provide as much detail as possible.</CardDescription>
        </CardHeader>
        <CardContent>
          <form ref={formRef} action={formAction} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="printerModel">Printer Model</Label>
              <Input
                id="printerModel"
                name="printerModel"
                placeholder="e.g., HP LaserJet Pro M404dn"
                required
              />
              {state?.errors?.printerModel && (
                <p className="text-sm font-medium text-destructive">{state.errors.printerModel}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="issueDescription">Issue Description</Label>
              <Textarea
                id="issueDescription"
                name="issueDescription"
                placeholder="Describe the problem in detail..."
                required
                rows={6}
              />
               {state?.errors?.issueDescription && (
                <p className="text-sm font-medium text-destructive">{state.errors.issueDescription}</p>
              )}
            </div>
            <Button type="submit" className="w-full">Submit Request</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
