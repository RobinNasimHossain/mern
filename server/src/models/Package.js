import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    destination: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    continent: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    highlights: [{ type: String }],
    duration: { type: Number, required: true, min: 1 },
    groupSize: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
    discountPrice: { type: Number, default: null },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    image: { type: String, required: true },
    gallery: [{ type: String }],
    included: [{ type: String }],
    excluded: [{ type: String }],
    itinerary: [
      {
        day: { type: Number, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
    featured: { type: Boolean, default: false },
    category: {
      type: String,
      enum: ["adventure", "beach", "cultural", "wildlife", "luxury", "honeymoon", "family"],
      required: true,
    },
    startDates: [{ type: Date }],
  },
  { timestamps: true }
);

packageSchema.index({ destination: "text", title: "text", country: "text" });

export default mongoose.model("Package", packageSchema);
