/**
 * ============================================================
 *  React Entry Point (React এন্ট্রি পয়েন্ট)
 * ============================================================
 *
 * 🇧🇩 বাংলা:
 *   এটি React অ্যাপের শুরুর ফাইল।
 *   ReactDOM.createRoot() দিয়ে React অ্যাপকে HTML-এর #root এলিমেন্টে রেন্ডার করা হয়।
 *
 *   StrictMode কী?
 *     ডেভেলপমেন্টে সম্ভাব্য সমস্যা খুঁজে বের করতে সাহায্য করে।
 *     এটি প্রতিটি component দুইবার রেন্ডার করে (শুধু dev mode-এ)।
 *
 *   ডিবাগিং:
 *     • পেজ সাদা (blank) আসলে — Browser Console (F12) এ ত্রুটি দেখুন
 *     • "Target container is not a DOM element" — index.html এ id="root" আছে কি না চেক করুন
 *
 * 🇬🇧 English:
 *   This is the React app's starting file.
 *   ReactDOM.createRoot() renders the React app into the #root HTML element.
 *
 *   What is StrictMode?
 *     Helps find potential problems during development.
 *     It renders every component twice (only in dev mode).
 *
 *   Debugging:
 *     • Blank page — check Browser Console (F12) for errors
 *     • "Target container is not a DOM element" — check if id="root" exists in index.html
 */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
