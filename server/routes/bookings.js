const express = require('express');
const router = express.Router();

// In-memory storage for bookings (in a real app, this would be a database)
const bookings = [];

// Save a new booking
router.post('/api/save-booking', (req, res) => {
  try {
    const bookingData = req.body;
    
    // Validate required fields
    if (!bookingData.fullName || !bookingData.email || !bookingData.appointmentDate || !bookingData.consultationType) {
      return res.status(400).json({ error: 'Missing required booking information' });
    }
    
    // Add booking ID and timestamp
    const booking = {
      ...bookingData,
      id: `booking-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    
    // Save booking (in a real app, this would save to a database)
    bookings.push(booking);
    
    // In a real app, you would send a confirmation email here
    
    // Return success with booking ID
    res.status(201).json({ 
      success: true, 
      bookingId: booking.id,
      message: 'Booking saved successfully' 
    });
  } catch (error) {
    console.error('Error saving booking:', error);
    res.status(500).json({ error: 'Failed to save booking' });
  }
});

// Get all bookings (for admin purposes)
router.get('/api/bookings', (req, res) => {
  res.json(bookings);
});

// Get a specific booking by ID
router.get('/api/bookings/:id', (req, res) => {
  const booking = bookings.find(b => b.id === req.params.id);
  
  if (!booking) {
    return res.status(404).json({ error: 'Booking not found' });
  }
  
  res.json(booking);
});

module.exports = router;
