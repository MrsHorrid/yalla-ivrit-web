
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/hooks/use-toast";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ConsultingPage = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "הטופס נשלח בהצלחה!",
      description: "ניצור איתך קשר בהקדם.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">קביעת ייעוץ</h1>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="order-2 md:order-1">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <label className="block text-lg font-medium">
                    שם מלא
                    <Input className="mt-1 bg-white/10 border-aidea-green/50 text-white" required />
                  </label>
                  
                  <label className="block text-lg font-medium">
                    אימייל
                    <Input type="email" className="mt-1 bg-white/10 border-aidea-green/50 text-white" required />
                  </label>
                  
                  <label className="block text-lg font-medium">
                    טלפון
                    <Input type="tel" className="mt-1 bg-white/10 border-aidea-green/50 text-white" required />
                  </label>
                  
                  <label className="block text-lg font-medium">
                    תחום התעניינות
                    <select className="mt-1 w-full bg-white/10 border-aidea-green/50 text-white p-2 rounded-md" required>
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
                    <Textarea className="mt-1 bg-white/10 border-aidea-green/50 text-white min-h-[120px]" />
                  </label>
                </div>
                
                <Button type="submit" className="w-full bg-aidea-green text-black hover:bg-aidea-green/90 font-bold text-lg py-6">
                  שליחת פרטים
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
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ConsultingPage;
