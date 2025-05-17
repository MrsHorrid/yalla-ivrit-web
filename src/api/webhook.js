// API endpoint to handle Stripe webhook events
import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe('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');

// Set your webhook secret
const webhookSecret = 'whsec_your_webhook_secret';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // Verify the webhook signature
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      
      // Handle successful checkout
      console.log('Checkout completed:', session);
      
      // In a real implementation, you would:
      // 1. Update the booking status in your database
      // 2. Send a confirmation email to the customer
      // 3. Notify the admin about the new booking
      
      break;
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('Payment succeeded:', paymentIntent);
      break;
    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      console.log('Payment failed:', failedPayment);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.status(200).json({ received: true });
}
