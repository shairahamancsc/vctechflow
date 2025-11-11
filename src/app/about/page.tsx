
import Image from 'next/image';
import Header from '@/components/header';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function AboutPage() {
  const aboutImage = PlaceHolderImages.find((img) => img.id === 'hero');

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">About VC Tech Flow</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Your trusted partner in seamless device service management.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-headline font-semibold">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              At VC Tech Flow, our mission is to revolutionize the device repair industry by providing a transparent, efficient, and user-friendly platform for both customers and technicians. We believe in empowering our users with the tools they need to manage service requests with ease and confidence.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              From the initial service request to the final delivery, our system is designed to provide real-time updates, clear communication, and a hassle-free experience. We are committed to excellence and strive to build lasting relationships with our clients based on trust and quality service.
            </p>
             <h2 className="text-3xl font-headline font-semibold mt-8">Our Vision</h2>
             <p className="text-muted-foreground leading-relaxed">
              We envision a future where device servicing is no longer a chore but a simple, streamlined process. By leveraging technology, we aim to connect skilled technicians with customers in need, ensuring quick, reliable, and high-quality repairs for everyone.
            </p>
          </div>
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
