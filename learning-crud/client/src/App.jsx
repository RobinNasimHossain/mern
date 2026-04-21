/**
 * ============================================================
 *  App Component (অ্যাপ কম্পোনেন্ট) — Main Application
 * ============================================================
 *
 * 🇧🇩 বাংলা:
 *   এটি React অ্যাপের মূল কম্পোনেন্ট।
 *   এখানে আমরা —
 *     ১. State (অবস্থা) পরিচালনা করি — useState
 *     ২. Side Effects (পার্শ্ব প্রতিক্রিয়া) পরিচালনা করি — useEffect
 *     ৩. CRUD অপারেশন ফাংশন রাখি
 *     ৪. StudentForm ও StudentList কম্পোনেন্ট রেন্ডার করি
 *
 *   State কী?
 *     State হলো ডেটা যা পরিবর্তন হলে UI স্বয়ংক্রিয়ভাবে আপডেট হয়।
 *
 *   useEffect কী?
 *     useEffect একটি Hook যা component রেন্ডারের পরে চলে।
 *     এখানে আমরা প্রথমবার ডেটা লোড করতে useEffect ব্যবহার করি।
 *
 *   ডিবাগিং:
 *     • ডেটা দেখা যাচ্ছে না — console.log দিয়ে state চেক করুন
 *     • অসীম লুপ (infinite loop) — useEffect এর dependency array ([]) চেক করুন
 *     • "Cannot read properties of undefined" — ডেটা লোড হওয়ার আগেই
 *       অ্যাক্সেস করা হচ্ছে; loading state ব্যবহার করুন
 *
 * 🇬🇧 English:
 *   This is the main React component.
 *   Here we —
 *     1. Manage State — useState
 *     2. Handle Side Effects — useEffect
 *     3. Keep CRUD operation functions
 *     4. Render StudentForm and StudentList components
 *
 *   What is State?
 *     State is data that, when changed, automatically updates the UI.
 *
 *   What is useEffect?
 *     useEffect is a Hook that runs after component renders.
 *     We use it here to load data on the first render.
 *
 *   Debugging:
 *     • Data not showing — use console.log to check state
 *     • Infinite loop — check useEffect dependency array ([])
 *     • "Cannot read properties of undefined" — data accessed before loading;
 *       use loading state
 */
import { useState, useEffect } from "react";
import StudentForm from "./components/StudentForm.jsx";
import StudentList from "./components/StudentList.jsx";
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "./api.js";

export default function App() {
  /**
   * 🇧🇩 State ঘোষণা (State Declaration):
   *   students — শিক্ষার্থীদের তালিকা (array)
   *   editing — যে শিক্ষার্থী এডিট হচ্ছে তার ডেটা (object অথবা null)
   *   loading — ডেটা লোড হচ্ছে কি না (boolean)
   *   error — কোনো ত্রুটি আছে কি না (string অথবা null)
   *
   * 🇬🇧 State Declaration:
   *   students — list of students (array)
   *   editing — data of the student being edited (object or null)
   *   loading — whether data is loading (boolean)
   *   error — any error message (string or null)
   */
  const [students, setStudents] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * 🇧🇩 useEffect — প্রথম রেন্ডারে ডেটা লোড:
   *   dependency array [] খালি → শুধু একবার চলবে (component mount-এ)।
   *   যদি [] না দেন → প্রতিটি রেন্ডারে চলবে (অসীম লুপ!)
   *
   *   ডিবাগিং:
   *     • দুইবার চলছে? → StrictMode এর কারণে (স্বাভাবিক, শুধু dev mode-এ)
   *     • ডেটা আসছে না? → console.log দিয়ে response চেক করুন
   *     • Network Error? → সার্ভার চালু আছে কি না দেখুন
   *
   * 🇬🇧 useEffect — Load data on first render:
   *   Empty dependency array [] → runs only once (on component mount).
   *   If you remove [] → runs on every render (infinite loop!)
   *
   *   Debugging:
   *     • Running twice? → Because of StrictMode (normal, dev mode only)
   *     • No data? → Check response with console.log
   *     • Network Error? → Check if server is running
   */
  useEffect(() => {
    fetchStudents();
  }, []);

  async function fetchStudents() {
    try {
      setLoading(true);
      setError(null);
      const res = await getStudents();
      console.log("📋 Fetched students (শিক্ষার্থী লোড):", res.data.length);
      setStudents(res.data);
    } catch (err) {
      console.error("❌ Fetch error:", err);
      setError(
        err.response?.data?.error ||
          "Failed to load students (শিক্ষার্থী লোড ব্যর্থ)"
      );
    } finally {
      setLoading(false);
    }
  }

  /**
   * 🇧🇩 handleCreate — নতুন শিক্ষার্থী তৈরি:
   *   ১. API call করে ডেটা পাঠায়
   *   ২. সফল হলে তালিকার শুরুতে নতুন student যোগ করে
   *   ৩. ব্যর্থ হলে error message দেখায়
   *
   * 🇬🇧 handleCreate — Create new student:
   *   1. Makes API call to send data
   *   2. If successful, adds new student to the beginning of the list
   *   3. If failed, shows error message
   */
  async function handleCreate(data) {
    try {
      setError(null);
      const res = await createStudent(data);
      console.log("✅ Created:", res.data._id);
      setStudents((prev) => [res.data, ...prev]);
      return { success: true };
    } catch (err) {
      const msg =
        err.response?.data?.messages?.join(", ") ||
        err.response?.data?.error ||
        "Create failed (তৈরি ব্যর্থ)";
      setError(msg);
      return { success: false, error: msg };
    }
  }

  /**
   * 🇧🇩 handleUpdate — শিক্ষার্থী আপডেট:
   *   ১. API call করে আপডেটেড ডেটা পাঠায়
   *   ২. সফল হলে তালিকায় পুরাতন ডেটা নতুন দিয়ে প্রতিস্থাপন করে
   *   ৩. editing state null করে (ফর্ম রিসেট)
   *
   *   ডিবাগিং:
   *     • আপডেট হচ্ছে না? → id সঠিক কি না চেক করুন
   *     • পুরাতন ডেটা দেখাচ্ছে? → state update ঠিকমতো হচ্ছে কি না দেখুন
   *       React-এ state immutable — prev.map() দিয়ে নতুন array তৈরি করতে হয়
   *
   * 🇬🇧 handleUpdate — Update student:
   *   1. Makes API call with updated data
   *   2. If successful, replaces old data with new in the list
   *   3. Sets editing state to null (resets form)
   *
   *   Debugging:
   *     • Not updating? → Check if the id is correct
   *     • Showing old data? → Check if state update is correct
   *       In React, state is immutable — use prev.map() to create a new array
   */
  async function handleUpdate(data) {
    try {
      setError(null);
      const res = await updateStudent(editing._id, data);
      console.log("✅ Updated:", res.data._id);
      setStudents((prev) =>
        prev.map((s) => (s._id === editing._id ? res.data : s))
      );
      setEditing(null);
      return { success: true };
    } catch (err) {
      const msg =
        err.response?.data?.messages?.join(", ") ||
        err.response?.data?.error ||
        "Update failed (আপডেট ব্যর্থ)";
      setError(msg);
      return { success: false, error: msg };
    }
  }

  /**
   * 🇧🇩 handleDelete — শিক্ষার্থী মুছে ফেলা:
   *   filter() দিয়ে মুছে ফেলা student বাদ দিয়ে নতুন array তৈরি করে।
   *
   * 🇬🇧 handleDelete — Delete student:
   *   Uses filter() to create a new array without the deleted student.
   */
  async function handleDelete(id) {
    if (!window.confirm("Are you sure? (আপনি কি নিশ্চিত?)")) return;

    try {
      setError(null);
      await deleteStudent(id);
      console.log("🗑️ Deleted:", id);
      setStudents((prev) => prev.filter((s) => s._id !== id));
      if (editing?._id === id) setEditing(null);
    } catch (err) {
      setError(
        err.response?.data?.error || "Delete failed (মুছে ফেলা ব্যর্থ)"
      );
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* ─── Header (হেডার) ─── */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-5xl px-4 py-6">
          <h1 className="text-3xl font-bold text-indigo-700">
            📚 MERN CRUD — Student Manager
          </h1>
          <p className="mt-1 text-gray-500">
            শিক্ষার্থী ম্যানেজার — Learning CRUD with Debugging Guide
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        {/* ─── Error Banner (ত্রুটি ব্যানার) ─── */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4">
            <p className="text-red-700 font-medium">
              ❌ {error}
            </p>
            <button
              onClick={() => setError(null)}
              className="mt-2 text-sm text-red-500 underline hover:text-red-700"
            >
              Dismiss (বন্ধ করুন)
            </button>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-5">
          {/* ─── Form Section (ফর্ম সেকশন) ─── */}
          <div className="lg:col-span-2">
            <StudentForm
              onSubmit={editing ? handleUpdate : handleCreate}
              editing={editing}
              onCancel={() => setEditing(null)}
            />
          </div>

          {/* ─── List Section (তালিকা সেকশন) ─── */}
          <div className="lg:col-span-3">
            <StudentList
              students={students}
              loading={loading}
              onEdit={setEditing}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </main>

      {/* ─── Footer (ফুটার) ─── */}
      <footer className="mt-12 border-t bg-white py-6 text-center text-sm text-gray-400">
        MERN CRUD Learning App — Built for learning &amp; debugging
        (শেখা ও ডিবাগিংয়ের জন্য তৈরি)
      </footer>
    </div>
  );
}
