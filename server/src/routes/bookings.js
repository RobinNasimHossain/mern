const express = require('express');
const Booking = require('../models/Booking');
const Package = require('../models/Package');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { packageId, firstName, lastName, email, phone, travelDate, guests, specialRequests } = req.body;

    const pkg = await Package.findById(packageId);
    if (!pkg) return res.status(404).json({ error: 'Package not found' });

    if (!guests || guests < 1 || guests > pkg.maxGroupSize) {
      return res.status(400).json({ error: `Guests must be between 1 and ${pkg.maxGroupSize}` });
    }

    const totalPrice = pkg.price * guests;

    const booking = await Booking.create({
      packageId,
      packageTitle: pkg.title,
      firstName,
      lastName,
      email,
      phone,
      travelDate,
      guests,
      specialRequests,
      totalPrice,
    });

    res.status(201).json({
      message: 'Booking created successfully!',
      booking: {
        bookingRef: booking.bookingRef,
        packageTitle: booking.packageTitle,
        travelDate: booking.travelDate,
        guests: booking.guests,
        totalPrice: booking.totalPrice,
        status: booking.status,
      },
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/lookup/:ref', async (req, res) => {
  try {
    const booking = await Booking.findOne({ bookingRef: req.params.ref });
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
