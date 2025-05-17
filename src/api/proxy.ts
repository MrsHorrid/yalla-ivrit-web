// This file serves as a proxy for API requests
// It will handle redirecting requests to the appropriate backend endpoints

import { PaymentIntentRequest } from './stripe';

// Base URL for API requests
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Generic fetch function with error handling
async function fetchWithErrorHandling(url: string, options: RequestInit = {}) {
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(errorData.error || `HTTP error ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// Create a payment intent
export async function createPaymentIntent(data: PaymentIntentRequest) {
  return fetchWithErrorHandling(`${API_BASE_URL}/api/create-payment-intent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

// Save consultation booking
export async function saveConsultationBooking(bookingData: any) {
  return fetchWithErrorHandling(`${API_BASE_URL}/api/save-booking`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookingData),
  });
}
