import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FiCheck, FiMapPin, FiClock, FiUsers } from 'react-icons/fi';

const API = import.meta.env.VITE_API_URL || '';

export default function Booking() {
  const { slug } = useParams();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    travelDate: '',
    guests: 1,
    specialRequests: '',
  });

  useEffect(() => {
    axios.get(`${API}/api/packages/${slug}`)
      .then((res) => setPkg(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'guests' ? parseInt(value, 10) || 1 : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await axios.post(`${API}/api/bookings`, {
        packageId: pkg._id,
        ...form,
      });
      setSuccess(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-500" />
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="pt-20 min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-heading font-bold text-gray-800 mb-4">Package Not Found</h2>
        <Link to="/packages" className="btn-primary">Browse Packages</Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-2xl shadow-lg p-10 max-w-lg w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheck className="text-green-500 text-4xl" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-primary-900 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-6">{success.message}</p>
          <div className="bg-gray-50 rounded-xl p-5 text-left space-y-2 text-sm mb-6">
            <p><span className="font-medium text-gray-700">Booking Ref:</span> <span className="text-accent-500 font-bold">{success.booking.bookingRef}</span></p>
            <p><span className="font-medium text-gray-700">Package:</span> {success.booking.packageTitle}</p>
            <p><span className="font-medium text-gray-700">Travel Date:</span> {new Date(success.booking.travelDate).toLocaleDateString()}</p>
            <p><span className="font-medium text-gray-700">Guests:</span> {success.booking.guests}</p>
            <p><span className="font-medium text-gray-700">Total Price:</span> <span className="font-bold text-primary-900">${success.booking.totalPrice}</span></p>
            <p><span className="font-medium text-gray-700">Status:</span> <span className="capitalize text-green-600 font-medium">{success.booking.status}</span></p>
          </div>
          <p className="text-gray-500 text-xs mb-6">A confirmation email will be sent to your email address. Please save your booking reference.</p>
          <Link to="/packages" className="btn-primary inline-block">Browse More Packages</Link>
        </div>
      </div>
    );
  }

  const totalPrice = pkg.price * form.guests;

  return (
    <div className="pt-20 bg-gray-50 min-h-screen">
      <section className="bg-primary-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">Book Your Trip</h1>
          <p className="text-white/70">Complete the form below to reserve your spot</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-8 space-y-6">
              <h2 className="font-heading text-xl font-semibold text-primary-900">Traveler Information</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                  <input type="text" name="firstName" value={form.firstName} onChange={handleChange} required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-400 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                  <input type="text" name="lastName" value={form.lastName} onChange={handleChange} required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-400 text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-400 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-400 text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Travel Date *</label>
                  <input type="date" name="travelDate" value={form.travelDate} onChange={handleChange} required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-400 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests *</label>
                  <select name="guests" value={form.guests} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-400 text-sm bg-white">
                    {Array.from({ length: pkg.maxGroupSize }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
                <textarea name="specialRequests" value={form.specialRequests} onChange={handleChange} rows={4}
                  placeholder="Any dietary requirements, accessibility needs, or special occasions?"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-400 text-sm resize-none" />
              </div>

              {error && (
                <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">{error}</p>
              )}

              <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-50">
                {submitting ? 'Processing...' : `Confirm Booking - $${totalPrice}`}
              </button>
            </form>
          </div>

          {/* Package Summary Sidebar */}
          <div>
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <img src={pkg.image} alt={pkg.title} className="w-full h-40 object-cover rounded-xl mb-4" />
              <h3 className="font-heading font-semibold text-lg text-primary-900 mb-2">{pkg.title}</h3>
              <div className="space-y-2 text-sm text-gray-600 mb-5">
                <p className="flex items-center gap-2"><FiMapPin className="text-accent-500" /> {pkg.destination}, {pkg.country}</p>
                <p className="flex items-center gap-2"><FiClock className="text-accent-500" /> {pkg.duration}</p>
                <p className="flex items-center gap-2"><FiUsers className="text-accent-500" /> Max {pkg.maxGroupSize} people</p>
              </div>
              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Price per person</span>
                  <span className="font-medium">${pkg.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Guests</span>
                  <span className="font-medium">{form.guests}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-primary-900 pt-2 border-t border-gray-100">
                  <span>Total</span>
                  <span>${totalPrice}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
