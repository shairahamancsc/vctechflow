
import Image from 'next/image';
import Header from '@/components/header';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, MapPin, Phone, User } from 'lucide-react';

export default function AboutPage() {
  const aboutImage = PlaceHolderImages.find((img) => img.id === 'hero');

  const companyDetails = {
    name: 'Vision Computer',
    address: 'Utkala Ashram Road, Berhampur, Dist. Ganjam, Odisha, Pin-760007',
    mobile: '9337232844',
    email: 'visioncomputer06@gmail.com',
    proprietor: 'Mr. Saddam Husain',
  };

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 whitespace-nowrap">About <span style={{ color: '#8B0000' }}>V</span>ision <span style={{ color: '#8B0000' }}>C</span>omputer</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Your trusted partner in seamless device service management.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
           <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-3xl">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-muted-foreground">
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground">Address</h3>
                  <p>{companyDetails.address}</p>
                </div>
              </div>
               <div className="flex items-start gap-4">
                <Phone className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground">Mobile</h3>
                  <p>{companyDetails.mobile}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground">Email</h3>
                  <p>{companyDetails.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <User className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground">Proprietor</h3>
                  <p>{companyDetails.proprietor}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div>
            {aboutImage && (
              <div className="rounded-lg overflow-hidden shadow-2xl">
                 <Image
                  src={aboutImage.imageUrl}
                  alt={aboutImage.description}
                  width={600}
                  height={400}
                  className="object-cover w-full h-full"
                  data-ai-hint={aboutImage.imageHint}
                />
              </div>
            )}
          </div>
        </div>
      </main>
       <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground mt-12">
        <p>&copy; {new Date().getFullYear()} VC Tech Flow. All rights reserved.</p>
      </footer>
    </>
  );
}
