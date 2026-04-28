const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const packageRoutes = require('../src/routes/packages');
const bookingRoutes = require('../src/routes/bookings');
const contactRoutes = require('../src/routes/contact');

const app = express();

app.use(cors({
  origin: process.env.CLIENT_ORIGIN || '*',
  credentials: true,
}));
app.use(express.json());

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/wanderlust';

let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(MONGO_URI);
  isConnected = true;
}

app.use(async (_req, _res, next) => {
  await connectDB();
  next();
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'wanderlust-travels-api' });
});

app.use('/api/packages', packageRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/contact', contactRoutes);

app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;
