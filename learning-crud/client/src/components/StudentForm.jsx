/**
 * ============================================================
 *  StudentForm Component (শিক্ষার্থী ফর্ম কম্পোনেন্ট)
 * ============================================================
 *
 * 🇧🇩 বাংলা:
 *   এই কম্পোনেন্ট দিয়ে নতুন শিক্ষার্থী তৈরি এবং বিদ্যমান শিক্ষার্থী আপডেট করা যায়।
 *
 *   Props কী?
 *     Props হলো parent component থেকে child component-এ পাঠানো ডেটা।
 *     এখানে আমরা পাই:
 *       onSubmit → ফর্ম জমা দেওয়ার ফাংশন
 *       editing  → যে student এডিট হচ্ছে (null হলে নতুন তৈরি)
 *       onCancel → এডিট বাতিল করার ফাংশন
 *
 *   Controlled Components কী?
 *     React-এ form input-এর মান (value) state-এ রাখা হয়।
 *     value={form.name} এবং onChange দিয়ে state আপডেট হয়।
 *     এটিকে "Controlled Component" বলে।
 *
 *   ডিবাগিং:
 *     • ফর্ম জমা হচ্ছে না → onSubmit ফাংশন সঠিকভাবে pass হয়েছে কি না চেক করুন
 *     • input-এ টাইপ করা যাচ্ছে না → onChange handler মিসিং
 *     • ফর্ম রিসেট হচ্ছে না → submit-এর পরে state reset চেক করুন
 *     • edit mode-এ পুরাতন ডেটা আসছে না → useEffect dependency চেক করুন
 *
 * 🇬🇧 English:
 *   This component creates new students and updates existing ones.
 *
 *   What are Props?
 *     Props are data passed from parent to child component.
 *     Here we receive:
 *       onSubmit → function to handle form submission
 *       editing  → student being edited (null means creating new)
 *       onCancel → function to cancel editing
 *
 *   What are Controlled Components?
 *     In React, form input values are kept in state.
 *     value={form.name} and onChange update the state.
 *     This is called a "Controlled Component".
 *
 *   Debugging:
 *     • Form not submitting → check if onSubmit function is passed correctly
 *     • Can't type in input → onChange handler is missing
 *     • Form not resetting → check state reset after submit
 *     • Old data not showing in edit mode → check useEffect dependencies
 */
import { useState, useEffect } from "react";

const EMPTY_FORM = { name: "", email: "", age: "", subject: "", grade: "C" };
const GRADES = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F"];

export default function StudentForm({ onSubmit, editing, onCancel }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);

  /**
   * 🇧🇩 useEffect — editing পরিবর্তন হলে ফর্ম আপডেট:
   *   editing null হলে → ফর্ম খালি করো (নতুন তৈরির জন্য)
   *   editing আছে হলে → সেই student-এর ডেটা দিয়ে ফর্ম পূরণ করো
   *
   *   dependency: [editing] → শুধু editing পরিবর্তন হলেই চলবে
   *
   * 🇬🇧 useEffect — Update form when editing changes:
   *   If editing is null → clear form (for creating new)
   *   If editing exists → fill form with that student's data
   *
   *   dependency: [editing] → runs only when editing changes
   */
  useEffect(() => {
    if (editing) {
      setForm({
        name: editing.name || "",
        email: editing.email || "",
        age: editing.age?.toString() || "",
        subject: editing.subject || "",
        grade: editing.grade || "C",
      });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [editing]);

  /**
   * 🇧🇩 handleChange — input পরিবর্তনের হ্যান্ডলার:
   *   e.target.name → কোন input পরিবর্তন হয়েছে
   *   e.target.value → নতুন মান কী
   *   ...prev → আগের সব মান রাখো, শুধু পরিবর্তিতটি আপডেট করো (spread operator)
   *
   * 🇬🇧 handleChange — input change handler:
   *   e.target.name → which input changed
   *   e.target.value → what's the new value
   *   ...prev → keep all previous values, only update the changed one (spread operator)
   */
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  /**
   * 🇧🇩 handleSubmit — ফর্ম জমা দেওয়ার হ্যান্ডলার:
   *   e.preventDefault() → পেজ রিলোড বন্ধ করে (HTML ফর্মের ডিফল্ট আচরণ)
   *
   *   ডিবাগিং:
   *     • পেজ রিলোড হচ্ছে? → e.preventDefault() আছে কি না চেক করুন
   *     • age Number হচ্ছে না? → Number() দিয়ে রূপান্তর করতে হবে
   *       (HTML input সবসময় string দেয়)
   *
   * 🇬🇧 handleSubmit — form submission handler:
   *   e.preventDefault() → prevents page reload (default HTML form behavior)
   *
   *   Debugging:
   *     • Page reloading? → check if e.preventDefault() is present
   *     • age not a Number? → convert with Number()
   *       (HTML inputs always return strings)
   */
  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      age: Number(form.age),
      subject: form.subject.trim(),
      grade: form.grade,
    };

    console.log("📤 Form submit (ফর্ম জমা):", payload);

    const result = await onSubmit(payload);

    if (result?.success) {
      setForm(EMPTY_FORM);
    }

    setSubmitting(false);
  }

  const isEditing = editing !== null;

  return (
    <div className="rounded-xl bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold text-gray-800">
        {isEditing
          ? "✏️ Edit Student (শিক্ষার্থী এডিট)"
          : "➕ Add Student (নতুন শিক্ষার্থী)"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ─── Name (নাম) ─── */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name (নাম) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Enter name (নাম লিখুন)"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        {/* ─── Email (ইমেইল) ─── */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email (ইমেইল) <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="example@mail.com"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        {/* ─── Age (বয়স) ─── */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Age (বয়স) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            required
            min="5"
            max="100"
            placeholder="18"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        {/* ─── Subject (বিষয়) ─── */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subject (বিষয়) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            required
            placeholder="Mathematics (গণিত)"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        {/* ─── Grade (গ্রেড) ─── */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Grade (গ্রেড)
          </label>
          <select
            name="grade"
            value={form.grade}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          >
            {GRADES.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        {/* ─── Buttons (বোতাম) ─── */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            {submitting
              ? "Saving... (সংরক্ষণ হচ্ছে...)"
              : isEditing
                ? "Update (আপডেট)"
                : "Create (তৈরি করুন)"}
          </button>

          {isEditing && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel (বাতিল)
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
