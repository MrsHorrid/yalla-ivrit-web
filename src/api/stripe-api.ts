// API layer for interacting with Stripe MCP
import { ConsultationBooking } from '@/services/stripe';

// Create a customer in Stripe
export async function createStripeCustomer(name: string, email: string) {
  try {
    // This would be a direct call to the Stripe MCP in a real implementation
    const response = await fetch('/api/create-customer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
    });

    if (!response.ok) {
      throw new Error('Failed to create customer');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
}

// Create a payment link for a consultation
export async function createStripePaymentLink(priceId: string, quantity: number = 1, metadata: Record<string, string> = {}) {
  try {
    // This would be a direct call to the Stripe MCP in a real implementation
    const response = await fetch('/api/create-payment-link', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ priceId, quantity, metadata }),
    });

    if (!response.ok) {
      throw new Error('Failed to create payment link');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating payment link:', error);
    throw error;
  }
}

// Process a booking with Stripe
export async function processBookingWithStripe(booking: ConsultationBooking) {
  try {
    // Create a customer
    const customer = await createStripeCustomer(booking.fullName, booking.email);
    
    // Create a payment link with booking metadata
    const paymentLink = await createStripePaymentLink(
      booking.stripePriceId, 
      1, 
      {
        consultationType: booking.consultationType,
        appointmentDate: booking.appointmentDate,
        customerName: booking.fullName,
        customerPhone: booking.phone,
        topic: booking.topic,
        message: booking.message,
      }
    );
    
    return paymentLink;
  } catch (error) {
    console.error('Error processing booking with Stripe:', error);
    throw error;
  }
}
