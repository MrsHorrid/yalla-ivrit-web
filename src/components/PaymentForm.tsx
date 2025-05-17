import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface PaymentFormProps {
  amount: number;
  onSuccess: () => void;
  onError: (message: string) => void;
  stripePriceId: string;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ amount, onSuccess, onError, stripePriceId }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsProcessing(true);

    try {
      // In a production implementation, we don't need to do anything here
      // The parent component (ConsultingPage) will handle the Stripe integration
      // This is just a pass-through to trigger the payment process
      onSuccess();
    } catch (error) {
      setPaymentError(error instanceof Error ? error.message : 'אירעה שגיאה בעיבוד התשלום');
      onError(error instanceof Error ? error.message : 'אירעה שגיאה בעיבוד התשלום');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {paymentError && (
        <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-md text-white">
          <p className="font-medium">שגיאה בתשלום:</p>
          <p>{paymentError}</p>
        </div>
      )}
      
      <div className="p-4 border border-aidea-green/30 rounded-md bg-white/5">
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold">תשלום מאובטח</h3>
          <p className="text-gray-300">התשלום מאובטח על ידי Stripe</p>
        </div>
        
        <div className="flex items-center justify-center space-x-4 mb-4">
          <img src="https://cdn.jsdelivr.net/gh/creativetimofficial/public-assets@master/logos/visa.jpg" alt="Visa" className="h-8" />
          <img src="https://cdn.jsdelivr.net/gh/creativetimofficial/public-assets@master/logos/mastercard.jpg" alt="Mastercard" className="h-8" />
          <img src="https://cdn.jsdelivr.net/gh/creativetimofficial/public-assets@master/logos/amex.jpg" alt="American Express" className="h-8" />
        </div>
      </div>
      
      <div className="text-right font-bold text-lg">
        <span>סה"כ לתשלום: </span>
        <span className="text-aidea-green">{amount} ₪</span>
      </div>
      
      <Button 
        type="submit" 
        disabled={isProcessing} 
        className="w-full bg-aidea-green text-black hover:bg-aidea-green/90 font-bold text-lg py-6"
      >
        {isProcessing ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin ml-2" />
            <span>מעבד תשלום...</span>
          </>
        ) : (
          'מעבר לתשלום'
        )}
      </Button>
    </form>
  );
};

export default PaymentForm;
