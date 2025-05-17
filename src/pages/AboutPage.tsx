
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">מי אנחנו</h1>
          
          <div className="space-y-6 text-gray-300">
            <p className="text-lg">
              AIDEA הוקמה בשנת 2023 על ידי קבוצת מומחים מתחום הבינה המלאכותית, במטרה לספק הכשרה מקצועית וייעוץ איכותי לחברות ואנשים פרטיים המעוניינים להשתלב בתעשייה.
            </p>
            
            <p className="text-lg">
              הצוות שלנו מורכב ממומחים בעלי ניסיון רב בתעשיית ההייטק והבינה המלאכותית, אשר עבדו בחברות המובילות בתחום בישראל ובעולם.
            </p>
            
            <p className="text-lg">
              אנו מאמינים שהמפתח להצלחה בתחום הבינה המלאכותית הוא שילוב של ידע תיאורטי מעמיק יחד עם ניסיון מעשי ועדכני. לכן, אנו מציעים תוכניות הדרכה והכשרה מותאמות אישית, המשלבות למידה תיאורטית עם התנסות מעשית בפרויקטים אמיתיים.
            </p>
            
            <div className="py-6">
              <h2 className="text-2xl font-semibold mb-4">הערכים שלנו</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>מקצועיות - אנו מחויבים לספק הדרכה והכשרה מקצועית ברמה הגבוהה ביותר.</li>
                <li>חדשנות - אנו מתעדכנים באופן שוטף בחידושים האחרונים בתחום הבינה המלאכותית.</li>
                <li>התאמה אישית - אנו מאמינים שכל אדם לומד בדרך שונה, ולכן אנו מתאימים את התוכניות שלנו לצרכים האישיים של כל משתתף.</li>
                <li>תמיכה מתמשכת - אנו מלווים את המשתתפים שלנו לאורך כל הדרך, ומספקים תמיכה מקצועית גם לאחר סיום ההכשרה.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
