'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function NavigationButtons() {
  const router = useRouter();

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => router.back()}
        aria-label="Go back"
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => router.forward()}
        aria-label="Go forward"
      >
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
