// Direct integration with Stripe MCP server using the actual MCP tools
import { ConsultationBooking } from './stripe';

// Create a payment link using the Stripe MCP directly
export async function createStripePaymentLink(priceId: string, quantity: number = 1) {
  try {
    // This is where we would directly use the Stripe MCP tool
    // In a real implementation with proper MCP access, we would do:
    const response = await fetch('/api/create-payment-link', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        price: priceId, 
        quantity 
      }),
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

// Process a booking with Stripe MCP
export async function processConsultationBooking(booking: ConsultationBooking) {
  try {
    // Create a payment link using the Stripe MCP
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
    console.error('Error processing booking:', error);
    throw error;
  }
}
