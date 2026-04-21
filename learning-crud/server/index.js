/**
 * ============================================================
 *  MERN CRUD — Server Entry Point (সার্ভার এন্ট্রি পয়েন্ট)
 * ============================================================
 *
 * 🇧🇩 বাংলা:
 *   এটি সার্ভারের মূল ফাইল। এখানে আমরা —
 *     ১. Express অ্যাপ তৈরি করি
 *     ২. MongoDB-তে সংযোগ স্থাপন করি
 *     ৩. সার্ভার চালু করি
 *
 *   ডিবাগিং টিপস:
 *     • সার্ভার চালু না হলে — PORT ব্যবহৃত হচ্ছে কি না তা চেক করুন
 *       কমান্ড: lsof -i :4000
 *     • MongoDB সংযোগ ব্যর্থ হলে — MongoDB চালু আছে কি না দেখুন
 *       কমান্ড: mongosh --eval "db.runCommand({ ping: 1 })"
 *     • "Cannot find module" ত্রুটি — npm install চালান
 *
 * 🇬🇧 English:
 *   This is the main server file. Here we —
 *     1. Create the Express app
 *     2. Connect to MongoDB
 *     3. Start the server
 *
 *   Debugging Tips:
 *     • Server won't start — check if PORT is already in use
 *       Command: lsof -i :4000
 *     • MongoDB connection fails — verify MongoDB is running
 *       Command: mongosh --eval "db.runCommand({ ping: 1 })"
 *     • "Cannot find module" error — run npm install
 */

import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import studentRoutes from "./routes/students.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ─── Configuration (কনফিগারেশন) ────────────────────────────
// 🇧🇩 পরিবেশ ভেরিয়েবল থেকে মান নিন, না থাকলে ডিফল্ট ব্যবহার করুন
// 🇬🇧 Read values from environment variables, use defaults if missing
const PORT = process.env.PORT || 4000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/learning_crud";

// ─── Express App Setup (Express অ্যাপ সেটআপ) ──────────────
const app = express();

/**
 * 🇧🇩 Middleware কী?
 *   Middleware হলো ফাংশন যা request এবং response-এর মাঝখানে চলে।
 *   প্রতিটি request আসলে প্রথমে middleware-এর মধ্য দিয়ে যায়।
 *
 * 🇬🇧 What is Middleware?
 *   Middleware are functions that run between request and response.
 *   Every request passes through middleware first before reaching routes.
 *
 * ডিবাগিং / Debugging:
 *   • CORS ত্রুটি (CORS error) — origin ভুল হলে ব্রাউজারে
 *     "Access-Control-Allow-Origin" ত্রুটি দেখাবে।
 *     ফিক্স: নিচে origin সঠিকভাবে সেট করুন।
 *   • JSON পার্স ত্রুটি (JSON parse error) — request body-তে
 *     ভুল JSON পাঠালে 400 ত্রুটি আসবে।
 *     ফিক্স: Postman/frontend থেকে সঠিক JSON পাঠান।
 */
const allowedOrigins = process.env.CLIENT_ORIGIN || "http://localhost:5173";
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use(morgan("dev"));

// ─── Routes (রাউটস) ────────────────────────────────────────
/**
 * 🇧🇩 রাউট কী?
 *   রাউট হলো URL পাথ যেখানে ক্লায়েন্ট request পাঠায়।
 *   /api/students — এই পাথে সব student সম্পর্কিত CRUD অপারেশন হবে।
 *
 * 🇬🇧 What are Routes?
 *   Routes are URL paths where the client sends requests.
 *   /api/students — all student CRUD operations happen at this path.
 */
app.use("/api/students", studentRoutes);

// ─── Health Check (হেলথ চেক) ───────────────────────────────
/**
 * 🇧🇩 সার্ভার চালু আছে কি না তা পরীক্ষা করতে এই endpoint ব্যবহার করুন।
 *   ব্রাউজারে যান: http://localhost:4000/api/health
 *   { "status": "ok" } দেখলে সার্ভার ঠিক আছে।
 *
 * 🇬🇧 Use this endpoint to check if the server is running.
 *   Visit: http://localhost:4000/api/health
 *   If you see { "status": "ok" } — the server is working.
 */
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// ─── Serve Frontend in Production (প্রোডাকশনে ফ্রন্টএন্ড সার্ভ) ──
const clientDist = path.join(__dirname, "..", "client", "dist");
app.use(express.static(clientDist));

// ─── 404 / SPA Fallback Handler ─────────────────────────────
app.use((req, res) => {
  if (req.path.startsWith("/api/")) {
    return res.status(404).json({ error: "Route not found (রাউট পাওয়া যায়নি)" });
  }
  res.sendFile(path.join(clientDist, "index.html"));
});

// ─── Global Error Handler (গ্লোবাল ত্রুটি হ্যান্ডলার) ────
/**
 * 🇧🇩 যেকোনো route বা middleware-এ ত্রুটি হলে এটি চলবে।
 *   console-এ err.stack দেখুন — কোন লাইনে ত্রুটি হয়েছে তা জানাবে।
 *
 * 🇬🇧 This runs when any route or middleware throws an error.
 *   Check err.stack in console — it tells you which line caused the error.
 */
app.use((err, _req, res, _next) => {
  console.error("❌ Server Error (সার্ভার ত্রুটি):", err.stack);
  res.status(500).json({
    error: "Internal server error (অভ্যন্তরীণ সার্ভার ত্রুটি)",
    message: err.message,
  });
});

// ─── MongoDB Connection & Server Start ──────────────────────
/**
 * 🇧🇩 MongoDB সংযোগ (Connection):
 *   mongoose.connect() দিয়ে আমরা MongoDB-তে সংযোগ করি।
 *   সংযোগ সফল হলে সার্ভার চালু হয়, ব্যর্থ হলে process বন্ধ হয়।
 *
 *   সাধারণ ত্রুটি ও সমাধান:
 *     • MongoServerError: connect ECONNREFUSED
 *       → MongoDB চালু নেই। চালু করুন: mongod বা docker start mern-mongo
 *     • MongooseServerSelectionError
 *       → URI ভুল বা নেটওয়ার্ক সমস্যা। MONGODB_URI চেক করুন।
 *
 * 🇬🇧 MongoDB Connection:
 *   We use mongoose.connect() to connect to MongoDB.
 *   If connection succeeds, the server starts; if it fails, the process exits.
 *
 *   Common Errors & Solutions:
 *     • MongoServerError: connect ECONNREFUSED
 *       → MongoDB is not running. Start it: mongod or docker start mern-mongo
 *     • MongooseServerSelectionError
 *       → Wrong URI or network issue. Check MONGODB_URI.
 */
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB connected (MongoDB সংযুক্ত)");
    app.listen(PORT, () => {
      console.log(`🚀 Server running (সার্ভার চালু): http://localhost:${PORT}`);
      console.log(
        `📋 API Health: http://localhost:${PORT}/api/health`
      );
      console.log(
        `📚 Students API: http://localhost:${PORT}/api/students`
      );
    });
  })
  .catch((err) => {
    /**
     * 🇧🇩 এখানে সংযোগ ত্রুটি ধরা হয়। err.message পড়ুন।
     * 🇬🇧 Connection error is caught here. Read err.message.
     */
    console.error("❌ MongoDB connection failed (সংযোগ ব্যর্থ):", err.message);
    console.error(
      "💡 Tip: Make sure MongoDB is running (MongoDB চালু আছে কি না নিশ্চিত করুন)"
    );
    process.exit(1);
  });
