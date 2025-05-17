// API endpoint to create a Stripe Checkout session
import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe('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');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { priceId, customerEmail, customerName, metadata } = req.body;

    // Create a Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/cancel`,
      customer_email: customerEmail,
      client_reference_id: `booking_${Date.now()}`,
      metadata: {
        customerName,
        ...metadata,
      },
    });

    res.status(200).json({ id: session.id, url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
}
