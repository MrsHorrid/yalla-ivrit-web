// Final implementation of Stripe consulting service using Stripe MCP directly
import { ConsultationBooking } from './stripe';

// Process a consultation booking with Stripe MCP
export async function processConsultationBookingWithMCP(booking: ConsultationBooking) {
  try {
    // Use the Stripe MCP to create a payment link
    const paymentLink = await mcp2_create_payment_link({
      price: booking.stripePriceId,
      quantity: 1
    });
    
    // Save booking information in localStorage for later reference
    localStorage.setItem('pendingConsultation', JSON.stringify({
      ...booking,
      paymentLinkId: paymentLink.id,
      createdAt: new Date().toISOString()
    }));
    
    // Return the payment link URL and ID
    return {
      url: paymentLink.url,
      id: paymentLink.id
    };
  } catch (error) {
    console.error('Error processing consultation booking with MCP:', error);
    throw error;
  }
}
