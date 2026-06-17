/**
 * ============================================================
 *  Student CRUD Routes (শিক্ষার্থী CRUD রাউটস)
 * ============================================================
 *
 * 🇧🇩 বাংলা:
 *   CRUD মানে — Create (তৈরি), Read (পড়া), Update (হালনাগাদ), Delete (মুছে ফেলা)।
 *   এই ফাইলে শিক্ষার্থীদের জন্য চারটি মূল অপারেশন আছে।
 *
 *   HTTP Methods (HTTP পদ্ধতি):
 *     GET    → ডেটা পড়তে (Read)
 *     POST   → নতুন ডেটা তৈরি করতে (Create)
 *     PUT    → বিদ্যমান ডেটা আপডেট করতে (Update)
 *     DELETE → ডেটা মুছে ফেলতে (Delete)
 *
 * 🇬🇧 English:
 *   CRUD means — Create, Read, Update, Delete.
 *   This file has four main operations for students.
 *
 *   HTTP Methods:
 *     GET    → Read data
 *     POST   → Create new data
 *     PUT    → Update existing data
 *     DELETE → Delete data
 *
 * ────────────────────────────────────────────────────────────
 *  Route Summary (রাউট সারসংক্ষেপ):
 *
 *  Method  | Path              | Description
 *  --------|-------------------|-----------------------------------
 *  GET     | /api/students     | Get all students (সব শিক্ষার্থী)
 *  GET     | /api/students/:id | Get one student (একজন শিক্ষার্থী)
 *  POST    | /api/students     | Create student (নতুন শিক্ষার্থী)
 *  PUT     | /api/students/:id | Update student (আপডেট)
 *  DELETE  | /api/students/:id | Delete student (মুছে ফেলা)
 * ────────────────────────────────────────────────────────────
 */

import { Router } from "express";
import Student from "../models/Student.js";

const router = Router();

// ─── CREATE — নতুন শিক্ষার্থী তৈরি ─────────────────────────
/**
 * 🇧🇩 POST /api/students
 *   নতুন শিক্ষার্থী তৈরি করে।
 *   Request Body-তে name, email, age, subject পাঠাতে হবে।
 *
 *   ডিবাগিং ধাপ (Step-by-Step Debugging):
 *     ধাপ ১: console.log(req.body) দিয়ে দেখুন কী ডেটা আসছে
 *     ধাপ ২: req.body খালি (empty) হলে —
 *            → express.json() middleware আছে কি না চেক করুন (index.js তে)
 *            → Postman/frontend-এ Content-Type: application/json সেট করুন
 *     ধাপ ৩: ValidationError আসলে — required ফিল্ড মিসিং
 *            → err.errors দেখুন কোন ফিল্ড সমস্যা করছে
 *     ধাপ ৪: E11000 duplicate key error — email ইতিমধ্যে আছে
 *            → অন্য email ব্যবহার করুন
 *
 * 🇬🇧 POST /api/students
 *   Creates a new student.
 *   Send name, email, age, subject in request body.
 *
 *   Debugging Steps:
 *     Step 1: Use console.log(req.body) to see what data is received
 *     Step 2: If req.body is empty —
 *            → Check if express.json() middleware exists in index.js
 *            → Set Content-Type: application/json in Postman/frontend
 *     Step 3: If ValidationError — a required field is missing
 *            → Check err.errors to see which field is causing the issue
 *     Step 4: E11000 duplicate key error — email already exists
 *            → Use a different email
 */
router.post("/", async (req, res) => {
  try {
    // 🇧🇩 ধাপ ১: আসা ডেটা দেখুন / 🇬🇧 Step 1: Log incoming data
    console.log("📥 CREATE — req.body:", JSON.stringify(req.body, null, 2));

    const { name, email, age, subject, grade } = req.body;

    // 🇧🇩 ধাপ ২: নতুন Student তৈরি / 🇬🇧 Step 2: Create new Student document
    const student = new Student({ name, email, age, subject, grade });

    // 🇧🇩 ধাপ ৩: ডাটাবেসে সংরক্ষণ / 🇬🇧 Step 3: Save to database
    const saved = await student.save();
    console.log("✅ Created student (শিক্ষার্থী তৈরি):", saved._id);

    res.status(201).json(saved);
  } catch (err) {
    // 🇧🇩 ত্রুটি বিশ্লেষণ / 🇬🇧 Error analysis
    console.error("❌ CREATE error:", err.message);

    if (err.name === "ValidationError") {
      /**
       * 🇧🇩 Mongoose ValidationError:
       *   err.errors অবজেক্টে প্রতিটি ভুল ফিল্ডের বিস্তারিত আছে।
       *   Object.values(err.errors).map(e => e.message) — সব ত্রুটি বার্তা পান।
       *
       * 🇬🇧 Mongoose ValidationError:
       *   err.errors object has details for each invalid field.
       *   Object.values(err.errors).map(e => e.message) — get all error messages.
       */
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ error: "Validation failed", messages });
    }

    if (err.code === 11000) {
      /**
       * 🇧🇩 Duplicate Key Error (E11000):
       *   unique: true ফিল্ডে একই মান দুইবার দিলে এই ত্রুটি আসে।
       *   err.keyValue — কোন ফিল্ড ও মান ডুপ্লিকেট তা দেখায়।
       *
       * 🇬🇧 Duplicate Key Error (E11000):
       *   This happens when a unique field gets the same value twice.
       *   err.keyValue — shows which field and value is duplicated.
       */
      return res.status(409).json({
        error: "Duplicate email (ইমেইল ইতিমধ্যে আছে)",
        field: err.keyValue,
      });
    }

    res.status(500).json({ error: err.message });
  }
});

// ─── READ ALL — সব শিক্ষার্থী পড়া ─────────────────────────
/**
 * 🇧🇩 GET /api/students
 *   সব শিক্ষার্থীর তালিকা ফেরত দেয়। নতুনটি আগে আসবে (sort: -1)।
 *
 *   ডিবাগিং:
 *     • খালি array [] ফেরত আসলে — ডাটাবেসে কোনো ডেটা নেই।
 *       → আগে POST দিয়ে ডেটা তৈরি করুন।
 *     • সংযোগ ত্রুটি — MongoDB চালু নেই।
 *
 * 🇬🇧 GET /api/students
 *   Returns a list of all students. Newest first (sort: -1).
 *
 *   Debugging:
 *     • Empty array [] returned — no data in database.
 *       → Create data first using POST.
 *     • Connection error — MongoDB is not running.
 */
router.get("/", async (_req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    console.log(`📋 READ ALL — Found ${students.length} students`);
    res.json(students);
  } catch (err) {
    console.error("❌ READ ALL error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ─── READ ONE — একজন শিক্ষার্থী পড়া ───────────────────────
/**
 * 🇧🇩 GET /api/students/:id
 *   নির্দিষ্ট ID দিয়ে একজন শিক্ষার্থীর তথ্য আনে।
 *
 *   ডিবাগিং:
 *     • CastError — ID ফরম্যাট ভুল (MongoDB ObjectId ২৪ অক্ষরের হয়)।
 *       উদাহরণ সঠিক ID: 507f1f77bcf86cd799439011
 *     • null ফেরত — এই ID-র কোনো student নেই।
 *
 * 🇬🇧 GET /api/students/:id
 *   Fetches one student by their ID.
 *
 *   Debugging:
 *     • CastError — ID format is wrong (MongoDB ObjectId is 24 characters).
 *       Example valid ID: 507f1f77bcf86cd799439011
 *     • null returned — no student exists with this ID.
 */
router.get("/:id", async (req, res) => {
  try {
    console.log("🔍 READ ONE — ID:", req.params.id);

    const student = await Student.findById(req.params.id);

    if (!student) {
      console.log("⚠️ Student not found (শিক্ষার্থী পাওয়া যায়নি)");
      return res.status(404).json({
        error: "Student not found (শিক্ষার্থী পাওয়া যায়নি)",
      });
    }

    res.json(student);
  } catch (err) {
    console.error("❌ READ ONE error:", err.message);

    if (err.name === "CastError") {
      /**
       * 🇧🇩 CastError মানে ID সঠিক MongoDB ObjectId ফরম্যাটে নেই।
       *   ObjectId: ২৪ অক্ষরের হেক্সাডেসিমাল স্ট্রিং।
       *
       * 🇬🇧 CastError means the ID is not in valid MongoDB ObjectId format.
       *   ObjectId: 24-character hexadecimal string.
       */
      return res.status(400).json({
        error: "Invalid ID format (ID ফরম্যাট ভুল)",
      });
    }

    res.status(500).json({ error: err.message });
  }
});

// ─── UPDATE — শিক্ষার্থী আপডেট ─────────────────────────────
/**
 * 🇧🇩 PUT /api/students/:id
 *   নির্দিষ্ট ID-র শিক্ষার্থীর তথ্য আপডেট করে।
 *
 *   ডিবাগিং ধাপ:
 *     ধাপ ১: req.params.id সঠিক কি না চেক করুন
 *     ধাপ ২: req.body তে কী আসছে দেখুন
 *     ধাপ ৩: findByIdAndUpdate-এর ৩য় প্যারামিটারে —
 *            { new: true } → আপডেটের পরের ডেটা ফেরত দেয়
 *            { runValidators: true } → validation চালায়
 *            এগুলো না দিলে পুরাতন ডেটা ফেরত আসবে বা validation হবে না!
 *
 * 🇬🇧 PUT /api/students/:id
 *   Updates a student by their ID.
 *
 *   Debugging Steps:
 *     Step 1: Check if req.params.id is correct
 *     Step 2: See what's coming in req.body
 *     Step 3: In findByIdAndUpdate 3rd parameter —
 *            { new: true } → returns the updated data
 *            { runValidators: true } → runs schema validation
 *            Without these, old data is returned or validation is skipped!
 */
router.put("/:id", async (req, res) => {
  try {
    console.log("📝 UPDATE — ID:", req.params.id);
    console.log("📝 UPDATE — Body:", JSON.stringify(req.body, null, 2));

    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // 🇧🇩 আপডেটের পরের ডেটা ফেরত দাও / 🇬🇧 Return updated document
        runValidators: true, // 🇧🇩 Schema validation চালাও / 🇬🇧 Run schema validations
      }
    );

    if (!updated) {
      return res.status(404).json({
        error: "Student not found (শিক্ষার্থী পাওয়া যায়নি)",
      });
    }

    console.log("✅ Updated student (শিক্ষার্থী আপডেট হয়েছে):", updated._id);
    res.json(updated);
  } catch (err) {
    console.error("❌ UPDATE error:", err.message);

    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ error: "Validation failed", messages });
    }

    if (err.name === "CastError") {
      return res.status(400).json({
        error: "Invalid ID format (ID ফরম্যাট ভুল)",
      });
    }

    if (err.code === 11000) {
      return res.status(409).json({
        error: "Duplicate email (ইমেইল ইতিমধ্যে আছে)",
        field: err.keyValue,
      });
    }

    res.status(500).json({ error: err.message });
  }
});

// ─── DELETE — শিক্ষার্থী মুছে ফেলা ─────────────────────────
/**
 * 🇧🇩 DELETE /api/students/:id
 *   নির্দিষ্ট ID-র শিক্ষার্থীকে ডাটাবেস থেকে মুছে ফেলে।
 *
 *   ডিবাগিং:
 *     • ৪০৪ ত্রুটি — এই ID-র student নেই (আগেই মুছে ফেলা হয়েছে)।
 *     • মনে রাখবেন: Delete করলে ডেটা স্থায়ীভাবে চলে যায়!
 *       Production-এ soft delete (isDeleted: true) ব্যবহার করা ভালো।
 *
 * 🇬🇧 DELETE /api/students/:id
 *   Permanently deletes a student from the database.
 *
 *   Debugging:
 *     • 404 error — no student with this ID (already deleted).
 *     • Remember: Delete is permanent!
 *       In production, consider using soft delete (isDeleted: true).
 */
router.delete("/:id", async (req, res) => {
  try {
    console.log("🗑️ DELETE — ID:", req.params.id);

    const deleted = await Student.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        error: "Student not found (শিক্ষার্থী পাওয়া যায়নি)",
      });
    }

    console.log("✅ Deleted student (শিক্ষার্থী মুছে ফেলা হয়েছে):", deleted._id);
    res.json({
      message: "Student deleted successfully (শিক্ষার্থী সফলভাবে মুছে ফেলা হয়েছে)",
      deleted,
    });
  } catch (err) {
    console.error("❌ DELETE error:", err.message);

    if (err.name === "CastError") {
      return res.status(400).json({
        error: "Invalid ID format (ID ফরম্যাট ভুল)",
      });
    }

    res.status(500).json({ error: err.message });
  }
});

export default router;
