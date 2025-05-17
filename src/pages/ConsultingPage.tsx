
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/hooks/use-toast";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AppointmentCalendar from '@/components/AppointmentCalendar';
import PaymentForm from '@/components/PaymentForm';
import StripeProvider from '@/components/StripeProvider';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { he } from 'date-fns/locale';

// Define consultation types and prices
const consultationTypes = [
  { id: 'basic', name: 'ייעוץ בסיסי', duration: '60 דקות', price: 299 },
  { id: 'advanced', name: 'ייעוץ מתקדם', duration: '90 דקות', price: 499 },
  { id: 'premium', name: 'ייעוץ פרימיום', duration: '120 דקות', price: 799 },
];

type BookingStep = 'info' | 'schedule' | 'payment' | 'confirmation';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
}

const ConsultingPage = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<BookingStep>('info');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<Date | null>(null);
  const [selectedConsultation, setSelectedConsultation] = useState(consultationTypes[0]);
  
  // Form state
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    topic: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('schedule');
  };
  
  const handleScheduleSubmit = () => {
    if (!selectedTimeSlot) {
      toast({
        title: "שגיאה",
        description: "אנא בחר תאריך ושעה לפגישה",
        variant: "destructive"
      });
      return;
    }
    setCurrentStep('payment');
  };
  
  const handlePaymentSuccess = () => {
    setCurrentStep('confirmation');
    toast({
      title: "התשלום בוצע בהצלחה!",
      description: "פרטי הפגישה נשלחו לדואר האלקטרוני שלך",
    });
  };
  
  const handlePaymentError = (message: string) => {
    toast({
      title: "שגיאה בתשלום",
      description: message,
      variant: "destructive"
    });
  };

  // Progress steps
  const steps = [
    { id: 'info', label: 'פרטים אישיים' },
    { id: 'schedule', label: 'בחירת מועד' },
    { id: 'payment', label: 'תשלום' },
    { id: 'confirmation', label: 'אישור' },
  ];

  // Format date for display
  const formatAppointmentDate = (date: Date) => {
    return format(date, 'EEEE, d בMMMM yyyy בשעה HH:mm', { locale: he });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">קביעת ייעוץ</h1>
          
          {/* Progress steps */}
          <div className="mb-12">
            <div className="flex justify-between items-center">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className="flex flex-col items-center">
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep === step.id ? 'bg-aidea-green text-black' : currentStep === 'confirmation' || steps.findIndex(s => s.id === currentStep) > index ? 'bg-aidea-green/80 text-black' : 'bg-white/10 text-white'}`}
                    >
                      {steps.findIndex(s => s.id === currentStep) > index ? '✓' : index + 1}
                    </div>
                    <span className="mt-2 text-sm">{step.label}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div 
                      className={`flex-1 h-1 mx-2 ${steps.findIndex(s => s.id === currentStep) > index ? 'bg-aidea-green/80' : 'bg-white/10'}`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Step 1: Personal Information */}
          {currentStep === 'info' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 gap-12"
            >
              <div className="order-2 md:order-1">
                <form onSubmit={handleInfoSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <label className="block text-lg font-medium">
                      שם מלא
                      <Input 
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="mt-1 bg-white/10 border-aidea-green/50 text-white" 
                        required 
                      />
                    </label>
                    
                    <label className="block text-lg font-medium">
                      אימייל
                      <Input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-1 bg-white/10 border-aidea-green/50 text-white" 
                        required 
                      />
                    </label>
                    
                    <label className="block text-lg font-medium">
                      טלפון
                      <Input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="mt-1 bg-white/10 border-aidea-green/50 text-white" 
                        required 
                      />
                    </label>
                    
                    <label className="block text-lg font-medium">
                      תחום התעניינות
                      <select 
                        name="topic"
                        value={formData.topic}
                        onChange={handleInputChange}
                        className="mt-1 w-full bg-white/10 border-aidea-green/50 text-white p-2 rounded-md" 
                        required
                      >
                        <option value="">בחר תחום</option>
                        <option value="ai-intro">מבוא לבינה מלאכותית</option>
                        <option value="machine-learning">למידת מכונה</option>
                        <option value="nlp">עיבוד שפה טבעית</option>
                        <option value="computer-vision">ראייה ממוחשבת</option>
                        <option value="other">אחר</option>
                      </select>
                    </label>
                    
                    <label className="block text-lg font-medium">
                      הודעה
                      <Textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="mt-1 bg-white/10 border-aidea-green/50 text-white min-h-[120px]" 
                      />
                    </label>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-aidea-green text-black hover:bg-aidea-green/90 font-bold text-lg py-6"
                  >
                    המשך לבחירת מועד
                  </Button>
                </form>
              </div>
              
              <div className="order-1 md:order-2">
                <div className="bg-aidea-green/10 p-8 rounded-lg border border-aidea-green/30 h-full">
                  <h2 className="text-2xl font-bold mb-4 text-aidea-green">למה לקבוע ייעוץ?</h2>
                  
                  <ul className="space-y-4">
                    <li className="flex gap-3">
                      <span className="text-aidea-green font-bold text-xl">✓</span>
                      <span>קבל מידע מותאם אישית לצרכים שלך</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-aidea-green font-bold text-xl">✓</span>
                      <span>ייעוץ מומחים בעלי ניסיון בתעשייה</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-aidea-green font-bold text-xl">✓</span>
                      <span>בניית מסלול למידה מותאם אישית</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-aidea-green font-bold text-xl">✓</span>
                      <span>הכוונה לפרויקטים מעשיים בתחום</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-aidea-green font-bold text-xl">✓</span>
                      <span>קבלת טיפים לשילוב בשוק העבודה</span>
                    </li>
                  </ul>
                  
                  <div className="mt-8 p-4 bg-aidea-green/20 rounded border border-aidea-green/30">
                    <p className="font-medium">שעות פעילות:</p>
                    <p className="text-gray-300">ימים א'-ה': 9:00-18:00</p>
                    <p className="text-gray-300">יום ו': 9:00-13:00</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Schedule Appointment */}
          {currentStep === 'schedule' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 gap-12"
            >
              <div>
                <h2 className="text-2xl font-bold mb-6">בחירת מועד לפגישה</h2>
                <AppointmentCalendar 
                  onSelectTimeSlot={setSelectedTimeSlot} 
                  selectedTimeSlot={selectedTimeSlot} 
                />
                
                <div className="mt-8 flex gap-4">
                  <Button 
                    variant="outline" 
                    className="flex-1 border-aidea-green text-aidea-green bg-transparent hover:bg-aidea-green hover:text-black hover:shadow-[0_0_15px_rgba(193,255,69,0.5)] transition-all duration-300"
                    onClick={() => setCurrentStep('info')}
                  >
                    חזרה
                  </Button>
                  <Button 
                    className="flex-1 bg-aidea-green text-black hover:bg-aidea-green/90 font-bold hover:shadow-[0_0_15px_rgba(193,255,69,0.6)] transition-all duration-300"
                    onClick={handleScheduleSubmit}
                    disabled={!selectedTimeSlot}
                  >
                    המשך לתשלום
                  </Button>
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-6">בחירת סוג הייעוץ</h2>
                <div className="space-y-4">
                  {consultationTypes.map((type) => (
                    <div 
                      key={type.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${selectedConsultation.id === type.id ? 'border-aidea-green bg-aidea-green/20' : 'border-white/20 hover:border-aidea-green/50'}`}
                      onClick={() => setSelectedConsultation(type)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-xl font-bold">{type.name}</h3>
                          <p className="text-gray-300">{type.duration}</p>
                        </div>
                        <div className="text-xl font-bold text-aidea-green">{type.price} ₪</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {selectedTimeSlot && (
                  <div className="mt-8 p-4 bg-aidea-green/10 rounded-lg border border-aidea-green/30">
                    <h3 className="text-lg font-bold mb-2">סיכום הזמנה</h3>
                    <p><span className="font-medium">סוג ייעוץ:</span> {selectedConsultation.name}</p>
                    <p><span className="font-medium">תאריך ושעה:</span> {formatAppointmentDate(selectedTimeSlot)}</p>
                    <p><span className="font-medium">מחיר:</span> {selectedConsultation.price} ₪</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Step 3: Payment */}
          {currentStep === 'payment' && selectedTimeSlot && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto"
            >
              <div className="mb-8 p-6 bg-aidea-green/10 rounded-lg border border-aidea-green/30">
                <h2 className="text-2xl font-bold mb-4">סיכום הזמנה</h2>
                <div className="space-y-2">
                  <p><span className="font-medium">שם:</span> {formData.fullName}</p>
                  <p><span className="font-medium">אימייל:</span> {formData.email}</p>
                  <p><span className="font-medium">טלפון:</span> {formData.phone}</p>
                  <p><span className="font-medium">סוג ייעוץ:</span> {selectedConsultation.name}</p>
                  <p><span className="font-medium">תאריך ושעה:</span> {formatAppointmentDate(selectedTimeSlot)}</p>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold mb-6">תשלום</h2>
              <StripeProvider>
                <PaymentForm 
                  amount={selectedConsultation.price} 
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                />
              </StripeProvider>
              
              <div className="mt-6">
                <Button 
                  variant="outline" 
                  className="w-full border-aidea-green text-aidea-green bg-transparent hover:bg-aidea-green hover:text-black hover:shadow-[0_0_15px_rgba(193,255,69,0.5)] transition-all duration-300"
                  onClick={() => setCurrentStep('schedule')}
                >
                  חזרה לבחירת מועד
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 'confirmation' && selectedTimeSlot && (
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
                <p className="text-xl mb-6">פרטי הפגישה נשלחו לדוא"ל {formData.email}</p>
                
                <div className="p-6 bg-black/30 rounded-lg text-right">
                  <h3 className="text-xl font-bold mb-4">פרטי הפגישה:</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">שם:</span> {formData.fullName}</p>
                    <p><span className="font-medium">סוג ייעוץ:</span> {selectedConsultation.name}</p>
                    <p><span className="font-medium">תאריך ושעה:</span> {formatAppointmentDate(selectedTimeSlot)}</p>
                    <p><span className="font-medium">מחיר ששולם:</span> {selectedConsultation.price} ₪</p>
                  </div>
                </div>
              </div>
              
              <Button 
                className="bg-aidea-green text-black hover:bg-aidea-green/90 font-bold text-lg px-8 py-6 hover:shadow-[0_0_15px_rgba(193,255,69,0.6)] transition-all duration-300"
                onClick={() => window.location.href = '/'}
              >
                חזרה לדף הבית
              </Button>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ConsultingPage;
