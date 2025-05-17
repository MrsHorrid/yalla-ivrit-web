// Stripe consulting service implementation using Stripe MCP directly
import { ConsultationBooking } from './stripe';

// Create a payment link for a consultation
export async function createConsultationPaymentLink(booking: ConsultationBooking) {
  try {
    // Use the Stripe MCP to create a payment link
    const paymentLink = await mcp2_create_payment_link({
      price: booking.stripePriceId,
      quantity: 1
    });
    
    return paymentLink;
  } catch (error) {
    console.error('Error creating payment link:', error);
    throw error;
  }
}

// Process a consultation booking
export async function processConsultationBooking(booking: ConsultationBooking) {
  try {
    // Create a payment link for the consultation
    const paymentLink = await createConsultationPaymentLink(booking);
    
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
    console.error('Error processing consultation booking:', error);
    throw error;
  }
}
