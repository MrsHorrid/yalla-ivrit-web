// Client-side integration with Stripe MCP server
import { ConsultationBooking } from './stripe';

// Function to create a payment link using the Stripe MCP
export async function createPaymentLinkWithMCP(price: string, quantity: number = 1) {
  try {
    // This is where we would call the Stripe MCP tool
    // We need to use the MCP function directly
    return await mcp2_create_payment_link({ price, quantity });
  } catch (error) {
    console.error('Error creating payment link with Stripe MCP:', error);
    throw error;
  }
}

// Process a booking with Stripe MCP
export async function processBookingWithMCP(booking: ConsultationBooking) {
  try {
    // Create a payment link using the Stripe MCP
    const paymentLink = await createPaymentLinkWithMCP(booking.stripePriceId, 1);
    
    // Save booking information for later reference
    localStorage.setItem('pendingBooking', JSON.stringify({
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
    console.error('Error processing booking with Stripe MCP:', error);
    throw error;
  }
}
