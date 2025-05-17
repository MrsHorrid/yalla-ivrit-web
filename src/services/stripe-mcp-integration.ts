// Direct integration with Stripe MCP server using the actual MCP tools
import { ConsultationBooking } from './stripe';

// Helper function to create a customer in Stripe
export async function createStripeCustomer(name: string, email: string) {
  // This function would use the Stripe MCP tool directly
  // We'll implement this with a fetch call to our backend API that will use the MCP
  try {
    const response = await fetch('/api/stripe/create-customer', {
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
    console.error('Error creating Stripe customer:', error);
    throw error;
  }
}

// Helper function to create a payment link
export async function createStripePaymentLink(priceId: string, quantity: number = 1) {
  // This function would use the Stripe MCP tool directly
  // We'll implement this with a fetch call to our backend API that will use the MCP
  try {
    const response = await fetch('/api/stripe/create-payment-link', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ price: priceId, quantity }),
    });

    if (!response.ok) {
      throw new Error('Failed to create payment link');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating Stripe payment link:', error);
    throw error;
  }
}

// Process a booking with Stripe
export async function processBookingWithStripe(booking: ConsultationBooking) {
  try {
    // 1. Create a payment link directly
    const paymentLink = await createStripePaymentLink(booking.stripePriceId, 1);
    
    // 2. Return the payment link URL
    return {
      url: paymentLink.url,
      id: paymentLink.id
    };
  } catch (error) {
    console.error('Error processing booking with Stripe:', error);
    throw error;
  }
}
