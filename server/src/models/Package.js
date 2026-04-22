const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  destination: { type: String, required: true },
  country: { type: String, required: true },
  continent: { type: String, required: true },
  description: { type: String, required: true },
  highlights: [String],
  duration: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  rating: { type: Number, default: 4.5 },
  reviewCount: { type: Number, default: 0 },
  image: { type: String, required: true },
  gallery: [String],
  included: [String],
  excluded: [String],
  itinerary: [{
    day: Number,
    title: String,
    description: String,
  }],
  category: { type: String, enum: ['adventure', 'beach', 'cultural', 'wildlife', 'luxury', 'honeymoon'], default: 'cultural' },
  featured: { type: Boolean, default: false },
  maxGroupSize: { type: Number, default: 20 },
  difficulty: { type: String, enum: ['easy', 'moderate', 'challenging'], default: 'easy' },
}, { timestamps: true });

module.exports = mongoose.model('Package', packageSchema);
