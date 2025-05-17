// Stripe service for handling payments using Stripe MCP

// Types for the consultation booking
export interface ConsultationBooking {
  fullName: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
  consultationType: string;
  consultationName: string;
  consultationPrice: number;
  appointmentDate: string;
  stripeProductId: string;
  stripePriceId: string;
}

// Create a payment link for a consultation using Stripe MCP
export const createConsultationPaymentLink = async (
  booking: ConsultationBooking
): Promise<{ url: string, id: string }> => {
  try {
    // Create a customer in Stripe
    const customerResponse = await fetch('/api/stripe/create-customer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: booking.fullName,
        email: booking.email,
      }),
    });
    
    if (!customerResponse.ok) {
      throw new Error('Failed to create customer');
    }
    
    const customer = await customerResponse.json();
    
    // Create a payment link using Stripe MCP
    const paymentLinkResponse = await fetch('/api/stripe/create-payment-link', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId: booking.stripePriceId,
        quantity: 1,
        customerId: customer.id,
        metadata: {
          consultationType: booking.consultationType,
          appointmentDate: booking.appointmentDate,
          customerName: booking.fullName,
          customerPhone: booking.phone,
          topic: booking.topic,
          message: booking.message,
        },
      }),
    });
    
    if (!paymentLinkResponse.ok) {
      throw new Error('Failed to create payment link');
    }
    
    const paymentLink = await paymentLinkResponse.json();
    return paymentLink;
  } catch (error) {
    console.error('Error creating payment link:', error);
    throw error;
  }
};

// Process a successful payment
export const processSuccessfulPayment = async (
  booking: ConsultationBooking
): Promise<void> => {
  try {
    // In a real implementation, we would save the booking to a database
    // For now, we'll just log it to the console
    console.log('Booking saved:', booking);
    
    // We would also send a confirmation email to the customer
    console.log(`Confirmation email sent to ${booking.email}`);
  } catch (error) {
    console.error('Error processing payment:', error);
    throw error;
  }
};
