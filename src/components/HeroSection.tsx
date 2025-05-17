
import React from 'react';
import { Button } from '@/components/ui/button';

const HeroSection: React.FC = () => {
  return (
    <section className="min-h-[600px] flex flex-col-reverse md:flex-row items-center gap-12 py-12 px-6 md:px-12">
      {/* Robot image with glowing rings */}
      <div className="md:w-1/2 flex justify-center">
        <div className="robot-ring relative w-[350px] h-[350px] flex items-center justify-center">
          <img 
            src="/lovable-uploads/4984d1b2-40f1-404c-b81a-7dd41149551b.png" 
            alt="רובוט בינה מלאכותית" 
            className="w-[300px] h-[300px] object-contain z-10 rounded-full"
          />
        </div>
      </div>
      
      {/* Hero text content */}
      <div className="md:w-1/2 text-right">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          רוצים להשתלב בהייטק בתחום הבינה מלאכותית?
        </h1>
        
        <p className="text-xl mb-8 text-gray-300">
          רק פה תוכלו ללמוד איך לעשות את זה, עם ייעוץ והכוונה מקצועית ממומחים מוסמכים מהתעשייה בארץ ובעולם.
        </p>
        
        <Button className="bg-aidea-green text-black hover:bg-aidea-green/90 font-bold text-lg px-8 py-6 rounded-full">
          יאללה לקבוע!
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
