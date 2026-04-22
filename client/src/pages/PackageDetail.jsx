import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  HiOutlineClock,
  HiOutlineUserGroup,
  HiOutlineCalendar,
  HiOutlineCheck,
  HiOutlineX,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import api from "../api.js";
import StarRating from "../components/StarRating.jsx";
import TestimonialCard from "../components/TestimonialCard.jsx";
import Spinner from "../components/Spinner.jsx";

export default function PackageDetail() {
  const { slug } = useParams();
  const [pkg, setPkg] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  // Booking form state
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    travelers: 1,
    travelDate: "",
    specialRequests: "",
  });
  const [booking, setBooking] = useState(null);
  const [bookError, setBookError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get(`/packages/${slug}`);
        setPkg(res.data);
        const revRes = await api.get(`/reviews/package/${res.data._id}`);
        setReviews(revRes.data);
      } catch {
        setPkg(null);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  async function handleBooking(e) {
    e.preventDefault();
    setBookError("");
    setSubmitting(true);
    try {
      const res = await api.post("/bookings", {
        packageId: pkg._id,
        ...form,
        travelers: Number(form.travelers),
      });
      setBooking(res.data);
    } catch (err) {
      setBookError(err.response?.data?.errors?.[0]?.msg || err.response?.data?.error || "Booking failed");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <Spinner />;
  if (!pkg) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-900">Package Not Found</h2>
        <Link to="/packages" className="btn-primary mt-4 inline-block">
          Browse All Packages
        </Link>
      </div>
    );
  }

  const effectivePrice = pkg.discountPrice || pkg.price;

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "itinerary", label: "Itinerary" },
    { id: "reviews", label: `Reviews (${pkg.reviewCount})` },
    { id: "booking", label: "Book Now" },
  ];

  return (
    <>
      {/* Hero Banner */}
      <section className="relative h-[400px] overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-2 text-brand-300">
              <HiOutlineLocationMarker className="h-5 w-5" />
              <span className="text-sm font-medium">
                {pkg.destination}, {pkg.country} &middot; {pkg.continent}
              </span>
            </div>
            <h1 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
              {pkg.title}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-200">
              <span className="flex items-center gap-1">
                <HiOutlineClock className="h-4 w-4" /> {pkg.duration} Days
              </span>
              <span className="flex items-center gap-1">
                <HiOutlineUserGroup className="h-4 w-4" /> Max {pkg.groupSize}
              </span>
              <span className="flex items-center gap-1">
                <StarRating rating={pkg.rating} size="h-4 w-4" />
                <span className="ml-1">{pkg.rating} ({pkg.reviewCount} reviews)</span>
              </span>
              <span className="rounded-full bg-white/20 px-3 py-0.5 text-xs font-semibold capitalize backdrop-blur">
                {pkg.category}
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex gap-1 overflow-x-auto rounded-xl bg-slate-100 p-1">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`flex-1 whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                    activeTab === t.id
                      ? "bg-white text-brand-600 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="mt-6">
              {activeTab === "overview" && (
                <div>
                  <p className="text-base leading-relaxed text-slate-700">{pkg.description}</p>

                  {pkg.highlights?.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-lg font-bold text-slate-900">Highlights</h3>
                      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                        {pkg.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                            <HiOutlineCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-500" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mt-8 grid gap-6 sm:grid-cols-2">
                    {pkg.included?.length > 0 && (
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">What&apos;s Included</h3>
                        <ul className="mt-3 space-y-2">
                          {pkg.included.map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                              <HiOutlineCheck className="h-4 w-4 text-green-500" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {pkg.excluded?.length > 0 && (
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">Not Included</h3>
                        <ul className="mt-3 space-y-2">
                          {pkg.excluded.map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                              <HiOutlineX className="h-4 w-4 text-rose-500" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Gallery */}
                  {pkg.gallery?.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-lg font-bold text-slate-900">Gallery</h3>
                      <div className="mt-3 grid gap-3 sm:grid-cols-3">
                        {pkg.gallery.map((img, i) => (
                          <img
                            key={i}
                            src={img}
                            alt={`${pkg.title} gallery ${i + 1}`}
                            className="h-48 w-full rounded-xl object-cover"
                            loading="lazy"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "itinerary" && (
                <div className="space-y-4">
                  {pkg.itinerary?.map((day) => (
                    <div
                      key={day.day}
                      className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5"
                    >
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                        Day {day.day}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">{day.title}</h4>
                        <p className="mt-1 text-sm text-slate-600">{day.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "reviews" && (
                <div>
                  {reviews.length === 0 ? (
                    <p className="text-center text-slate-500 py-8">No reviews yet for this package.</p>
                  ) : (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {reviews.map((r) => (
                        <TestimonialCard key={r._id} review={r} />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "booking" && (
                <div>
                  {booking ? (
                    <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                        <HiOutlineCheck className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="mt-4 text-xl font-bold text-green-800">
                        Booking Confirmed!
                      </h3>
                      <p className="mt-2 text-green-700">
                        Thank you, {booking.fullName}! Your booking for {pkg.title} has been received.
                      </p>
                      <p className="mt-1 text-sm text-green-600">
                        Booking ID: {booking._id}
                      </p>
                      <p className="mt-1 text-sm text-green-600">
                        Total: ${booking.totalPrice.toLocaleString()} for {booking.travelers} traveler{booking.travelers > 1 ? "s" : ""}
                      </p>
                      <p className="mt-4 text-sm text-green-600">
                        A confirmation email will be sent to {booking.email}.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleBooking} className="space-y-4">
                      {bookError && (
                        <div className="rounded-lg bg-rose-50 p-3 text-sm text-rose-600">
                          {bookError}
                        </div>
                      )}
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="label">Full Name *</label>
                          <input
                            type="text"
                            required
                            className="input"
                            value={form.fullName}
                            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="label">Email *</label>
                          <input
                            type="email"
                            required
                            className="input"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="label">Phone *</label>
                          <input
                            type="tel"
                            required
                            className="input"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="label">Number of Travelers *</label>
                          <input
                            type="number"
                            min="1"
                            max={pkg.groupSize}
                            required
                            className="input"
                            value={form.travelers}
                            onChange={(e) => setForm({ ...form, travelers: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="label">Travel Date *</label>
                          <input
                            type="date"
                            required
                            className="input"
                            value={form.travelDate}
                            onChange={(e) => setForm({ ...form, travelDate: e.target.value })}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="label">Special Requests</label>
                        <textarea
                          rows={3}
                          className="input"
                          value={form.specialRequests}
                          onChange={(e) => setForm({ ...form, specialRequests: e.target.value })}
                          placeholder="Any dietary requirements, accessibility needs, or special occasions..."
                        />
                      </div>
                      <div className="rounded-xl bg-slate-50 p-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Price per person</span>
                          <span className="font-medium">${effectivePrice.toLocaleString()}</span>
                        </div>
                        <div className="mt-1 flex justify-between text-sm">
                          <span className="text-slate-600">Travelers</span>
                          <span className="font-medium">{form.travelers || 1}</span>
                        </div>
                        <div className="mt-2 flex justify-between border-t border-slate-200 pt-2">
                          <span className="font-semibold text-slate-900">Total</span>
                          <span className="text-xl font-bold text-brand-600">
                            ${(effectivePrice * (Number(form.travelers) || 1)).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <button type="submit" disabled={submitting} className="btn-primary w-full py-3 text-base">
                        {submitting ? "Processing..." : "Confirm Booking"}
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-center">
                {pkg.discountPrice ? (
                  <>
                    <span className="text-lg text-slate-400 line-through">${pkg.price}</span>
                    <p className="text-3xl font-bold text-brand-600">${pkg.discountPrice}</p>
                  </>
                ) : (
                  <p className="text-3xl font-bold text-brand-600">${pkg.price}</p>
                )}
                <p className="text-sm text-slate-500">per person</p>
              </div>

              <div className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="flex items-center gap-2 text-slate-600">
                    <HiOutlineClock className="h-4 w-4" /> Duration
                  </span>
                  <span className="font-medium">{pkg.duration} Days</span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center gap-2 text-slate-600">
                    <HiOutlineUserGroup className="h-4 w-4" /> Group Size
                  </span>
                  <span className="font-medium">Max {pkg.groupSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center gap-2 text-slate-600">
                    <HiOutlineCalendar className="h-4 w-4" /> Next Date
                  </span>
                  <span className="font-medium">
                    {pkg.startDates?.[0]
                      ? new Date(pkg.startDates[0]).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "Contact us"}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setActiveTab("booking")}
                className="btn-primary mt-6 w-full py-3 text-base"
              >
                Book This Package
              </button>
              <Link to="/contact" className="btn-outline mt-3 w-full">
                Ask a Question
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
