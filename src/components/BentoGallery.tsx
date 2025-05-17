
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent } from '@/components/ui/card';
import { Gallery, GalleryVertical } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image: string;
  route: string;
  size: 'small' | 'medium' | 'large';
}

const galleryItems: GalleryItem[] = [
  {
    id: '1',
    title: 'פרויקט תשתיות בינה מלאכותית',
    description: 'בניית תשתית לניתוח נתונים ואוטומציה בעזרת בינה מלאכותית',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
    route: '/consulting',
    size: 'large'
  },
  {
    id: '2',
    title: 'יישום צ\'אטבוט לשירות לקוחות',
    description: 'פיתוח צ\'אטבוט חכם לשיפור חווית לקוחות',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
    route: '/consulting',
    size: 'small'
  },
  {
    id: '3',
    title: 'מערכת המלצות חכמה',
    description: 'בניית מערכת המלצות מתקדמת לחברת קמעונאות',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
    route: '/consulting',
    size: 'medium'
  },
  {
    id: '4',
    title: 'אוטומציה בתהליכי גיוס',
    description: 'שילוב AI בתהליכי גיוס עובדים ומיון מועמדים',
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
    route: '/consulting',
    size: 'medium'
  },
  {
    id: '5',
    title: 'מערכת חיזוי דפוסים עסקיים',
    description: 'פיתוח מודל לחיזוי מגמות עסקיות בזמן אמת',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
    route: '/consulting',
    size: 'small'
  }
];

const BentoGallery: React.FC = () => {
  return (
    <section className="w-full py-20 bg-gradient-to-b from-transparent to-black/20">
      <div className="container mx-auto px-4 mb-10">
        <motion.div
          className="flex items-center justify-center gap-3 mb-2"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <GalleryVertical className="w-6 h-6 text-aidea-green" />
          <span className="text-aidea-green text-sm font-semibold tracking-wider uppercase">פרויקטים נבחרים</span>
        </motion.div>
        
        <motion.h2 
          className="text-center text-4xl font-bold mb-3"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          העבודות שלנו
        </motion.h2>
        
        <motion.p
          className="text-center text-gray-400 max-w-lg mx-auto mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          פרויקטים מובילים שסייעו ללקוחותינו להתקדם באמצעות פתרונות בינה מלאכותית חדשניים
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {galleryItems.map((item) => {
            // Map size to grid classes
            const sizeClasses = {
              'small': 'md:col-span-4',
              'medium': 'md:col-span-6', 
              'large': 'md:col-span-8'
            }[item.size];
            
            return (
              <motion.div 
                key={item.id}
                className={`${sizeClasses} group`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: Number(item.id) * 0.1 }}
              >
                <Link to={item.route} className="block h-full">
                  <Card className="overflow-hidden h-full bg-black/50 backdrop-blur-sm border-aidea-blue/10 hover:border-aidea-blue transition-all duration-500 shadow-lg hover:shadow-aidea-blue/20">
                    <motion.div 
                      className="h-full"
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="relative h-full">
                        <AspectRatio ratio={item.size === 'large' ? 16/9 : 3/2} className="h-full bg-black/70">
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="object-cover w-full h-full opacity-60 group-hover:opacity-80 transition-all duration-700 scale-105 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500" />
                        </AspectRatio>
                        <CardContent className="absolute inset-0 flex flex-col justify-end p-8">
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: Number(item.id) * 0.15 + 0.3 }}
                          >
                            <div className="h-1 w-12 mb-4 bg-aidea-green rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                            <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">{item.title}</h3>
                            <p className="text-sm md:text-base text-gray-300 max-w-md">{item.description}</p>
                          </motion.div>
                        </CardContent>
                      </div>
                    </motion.div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BentoGallery;
