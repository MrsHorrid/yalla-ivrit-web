import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';

interface PaymentFormProps {
  amount: number;
  onSuccess: () => void;
  onError: (message: string) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ amount, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    
    if (!cardElement) {
      return;
    }

    setIsProcessing(true);

    // In a real implementation, you would call your backend API to create a payment intent
    // For demo purposes, we're just simulating a successful payment
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For a real implementation, you would use something like:
      // const { error, paymentMethod } = await stripe.createPaymentMethod({
      //   type: 'card',
      //   card: cardElement,
      // });
      
      // if (error) {
      //   throw new Error(error.message);
      // }
      
      // const response = await fetch('/api/create-payment', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     paymentMethodId: paymentMethod.id,
      //     amount: amount,
      //   }),
      // });
      
      // const result = await response.json();
      
      // if (result.error) {
      //   throw new Error(result.error);
      // }

      onSuccess();
    } catch (error) {
      onError(error instanceof Error ? error.message : 'אירעה שגיאה בעיבוד התשלום');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 border border-aidea-green/30 rounded-md bg-white/5">
        <label className="block text-lg font-medium mb-2">פרטי כרטיס אשראי</label>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#ffffff',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#fa755a',
                iconColor: '#fa755a',
              },
            },
          }}
        />
      </div>
      
      <div className="text-right font-bold text-lg">
        <span>סה"כ לתשלום: </span>
        <span className="text-aidea-green">{amount} ₪</span>
      </div>
      
      <Button 
        type="submit" 
        disabled={!stripe || isProcessing} 
        className="w-full bg-aidea-green text-black hover:bg-aidea-green/90 font-bold text-lg py-6"
      >
        {isProcessing ? 'מעבד תשלום...' : 'אישור תשלום'}
      </Button>
    </form>
  );
};

export default PaymentForm;
