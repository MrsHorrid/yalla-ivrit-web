// Production-ready Stripe service implementation
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with your publishable key from the environment variables
const STRIPE_PUBLISHABLE_KEY = 'pk_test_TYooMQauvdEDq54NiTphI7jx';
export const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

// Types for the consultation booking
export interface ConsultationBooking {
  fullName: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
  consultationType: string;
  consultationName: string;
  consultationPrice: number;
  appointmentDate: string;
  stripeProductId: string;
  stripePriceId: string;
}

// Create a Stripe Checkout Session
export async function createCheckoutSession(booking: ConsultationBooking) {
  try {
    // Call our API endpoint to create a Stripe Checkout Session
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId: booking.stripePriceId,
        customerEmail: booking.email,
        customerName: booking.fullName,
        metadata: {
          fullName: booking.fullName,
          email: booking.email,
          phone: booking.phone,
          topic: booking.topic,
          message: booking.message,
          consultationType: booking.consultationType,
          consultationName: booking.consultationName,
          appointmentDate: booking.appointmentDate,
        }
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create checkout session');
    }

    const session = await response.json();
    return session;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}

// Process a consultation booking
export async function processConsultationBooking(booking: ConsultationBooking) {
  try {
    // Create a Stripe Checkout Session
    const session = await createCheckoutSession(booking);
    
    // Save booking information in localStorage for reference
    localStorage.setItem('pendingConsultation', JSON.stringify({
      ...booking,
      checkoutSessionId: session.id,
      createdAt: new Date().toISOString()
    }));
    
    // Return the session URL and ID
    return {
      url: session.url,
      id: session.id
    };
  } catch (error) {
    console.error('Error processing consultation booking:', error);
    throw error;
  }
}
