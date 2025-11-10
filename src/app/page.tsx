import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, User, Wrench } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Logo from '@/components/logo';

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero');

  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Logo />
      </header>
      <main className="flex-grow">
        <section className="relative w-full h-[50vh] md:h-[60vh] flex items-center justify-center text-center">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              data-ai-hint={heroImage.imageHint}
              priority
            />
          )}
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 px-4 text-white">
            <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight">
              ServiceFlow
            </h1>
            <p className="mt-4 text-lg md:text-2xl max-w-2xl mx-auto">
              Seamless Service Management for Your Devices
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <h2 className="text-3xl font-bold text-center mb-12 font-headline">
            Choose Your Portal
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <User className="h-8 w-8" />
                </div>
                <CardTitle className="font-headline">Customer Portal</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Submit new service requests and track the status of your ongoing repairs in real-time.
                </p>
                <Button asChild className="w-full">
                  <Link href="/customer/dashboard">
                    Access Customer Portal <ArrowRight className="ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <Wrench className="h-8 w-8" />
                </div>
                <CardTitle className="font-headline">Technician Portal</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Manage your assigned tasks, update service statuses, and log repair details.
                </p>
                <Button asChild className="w-full">
                  <Link href="/technician/dashboard">
                    Access Technician Portal <ArrowRight className="ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} ServiceFlow. All rights reserved.</p>
      </footer>
    </div>
  );
}
