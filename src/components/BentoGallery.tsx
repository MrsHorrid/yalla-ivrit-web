
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent } from '@/components/ui/card';

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
    <section className="py-16 px-6 md:px-12">
      <motion.h2 
        className="text-center text-3xl font-bold mb-12"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        הפרויקטים שלנו
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-7xl mx-auto">
        {galleryItems.map((item) => (
          <motion.div 
            key={item.id}
            className={`
              ${item.size === 'small' ? 'md:col-span-1 row-span-1' : ''}
              ${item.size === 'medium' ? 'md:col-span-2 row-span-1' : ''}
              ${item.size === 'large' ? 'md:col-span-2 md:row-span-2' : ''}
            `}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: Number(item.id) * 0.1 }}
          >
            <Link to={item.route} className="block h-full">
              <Card className="overflow-hidden h-full bg-black border-aidea-green/20 hover:border-aidea-green transition-colors duration-300">
                <motion.div 
                  className="h-full"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative h-full">
                    <AspectRatio ratio={item.size === 'large' ? 4/3 : 16/9} className="h-full bg-black">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="object-cover w-full h-full opacity-70 hover:opacity-90 transition-opacity duration-300"
                      />
                    </AspectRatio>
                    <CardContent className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/90 to-black/20">
                      <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">{item.title}</h3>
                      <p className="text-sm text-gray-300">{item.description}</p>
                    </CardContent>
                  </div>
                </motion.div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BentoGallery;
