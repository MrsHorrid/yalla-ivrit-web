
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  return (
    <motion.nav 
      className="flex justify-between items-center py-6 px-6 md:px-12 w-full"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-12">
        <Link to="/" className="text-3xl font-bold text-white">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            AIDEA
          </motion.span>
        </Link>
      </div>
      
      <div className="flex items-center gap-8">
        {[
          { title: 'בית', path: '/' },
          { title: 'מי אנחנו', path: '/about' },
          { title: 'קביעת ייעוץ', path: '/consulting' },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
          >
            <Link to={item.path} className="text-white hover:text-aidea-green transition-colors">
              {item.title}
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navbar;
