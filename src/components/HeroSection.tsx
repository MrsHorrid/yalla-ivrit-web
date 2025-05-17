
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <section className="min-h-[400px] sm:min-h-[500px] md:min-h-[600px] flex flex-col md:flex-row items-center gap-8 md:gap-12 py-8 sm:py-12 px-4 sm:px-6 md:px-12 overflow-hidden">
      {/* Hero text content - Moved to top for mobile */}
      <motion.div 
        className="md:w-1/2 text-center md:text-right order-2 md:order-1 mt-6 md:mt-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.h1 
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          רוצים להשתלב בהייטק בתחום הבינה מלאכותית?
        </motion.h1>
        
        <motion.p 
          className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-gray-300 px-2 sm:px-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          רק פה תוכלו ללמוד איך לעשות את זה, עם ייעוץ והכוונה מקצועית ממומחים מוסמכים מהתעשייה בארץ ובעולם.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          className="relative"
        >
          <Link to="/consulting">
            <Button className="bg-aidea-green text-black hover:bg-aidea-green/90 font-bold text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_5px_rgba(193,255,69,0.5)]">
              יאללה לקבוע!
            </Button>
          </Link>
        </motion.div>
      </motion.div>
      
      {/* Robot image with glowing rings */}
      <motion.div 
        className="md:w-1/2 flex justify-center order-1 md:order-2"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="robot-ring relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px] flex items-center justify-center">
          <motion.img 
            src="/lovable-uploads/08572f23-3f9f-4ecc-8b6f-630c5a4dcd79.png" 
            alt="רובוט בינה מלאכותית" 
            className="w-[260px] h-[260px] sm:w-[330px] sm:h-[330px] md:w-[380px] md:h-[380px] lg:w-[420px] lg:h-[420px] object-contain z-10 rounded-full"
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
    </section>
  );
};

export default HeroSection;
