import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const CancelPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="mb-8 p-8 bg-red-500/20 rounded-lg border border-red-500/50">
            <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-white text-3xl">✕</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">התשלום בוטל</h2>
            <p className="text-xl mb-6">
              ביטלת את תהליך התשלום. אם נתקלת בבעיה או יש לך שאלות, אנא צור קשר עם התמיכה.
            </p>
            
            <div className="space-y-4">
              <Button 
                className="w-full bg-aidea-green text-black hover:bg-aidea-green/90 font-bold text-lg py-6 hover:shadow-[0_0_15px_rgba(193,255,69,0.6)] transition-all duration-300"
                onClick={() => navigate('/consulting')}
              >
                חזרה לדף הייעוץ
              </Button>
              
              <Button 
                variant="outline"
                className="w-full border-white/20 hover:bg-white/10 font-bold text-lg py-6 transition-all duration-300"
                onClick={() => navigate('/')}
              >
                חזרה לדף הבית
              </Button>
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default CancelPage;
