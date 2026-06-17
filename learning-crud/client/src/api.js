/**
 * ============================================================
 *  API Helper (API সহায়ক) — Axios Client
 * ============================================================
 *
 * 🇧🇩 বাংলা:
 *   Axios হলো HTTP request পাঠানোর একটি লাইব্রেরি।
 *   এখানে আমরা সব API call এক জায়গায় রাখি — এতে কোড পরিষ্কার থাকে।
 *
 *   baseURL: Vite proxy ব্যবহার করায় শুধু "/api" দিলেই হয়।
 *   Production-এ পুরো URL দিতে হবে (যেমন: https://api.example.com)
 *
 *   ডিবাগিং:
 *     • Network Error — সার্ভার চালু নেই বা URL ভুল
 *     • 404 — endpoint path ভুল (/api/students বনাম /api/student)
 *     • 500 — সার্ভারে ত্রুটি আছে, সার্ভার console দেখুন
 *     • CORS error — proxy config ভুল বা সার্ভারে CORS সেট নেই
 *
 * 🇬🇧 English:
 *   Axios is an HTTP request library.
 *   We keep all API calls in one place — keeps the code clean.
 *
 *   baseURL: With Vite proxy, just "/api" works.
 *   In production, use the full URL (e.g., https://api.example.com)
 *
 *   Debugging:
 *     • Network Error — server not running or wrong URL
 *     • 404 — wrong endpoint path (/api/students vs /api/student)
 *     • 500 — server-side error, check server console
 *     • CORS error — wrong proxy config or CORS not set on server
 */
import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});

/**
 * 🇧🇩 Response Interceptor:
 *   প্রতিটি API response-এ ত্রুটি হলে এখানে ধরা যায়।
 *   এটি debugging-এ অনেক সাহায্য করে — সব ত্রুটি এক জায়গায় দেখা যায়।
 *
 * 🇬🇧 Response Interceptor:
 *   Catches errors from every API response in one place.
 *   Very helpful for debugging — all errors visible in one spot.
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      "🔴 API Error (API ত্রুটি):",
      error.response?.status,
      error.response?.data || error.message
    );
    return Promise.reject(error);
  }
);

// ─── CRUD Functions (CRUD ফাংশন) ───────────────────────────

/** 🇧🇩 সব শিক্ষার্থী আনো / 🇬🇧 Fetch all students */
export const getStudents = () => api.get("/students");

/** 🇧🇩 একজন শিক্ষার্থী আনো / 🇬🇧 Fetch one student by ID */
export const getStudent = (id) => api.get(`/students/${id}`);

/** 🇧🇩 নতুন শিক্ষার্থী তৈরি করো / 🇬🇧 Create a new student */
export const createStudent = (data) => api.post("/students", data);

/** 🇧🇩 শিক্ষার্থী আপডেট করো / 🇬🇧 Update a student */
export const updateStudent = (id, data) => api.put(`/students/${id}`, data);

/** 🇧🇩 শিক্ষার্থী মুছে ফেলো / 🇬🇧 Delete a student */
export const deleteStudent = (id) => api.delete(`/students/${id}`);
