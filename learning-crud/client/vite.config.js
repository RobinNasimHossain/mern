/**
 * 🇧🇩 Vite কনফিগারেশন:
 *   Vite হলো দ্রুত ডেভেলপমেন্ট সার্ভার ও বিল্ড টুল।
 *
 *   proxy কী?
 *     ডেভেলপমেন্টে frontend (port 5173) থেকে backend (port 4000) এ
 *     API call পাঠাতে proxy ব্যবহার করা হয়।
 *     এটি CORS সমস্যা এড়াতে সাহায্য করে।
 *
 *   ডিবাগিং:
 *     • "Network Error" বা "CORS error" — proxy সেটিংস চেক করুন
 *     • Backend চালু আছে কি না নিশ্চিত করুন (port 4000)
 *
 * 🇬🇧 Vite Configuration:
 *   Vite is a fast development server and build tool.
 *
 *   What is proxy?
 *     In development, proxy forwards API calls from frontend (port 5173)
 *     to backend (port 4000). This helps avoid CORS issues.
 *
 *   Debugging:
 *     • "Network Error" or "CORS error" — check proxy settings
 *     • Make sure backend is running (port 4000)
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
      },
    },
  },
});
