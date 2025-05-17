
import React from 'react';

const ClientLogos: React.FC = () => {
  return (
    <section className="py-16 px-6 md:px-12">
      <h2 className="text-center text-2xl font-bold mb-12">חברות שעבדנו איתן ובהן</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {[1, 2, 3, 4].map((index) => (
          <div key={index} className="flex items-center justify-center p-4 border border-aidea-green/30 rounded-lg">
            <div className="w-24 h-24 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-aidea-green">
                {index === 1 && (
                  <path d="M50,20 C30,20 20,35 20,50 C20,65 30,80 50,80 C70,80 80,65 80,50 C80,35 70,20 50,20 M50,30 C40,30 35,45 35,50 C35,55 40,70 50,70 C60,70 65,55 65,50 C65,45 60,30 50,30 M40,40 C35,45 35,55 40,60 C45,65 55,65 60,60 C65,55 65,45 60,40 C55,35 45,35 40,40" />
                )}
                {index === 2 && (
                  <path d="M20,20 C20,20 80,20 80,20 C80,20 60,50 60,50 C60,50 80,80 80,80 C80,80 20,80 20,80 C20,80 40,50 40,50 C40,50 20,20 20,20" />
                )}
                {index === 3 && (
                  <path d="M20,20 L80,20 L80,80 L20,80 Z M40,40 L40,60 L60,60 L60,40 Z" />
                )}
                {index === 4 && (
                  <path d="M50,20 L30,35 L30,80 L70,80 L70,35 Z M50,30 L60,40 L40,40 Z M45,50 L55,50 L55,70 L45,70 Z" />
                )}
              </svg>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ClientLogos;
