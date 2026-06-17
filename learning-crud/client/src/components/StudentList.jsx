/**
 * ============================================================
 *  StudentList Component (শিক্ষার্থী তালিকা কম্পোনেন্ট)
 * ============================================================
 *
 * 🇧🇩 বাংলা:
 *   এই কম্পোনেন্ট সব শিক্ষার্থীর তালিকা দেখায়।
 *   প্রতিটি শিক্ষার্থীর জন্য Edit ও Delete বোতাম আছে।
 *
 *   .map() কী?
 *     Array-এর প্রতিটি item-এর জন্য একটি করে element তৈরি করে।
 *     React-এ তালিকা রেন্ডার করতে map() ব্যবহার করা হয়।
 *
 *   key prop কেন দরকার?
 *     React-কে বলে দেয় কোন item পরিবর্তন হয়েছে।
 *     key ছাড়া React পুরো তালিকা রি-রেন্ডার করে (ধীর হয়ে যায়)।
 *     key হিসেবে _id ব্যবহার করুন (index ব্যবহার করবেন না!)
 *
 *   ডিবাগিং:
 *     • "Each child should have a unique key" — key prop মিসিং
 *     • তালিকা খালি — ডেটা লোড হয়নি বা API ত্রুটি
 *     • Delete/Edit কাজ করছে না — props সঠিকভাবে pass হয়েছে কি না চেক করুন
 *
 * 🇬🇧 English:
 *   This component displays a list of all students.
 *   Each student has Edit and Delete buttons.
 *
 *   What is .map()?
 *     Creates one element for each item in the array.
 *     In React, map() is used to render lists.
 *
 *   Why is the key prop needed?
 *     Tells React which items have changed.
 *     Without key, React re-renders the entire list (slower).
 *     Use _id as key (never use array index!)
 *
 *   Debugging:
 *     • "Each child should have a unique key" — key prop is missing
 *     • Empty list — data not loaded or API error
 *     • Delete/Edit not working — check if props are passed correctly
 */

/**
 * 🇧🇩 Grade অনুযায়ী রং নির্ধারণ / 🇬🇧 Color mapping by grade
 */
const gradeColors = {
  "A+": "bg-green-100 text-green-800",
  A: "bg-green-100 text-green-700",
  "A-": "bg-emerald-100 text-emerald-700",
  "B+": "bg-blue-100 text-blue-700",
  B: "bg-blue-100 text-blue-600",
  "B-": "bg-sky-100 text-sky-700",
  "C+": "bg-yellow-100 text-yellow-700",
  C: "bg-yellow-100 text-yellow-600",
  D: "bg-orange-100 text-orange-700",
  F: "bg-red-100 text-red-700",
};

export default function StudentList({ students, loading, onEdit, onDelete }) {
  if (loading) {
    return (
      <div className="rounded-xl bg-white p-8 text-center shadow-md">
        <p className="text-gray-500 text-lg">
          Loading... (লোড হচ্ছে...)
        </p>
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="rounded-xl bg-white p-8 text-center shadow-md">
        <p className="text-gray-500 text-lg">
          No students yet (কোনো শিক্ষার্থী নেই)
        </p>
        <p className="mt-2 text-gray-400 text-sm">
          Add your first student using the form (ফর্ম ব্যবহার করে প্রথম
          শিক্ষার্থী যোগ করুন)
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">
        📋 Students ({students.length}) — শিক্ষার্থী তালিকা
      </h2>

      {students.map((student) => (
        <div
          key={student._id}
          className="rounded-xl bg-white p-5 shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-gray-800">
                {student.name}
              </h3>
              <p className="text-sm text-gray-500">{student.email}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">
                  Age (বয়স): {student.age}
                </span>
                <span className="inline-block rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
                  {student.subject}
                </span>
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${gradeColors[student.grade] || "bg-gray-100 text-gray-700"}`}
                >
                  Grade: {student.grade}
                </span>
              </div>
            </div>

            {/* ─── Action Buttons (অ্যাকশন বোতাম) ─── */}
            <div className="flex gap-2 ml-4">
              <button
                onClick={() => onEdit(student)}
                className="rounded-lg bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-700 hover:bg-amber-100"
              >
                Edit (এডিট)
              </button>
              <button
                onClick={() => onDelete(student._id)}
                className="rounded-lg bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-100"
              >
                Delete (মুছুন)
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
