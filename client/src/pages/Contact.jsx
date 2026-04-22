import { useState } from "react";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineClock,
  HiOutlineCheck,
} from "react-icons/hi";
import api from "../api.js";

const contactInfo = [
  { icon: HiOutlineLocationMarker, label: "Address", value: "123 Travel Street, Suite 100\nNew York, NY 10001" },
  { icon: HiOutlinePhone, label: "Phone", value: "+1 (555) 123-4567" },
  { icon: HiOutlineMail, label: "Email", value: "hello@wanderlusttravels.com" },
  { icon: HiOutlineClock, label: "Working Hours", value: "Mon–Fri: 9AM–6PM EST\nSat: 10AM–4PM EST" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await api.post("/contact", form);
      setSent(true);
    } catch (err) {
      setError(err.response?.data?.errors?.[0]?.msg || "Failed to send message");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {/* Header */}
      <section className="relative bg-slate-900 py-20">
        <img
          src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1600&h=400&fit=crop"
          alt="Contact hero"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">Contact Us</h1>
          <p className="mt-4 text-lg text-slate-300">
            Have a question or ready to plan your trip? We&apos;d love to hear from you!
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-slate-900">Get in Touch</h2>
            <p className="mt-3 text-slate-600">
              Whether you have a question about our packages, need help planning a custom trip, or
              just want to say hello — our team is here to help.
            </p>
            <div className="mt-8 space-y-6">
              {contactInfo.map((c) => (
                <div key={c.label} className="flex gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
                    <c.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{c.label}</p>
                    <p className="mt-0.5 whitespace-pre-line text-sm text-slate-600">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              {sent ? (
                <div className="py-8 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <HiOutlineCheck className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-green-800">Message Sent!</h3>
                  <p className="mt-2 text-green-700">
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                  <button
                    className="btn-primary mt-6"
                    onClick={() => {
                      setSent(false);
                      setForm({ name: "", email: "", subject: "", message: "" });
                    }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-xl font-bold text-slate-900">Send Us a Message</h3>
                  {error && (
                    <div className="rounded-lg bg-rose-50 p-3 text-sm text-rose-600">{error}</div>
                  )}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="label">Your Name *</label>
                      <input
                        type="text"
                        required
                        className="input"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="label">Email Address *</label>
                      <input
                        type="email"
                        required
                        className="input"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="label">Subject *</label>
                    <input
                      type="text"
                      required
                      className="input"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder="Inquiry about Bali package"
                    />
                  </div>
                  <div>
                    <label className="label">Message *</label>
                    <textarea
                      rows={5}
                      required
                      className="input"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us about your travel plans or questions..."
                    />
                  </div>
                  <button type="submit" disabled={submitting} className="btn-primary w-full py-3 text-base">
                    {submitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="bg-slate-100">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl bg-slate-300">
            <iframe
              title="Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1!2d-73.9857!3d40.7484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ0JzU0LjIiTiA3M8KwNTknMDguNSJX!5e0!3m2!1sen!2sus!4v1"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
