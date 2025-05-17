
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  return (
    <section className="min-h-[600px] flex flex-col-reverse md:flex-row items-center gap-12 py-12 px-6 md:px-12">
      {/* Robot image with glowing rings */}
      <motion.div 
        className="md:w-1/2 flex justify-center"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="robot-ring relative w-[450px] h-[450px] flex items-center justify-center">
          <motion.img 
            src="/lovable-uploads/08572f23-3f9f-4ecc-8b6f-630c5a4dcd79.png" 
            alt="רובוט בינה מלאכותית" 
            className="w-[420px] h-[420px] object-contain z-10 rounded-full"
            animate={{ 
              y: [0, -10, 0],
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
        </div>
      </motion.div>
      
      {/* Hero text content */}
      <motion.div 
        className="md:w-1/2 text-right"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.h1 
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          רוצים להשתלב בהייטק בתחום הבינה מלאכותית?
        </motion.h1>
        
        <motion.p 
          className="text-xl mb-8 text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          רק פה תוכלו ללמוד איך לעשות את זה, עם ייעוץ והכוונה מקצועית ממומחים מוסמכים מהתעשייה בארץ ובעולם.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
        >
          <Button className="bg-aidea-green text-black hover:bg-aidea-green/90 font-bold text-lg px-8 py-6 rounded-full">
            יאללה לקבוע!
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
