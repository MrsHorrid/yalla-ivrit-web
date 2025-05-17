
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent } from '@/components/ui/card';
import { Grid3X3 } from 'lucide-react';

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
  }
];

const BentoGallery: React.FC = () => {
  return (
    <section className="w-full py-12 sm:py-16 md:py-20 bg-gradient-to-b from-transparent to-black/20">
      <div className="container mx-auto px-4 mb-8 sm:mb-10">
        <motion.div
          className="flex items-center justify-center gap-3 mb-3"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Grid3X3 className="w-5 h-5 sm:w-6 sm:h-6 text-aidea-green" />
          <span className="text-aidea-green text-xs sm:text-sm font-semibold tracking-wider uppercase">פרויקטים נבחרים</span>
        </motion.div>
        
        <motion.h2 
          className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          העבודות שלנו
        </motion.h2>
        
        <motion.p
          className="text-center text-sm sm:text-base text-gray-400 max-w-lg mx-auto mb-10 sm:mb-12 px-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          פרויקטים מובילים שסייעו ללקוחותינו להתקדם באמצעות פתרונות בינה מלאכותית חדשניים
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto px-0 sm:px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-0 sm:gap-3 md:gap-4">
          {/* First row - takes up full width on mobile, splits into two cards on desktop */}
          <div className="lg:col-span-6">
            <BentoCard item={galleryItems[0]} />
          </div>
          <div className="lg:col-span-6">
            <BentoCard item={galleryItems[1]} />
          </div>
          
          {/* Second row - takes up full width on mobile, splits into two cards on desktop */}
          <div className="lg:col-span-6">
            <BentoCard item={galleryItems[2]} />
          </div>
          <div className="lg:col-span-6">
            <BentoCard item={galleryItems[3]} />
          </div>
        </div>
      </div>
    </section>
  );
};

// Extracted BentoCard component for cleaner code
const BentoCard: React.FC<{ item: GalleryItem }> = ({ item }) => {
  // Each image will have a consistent aspect ratio
  const aspectRatio = 16/9;
  
  return (
    <motion.div 
      key={item.id}
      className="h-full w-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: Number(item.id) * 0.1 }}
    >
      <Link to={item.route} className="block h-full">
        <Card className="overflow-hidden h-full bg-black/50 backdrop-blur-sm border-0 hover:border-aidea-blue/40 transition-all duration-500 shadow-lg hover:shadow-aidea-blue/20 rounded-none sm:rounded-lg">
          <motion.div 
            className="h-full"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
          >
            <div className="relative h-full">
              <AspectRatio ratio={aspectRatio} className="h-full bg-black/70">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="object-cover w-full h-full opacity-75 group-hover:opacity-90 transition-all duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500" />
              </AspectRatio>
              <CardContent className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: Number(item.id) * 0.15 + 0.3 }}
                  className="group"
                >
                  <div className="h-1 w-10 sm:w-12 mb-3 sm:mb-4 bg-aidea-green rounded-full transform origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-white">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-300 line-clamp-2 sm:line-clamp-3">{item.description}</p>
                </motion.div>
              </CardContent>
            </div>
          </motion.div>
        </Card>
      </Link>
    </motion.div>
  );
};

export default BentoGallery;
