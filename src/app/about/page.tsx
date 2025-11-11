
import Image from 'next/image';
import Header from '@/components/header';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, MapPin, Phone, User, Settings } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function AboutPage() {
  const aboutImage = PlaceHolderImages.find((img) => img.id === 'hero');
  const dellLogo = PlaceHolderImages.find((img) => img.id === 'dell-logo');

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
          <h1 className="text-3xl md:text-5xl font-bold font-headline mb-4 whitespace-nowrap">About <span style={{ color: '#8B0000' }}>V</span>ision <span style={{ color: '#8B0000' }}>C</span>omputer</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Your trusted partner in seamless device service management.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
           <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl md:text-3xl">Contact Information</CardTitle>
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

        <Separator className="my-12" />

        <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold font-headline mb-2">We Service & Deal With These Brands</h2>
            <p className="text-muted-foreground mb-8">and many more...</p>

            <div className="flex justify-center items-center gap-8 flex-wrap">
                <Card className="p-6 bg-muted/20 w-52 h-32 flex justify-center items-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-0 relative w-32 h-20">
                        {dellLogo && (
                            <Image
                                src={dellLogo.imageUrl}
                                alt={dellLogo.description}
                                fill
                                className="object-contain"
                                data-ai-hint={dellLogo.imageHint}
                            />
                        )}
                    </CardContent>
                </Card>
                 {/* You can add more brand cards here */}
            </div>
        </div>
      </main>
       <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground mt-12">
        <p>&copy; {new Date().getFullYear()} VC Tech Flow. All rights reserved.</p>
      </footer>
    </>
  );
}
