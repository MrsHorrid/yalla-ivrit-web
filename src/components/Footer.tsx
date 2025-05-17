
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const footerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.2
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 }}
  };

  return (
    <motion.footer 
      className="py-10 sm:py-12 px-6 sm:px-8 md:px-12 border-t border-white/10 bg-aidea-black"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <motion.div className="mb-8 md:mb-0 text-center md:text-right" variants={itemVariants}>
            <Link to="/" className="text-3xl font-bold text-white inline-flex items-center">
              <span className="bg-gradient-to-r from-aidea-green to-aidea-blue bg-clip-text text-transparent">AIDEA</span>
            </Link>
            <p className="mt-4 text-base text-gray-400 max-w-xs mx-auto md:mx-0">
              פלטפורמת הייטק ובינה מלאכותית המספקת ייעוץ והכוונה מקצועית
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8 text-center sm:text-right">
            <motion.div variants={itemVariants} className="sm:order-1">
              <h3 className="font-semibold mb-4 text-lg text-white">קישורים</h3>
              <ul className="space-y-3">
                {[
                  { label: 'בית', path: '/' },
                  { label: 'מי אנחנו', path: '/about' },
                  { label: 'קביעת ייעוץ', path: '/consulting' }
                ].map((link) => (
                  <li key={link.path}>
                    <Link 
                      to={link.path} 
                      className="text-gray-400 hover:text-aidea-green transition-colors text-base relative group"
                    >
                      {link.label}
                      <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-aidea-green transition-all group-hover:w-full"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div variants={itemVariants} className="sm:order-2">
              <h3 className="font-semibold mb-4 text-lg text-white">צור קשר</h3>
              <ul className="space-y-3">
                <li className="text-gray-400 text-base hover:text-aidea-green transition-colors">
                  <a href="mailto:info@aidea.co.il">info@aidea.co.il</a>
                </li>
                <li className="text-gray-400 text-base hover:text-aidea-green transition-colors">
                  <a href="tel:073-123-4567">073-123-4567</a>
                </li>
                <li className="text-gray-400 text-base">תל אביב, ישראל</li>
              </ul>
            </motion.div>
            
            <motion.div variants={itemVariants} className="sm:order-3">
              <h3 className="font-semibold mb-4 text-lg text-white">עקבו אחרינו</h3>
              <div className="flex gap-4 justify-center sm:justify-start md:justify-end">
                {[
                  { name: 'Facebook', icon: <Facebook />, link: '#' },
                  { name: 'Instagram', icon: <Instagram />, link: '#' },
                  { name: 'LinkedIn', icon: <Linkedin />, link: '#' }
                ].map((social) => (
                  <motion.a 
                    key={social.name}
                    href={social.link} 
                    className="text-gray-400 hover:text-aidea-green p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all"
                    whileHover={{ scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    aria-label={social.name}
                  >
                    <span className="sr-only">{social.name}</span>
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
        
        <motion.div 
          className="mt-10 pt-6 border-t border-white/10 text-center text-gray-400"
          variants={itemVariants}
        >
          <p className="text-sm">© {new Date().getFullYear()} AIDEA. כל הזכויות שמורות.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
