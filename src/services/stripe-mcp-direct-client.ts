// Direct client-side integration with Stripe MCP server
import { ConsultationBooking } from './stripe';

// Function to create a payment link using the Stripe MCP directly
export async function createPaymentLink(priceId: string, quantity: number = 1) {
  try {
    // Direct call to the Stripe MCP tool
    const result = await mcp2_create_payment_link({
      price: priceId,
      quantity
    });
    
    return result;
  } catch (error) {
    console.error('Error creating payment link with Stripe MCP:', error);
    throw error;
  }
}

// Process a booking with direct Stripe MCP integration
export async function processBookingWithMCP(booking: ConsultationBooking) {
  try {
    // Create a payment link directly using the Stripe MCP
    const paymentLink = await createPaymentLink(booking.stripePriceId, 1);
    
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
