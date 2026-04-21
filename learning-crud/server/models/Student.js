/**
 * ============================================================
 *  Student Model (শিক্ষার্থী মডেল) — Mongoose Schema
 * ============================================================
 *
 * 🇧🇩 বাংলা:
 *   মডেল (Model) হলো MongoDB collection-এর গঠন (structure)।
 *   এখানে আমরা নির্ধারণ করি একজন শিক্ষার্থীর কী কী তথ্য থাকবে।
 *
 *   Schema কী?
 *     Schema হলো একটি নকশা (blueprint) যা বলে দেয় —
 *     কোন ফিল্ডে কী ধরনের ডেটা যাবে (String, Number, ইত্যাদি)।
 *
 *   ডিবাগিং টিপস:
 *     • ValidationError — required ফিল্ড খালি পাঠালে এই ত্রুটি আসে।
 *       সমাধান: সব required ফিল্ড সঠিকভাবে পাঠান।
 *     • CastError — ভুল ধরনের ডেটা পাঠালে আসে (যেমন age-এ "abc")।
 *       সমাধান: সঠিক ডেটা টাইপ ব্যবহার করুন।
 *     • "students" collection দেখতে — mongosh তে: db.students.find()
 *
 * 🇬🇧 English:
 *   A Model defines the structure of a MongoDB collection.
 *   Here we define what data a student record will have.
 *
 *   What is a Schema?
 *     A Schema is a blueprint that specifies —
 *     what type of data goes in each field (String, Number, etc.).
 *
 *   Debugging Tips:
 *     • ValidationError — happens when a required field is empty.
 *       Fix: Send all required fields correctly.
 *     • CastError — happens with wrong data type (e.g., "abc" for age).
 *       Fix: Use the correct data type.
 *     • To view "students" collection — in mongosh: db.students.find()
 */

import mongoose from "mongoose";

/**
 * 🇧🇩 Schema তৈরি করা:
 *   প্রতিটি ফিল্ডে আমরা type, required, এবং অন্যান্য validation দিই।
 *   trim: true → আগে-পরে খালি জায়গা (space) সরিয়ে দেয়।
 *   min/max → সর্বনিম্ন ও সর্বোচ্চ মান নির্ধারণ।
 *   enum → শুধু নির্দিষ্ট মান (values) গ্রহণযোগ্য।
 *   default → কোনো মান না দিলে এই মান ব্যবহার হবে।
 *
 * 🇬🇧 Creating the Schema:
 *   Each field has type, required, and other validations.
 *   trim: true → removes leading/trailing whitespace.
 *   min/max → minimum and maximum allowed values.
 *   enum → only specific values are accepted.
 *   default → this value is used if none is provided.
 */
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required (নাম আবশ্যক)"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters (নাম কমপক্ষে ২ অক্ষর হতে হবে)"],
    },
    email: {
      type: String,
      required: [true, "Email is required (ইমেইল আবশ্যক)"],
      trim: true,
      lowercase: true,
      unique: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Invalid email format (ইমেইল ফরম্যাট ভুল)",
      ],
    },
    age: {
      type: Number,
      required: [true, "Age is required (বয়স আবশ্যক)"],
      min: [5, "Age must be at least 5 (বয়স কমপক্ষে ৫ হতে হবে)"],
      max: [100, "Age must be at most 100 (বয়স সর্বোচ্চ ১০০ হতে পারে)"],
    },
    subject: {
      type: String,
      required: [true, "Subject is required (বিষয় আবশ্যক)"],
      trim: true,
    },
    grade: {
      type: String,
      enum: {
        values: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F"],
        message: "Invalid grade (গ্রেড সঠিক নয়). Must be A+ to F.",
      },
      default: "C",
    },
  },
  {
    /**
     * 🇧🇩 timestamps: true → Mongoose স্বয়ংক্রিয়ভাবে createdAt ও updatedAt ফিল্ড যোগ করে।
     *   কখন তৈরি হয়েছে এবং কখন আপডেট হয়েছে তা ট্র্যাক করে।
     *
     * 🇬🇧 timestamps: true → Mongoose auto-adds createdAt and updatedAt fields.
     *   Tracks when the record was created and last updated.
     */
    timestamps: true,
  }
);

/**
 * 🇧🇩 মডেল তৈরি (Model Creation):
 *   mongoose.model("Student", studentSchema) → "students" collection তৈরি হয়।
 *   Mongoose স্বয়ংক্রিয়ভাবে নাম ছোট হাতের (lowercase) ও বহুবচন (plural) করে।
 *   "Student" → "students" collection
 *
 * 🇬🇧 Model Creation:
 *   mongoose.model("Student", studentSchema) → creates a "students" collection.
 *   Mongoose automatically lowercases and pluralizes the name.
 *   "Student" → "students" collection
 */
const Student = mongoose.model("Student", studentSchema);

export default Student;
