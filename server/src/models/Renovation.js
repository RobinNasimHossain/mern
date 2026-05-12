import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    qty: { type: String, default: "" },
    unit: { type: String, default: "" },
    done: { type: Boolean, default: false },
    note: { type: String, default: "" },
  },
  { _id: false }
);

const sectionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    items: [itemSchema],
  },
  { _id: false }
);

const miscItemSchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    qty: { type: String, default: "" },
    unit: { type: String, default: "" },
    done: { type: Boolean, default: false },
  },
  { _id: false }
);

const renovationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    projectId: { type: String, required: true },
    company: { type: String, default: "" },
    address: { type: String, default: "" },
    lockCode: { type: String, default: "" },
    date: { type: String, default: "" },
    description: { type: String, default: "" },
    sections: [sectionSchema],
    miscItems: [miscItemSchema],
  },
  { timestamps: true }
);

renovationSchema.index({ user: 1, createdAt: -1 });

const Renovation = mongoose.model("Renovation", renovationSchema);
export default Renovation;
