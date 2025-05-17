import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

// ES Module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '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');

// Serve static files
const distPath = path.join(__dirname, 'dist');
console.log('Serving static files from:', distPath);

// Check if dist directory exists
if (fs.existsSync(distPath)) {
  console.log('Dist directory found');
  
  // List files in the dist directory for debugging
  const files = fs.readdirSync(distPath);
  console.log('Files in dist directory:', files);
  
  // Check if index.html exists
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    console.log('index.html found');
    
    // Log the first few lines of index.html for debugging
    const indexContent = fs.readFileSync(indexPath, 'utf8').slice(0, 500);
    console.log('index.html content preview:', indexContent);
  } else {
    console.error('index.html not found in dist directory');
  }
} else {
  console.error('Dist directory not found');
}

// Serve static files from the dist directory
app.use(express.static(distPath));

// API Routes
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { priceId, customerEmail, customerName, metadata } = req.body;
    
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
});

// Add a test route to verify the server is working
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working' });
});

// Fallback route for client-side routing
app.get('*', (req, res) => {
  console.log('Fallback route hit for:', req.url);
  res.sendFile(path.join(distPath, 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
