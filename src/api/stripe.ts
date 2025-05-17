import { loadStripe } from '@stripe/stripe-js';

// Replace with your actual Stripe publishable key
export const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

// Types for payment requests
export interface PaymentIntentRequest {
  amount: number;
  currency: string;
  description: string;
  customerEmail?: string;
  customerName?: string;
  metadata?: Record<string, string>;
}

// Create a payment intent
export const createPaymentIntent = async (data: PaymentIntentRequest) => {
  try {
    // In a real implementation, this would be a server API call
    // For now, we'll simulate the API call using the Stripe MCP
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};

// Confirm a payment intent
export const confirmPayment = async (
  stripe: any,
  elements: any,
  clientSecret: string
) => {
  if (!stripe || !elements) {
    throw new Error('Stripe has not been initialized');
  }

  const cardElement = elements.getElement('card');

  const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: cardElement,
      billing_details: {
        // You can add billing details here if needed
      },
    },
  });

  if (error) {
    throw error;
  }

  return paymentIntent;
};
