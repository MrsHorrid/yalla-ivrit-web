import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [bookingDetails, setBookingDetails] = useState<any>(null);

  useEffect(() => {
    // Get the session_id from the URL
    const params = new URLSearchParams(location.search);
    const sessionId = params.get('session_id');

    if (sessionId) {
      // In a production environment, you would verify the session with Stripe
      // For now, we'll get the booking details from localStorage
      const pendingBooking = localStorage.getItem('pendingConsultation');
      
      if (pendingBooking) {
        const bookingData = JSON.parse(pendingBooking);
        setBookingDetails(bookingData);
        
        // Show success toast
        toast({
          title: "התשלום בוצע בהצלחה!",
          description: "פרטי הפגישה נשלחו לדואר האלקטרוני שלך",
        });
      }
    } else {
      // If no session_id, redirect to home
      navigate('/');
    }
  }, [location, navigate, toast]);

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
          <div className="mb-8 p-8 bg-aidea-green/20 rounded-lg border border-aidea-green/50">
            <div className="w-20 h-20 bg-aidea-green rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-black text-3xl">✓</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">ההזמנה אושרה בהצלחה!</h2>
            <p className="text-xl mb-6">
              {bookingDetails ? `פרטי הפגישה נשלחו לדוא"ל ${bookingDetails.email}` : 'פרטי הפגישה נשלחו לדואר האלקטרוני שלך'}
            </p>
            
            {bookingDetails && (
              <div className="p-6 bg-black/30 rounded-lg text-right">
                <h3 className="text-xl font-bold mb-4">פרטי הפגישה:</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">שם:</span> {bookingDetails.fullName}</p>
                  <p><span className="font-medium">סוג ייעוץ:</span> {bookingDetails.consultationName}</p>
                  <p><span className="font-medium">תאריך ושעה:</span> {new Date(bookingDetails.appointmentDate).toLocaleString('he-IL')}</p>
                  <p><span className="font-medium">מחיר ששולם:</span> {bookingDetails.consultationPrice} ₪</p>
                </div>
              </div>
            )}
          </div>
          
          <Button 
            className="bg-aidea-green text-black hover:bg-aidea-green/90 font-bold text-lg px-8 py-6 hover:shadow-[0_0_15px_rgba(193,255,69,0.6)] transition-all duration-300"
            onClick={() => navigate('/')}
          >
            חזרה לדף הבית
          </Button>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default SuccessPage;
