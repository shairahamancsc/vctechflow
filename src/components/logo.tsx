import Link from 'next/link';
import { Wrench } from 'lucide-react';
import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
  showText?: boolean;
};

export default function Logo({ className, showText = true }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        'flex items-center gap-2 text-foreground hover:text-primary transition-colors',
        className
      )}
    >
      <div className="bg-primary text-primary-foreground p-2 rounded-md">
        <Wrench className="h-5 w-5" />
      </div>
      {showText && (
        <span className="text-xl font-bold font-headline tracking-tight">
          <span className="font-stencil text-red-700">VC</span> Tech Flow
        </span>
      )}
    </Link>
  );
}
