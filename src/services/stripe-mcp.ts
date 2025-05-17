// Direct integration with Stripe MCP server
import { ConsultationBooking } from './stripe';

// Create a customer in Stripe
export async function createStripeCustomer(name: string, email: string) {
  try {
    // Use the Stripe MCP to create a customer
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

// Create a payment link for a product
export async function createStripePaymentLink(priceId: string, quantity: number = 1) {
  try {
    // Use the Stripe MCP to create a payment link
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

// Process a booking with Stripe MCP
export async function processBookingWithStripeMCP(booking: ConsultationBooking) {
  try {
    // Create a payment link directly using Stripe MCP
    const paymentLink = await createStripePaymentLink(booking.stripePriceId, 1);
    
    // Return the payment link URL
    return {
      url: paymentLink.url,
      id: paymentLink.id
    };
  } catch (error) {
    console.error('Error processing booking with Stripe MCP:', error);
    throw error;
  }
}
