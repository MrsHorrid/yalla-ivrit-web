// Final implementation of Stripe integration using Stripe MCP directly
import { ConsultationBooking } from './stripe';

// Create a customer in Stripe using MCP
export async function createStripeCustomer(name: string, email: string) {
  try {
    // Direct call to Stripe MCP
    return await window.mcp2_create_customer({ name, email });
  } catch (error) {
    console.error('Error creating Stripe customer:', error);
    throw error;
  }
}

// Create a payment link using Stripe MCP
export async function createStripePaymentLink(priceId: string, quantity: number = 1) {
  try {
    // Direct call to Stripe MCP
    return await window.mcp2_create_payment_link({ price: priceId, quantity });
  } catch (error) {
    console.error('Error creating Stripe payment link:', error);
    throw error;
  }
}

// Process a booking with Stripe MCP
export async function processConsultationBookingFinal(booking: ConsultationBooking) {
  try {
    // Create a payment link directly using Stripe MCP
    const paymentLink = await createStripePaymentLink(booking.stripePriceId, 1);
    
    // Save booking information for later reference
    localStorage.setItem('pendingBooking', JSON.stringify({
      ...booking,
      paymentLinkId: paymentLink.id,
      createdAt: new Date().toISOString()
    }));
    
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
