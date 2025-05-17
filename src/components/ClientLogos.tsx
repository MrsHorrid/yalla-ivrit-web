
import React from 'react';
import { motion } from 'framer-motion';

const ClientLogos: React.FC = () => {
  // Company logos array with paths and alt text
  const companyLogos = [
    { 
      path: '/lovable-uploads/7d8cd1c6-700c-4818-9e52-225da862d451.png', 
      alt: 'React Logo' 
    },
    { 
      path: '/lovable-uploads/d7e45e48-d1a8-4b8a-ac22-166780a607a7.png', 
      alt: 'Company Logo' 
    },
    { 
      path: '/lovable-uploads/bc05d643-b824-4fa0-adce-afa7c771d2b7.png', 
      alt: 'Microsoft Logo' 
    },
    { 
      path: '/lovable-uploads/f75e26e0-e0eb-46f4-97c9-5901d662d803.png', 
      alt: 'Warner Bros Logo' 
    },
  ];

  return (
    <motion.section 
      className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <motion.h2 
        className="text-center text-xl sm:text-2xl font-bold mb-6 sm:mb-8 md:mb-12"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        חברות שעבדנו איתן ובהן
      </motion.h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        {companyLogos.map((logo, index) => (
          <motion.div 
            key={index} 
            className="flex items-center justify-center p-4 sm:p-6 border border-aidea-green/30 rounded-lg hover:border-aidea-green transition-colors"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 0 15px rgba(193, 255, 69, 0.3)" 
            }}
          >
            <div className="flex items-center justify-center w-full">
              <img 
                src={logo.path} 
                alt={logo.alt}
                className="w-auto h-8 sm:h-10 md:h-14 object-contain"
                loading="lazy"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default ClientLogos;
