import { Wrench } from 'lucide-react';

export default function SplashScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background overflow-hidden">
      <div className="relative flex items-center justify-center text-4xl md:text-6xl font-bold">
        <div className="flex items-center gap-2 animate-slide-in-left">
          <div className="bg-primary text-primary-foreground p-3 rounded-md">
            <Wrench className="h-8 w-8 md:h-10 md:w-10" />
          </div>
          <span className="font-stencil text-5xl md:text-7xl font-bold text-primary">
            VC
          </span>
        </div>

        <div className="ml-2 animate-slide-in-right">
          <span className="text-4xl md:text-6xl font-bold font-headline tracking-tight">
            Tech Flow
          </span>
        </div>
      </div>
    </div>
  );
}
