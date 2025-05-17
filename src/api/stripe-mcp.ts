// Direct integration with Stripe MCP
import { ConsultationBooking } from '@/services/stripe';

// Create a customer using Stripe MCP
export async function createCustomer(name: string, email: string) {
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
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create customer');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
}

// Create a payment link using Stripe MCP
export async function createPaymentLink(price: string, quantity: number = 1) {
  try {
    // Use the Stripe MCP to create a payment link
    const response = await fetch('/api/stripe/create-payment-link', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ price, quantity }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create payment link');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating payment link:', error);
    throw error;
  }
}

// Process a booking with Stripe MCP
export async function processBooking(booking: ConsultationBooking) {
  try {
    // First create a customer
    const customer = await createCustomer(booking.fullName, booking.email);
    
    // Then create a payment link
    const paymentLink = await createPaymentLink(booking.stripePriceId, 1);
    
    // Return the payment link URL
    return {
      url: paymentLink.url,
      id: paymentLink.id,
      customer: customer.id
    };
  } catch (error) {
    console.error('Error processing booking:', error);
    throw error;
  }
}
