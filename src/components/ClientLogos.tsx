
import React from 'react';

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
    <section className="py-16 px-6 md:px-12">
      <h2 className="text-center text-2xl font-bold mb-12">חברות שעבדנו איתן ובהן</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {companyLogos.map((logo, index) => (
          <div key={index} className="flex items-center justify-center p-6 border border-aidea-green/30 rounded-lg hover:border-aidea-green transition-colors">
            <div className="flex items-center justify-center w-full">
              <img 
                src={logo.path} 
                alt={logo.alt}
                className="w-auto h-14 object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ClientLogos;
