import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FiClock, FiStar, FiMapPin, FiUsers, FiCheck, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const API = import.meta.env.VITE_API_URL || '';

export default function PackageDetails() {
  const { slug } = useParams();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeDay, setActiveDay] = useState(null);
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    axios.get(`${API}/api/packages/${slug}`)
      .then((res) => {
        setPkg(res.data);
        setMainImage(res.data.image);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

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

  const discount = pkg.originalPrice
    ? Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)
    : 0;

  return (
    <div className="pt-20">
      {/* Hero Image */}
      <section className="relative h-[50vh] md:h-[60vh]">
        <img src={mainImage} alt={pkg.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-8 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-full capitalize mb-3 inline-block">
            {pkg.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-2">{pkg.title}</h1>
          <div className="flex items-center gap-4 text-white/80 text-sm">
            <span className="flex items-center gap-1"><FiMapPin /> {pkg.destination}, {pkg.country}</span>
            <span className="flex items-center gap-1"><FiClock /> {pkg.duration}</span>
            <span className="flex items-center gap-1"><FiStar className="text-yellow-400 fill-yellow-400" /> {pkg.rating} ({pkg.reviewCount} reviews)</span>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {pkg.gallery && pkg.gallery.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-3 overflow-x-auto pb-2">
            <button onClick={() => setMainImage(pkg.image)} className={`flex-shrink-0 rounded-lg overflow-hidden border-2 ${mainImage === pkg.image ? 'border-accent-500' : 'border-transparent'}`}>
              <img src={pkg.image} alt="Main" className="w-20 h-16 object-cover" />
            </button>
            {pkg.gallery.map((img, i) => (
              <button key={i} onClick={() => setMainImage(img)} className={`flex-shrink-0 rounded-lg overflow-hidden border-2 ${mainImage === img ? 'border-accent-500' : 'border-transparent'}`}>
                <img src={img} alt={`Gallery ${i + 1}`} className="w-20 h-16 object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Description */}
            <div>
              <h2 className="section-title text-2xl mb-4">Overview</h2>
              <p className="text-gray-600 leading-relaxed">{pkg.description}</p>
            </div>

            {/* Highlights */}
            {pkg.highlights && pkg.highlights.length > 0 && (
              <div>
                <h2 className="section-title text-2xl mb-4">Highlights</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {pkg.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <FiCheck className="text-accent-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Itinerary */}
            {pkg.itinerary && pkg.itinerary.length > 0 && (
              <div>
                <h2 className="section-title text-2xl mb-4">Day-by-Day Itinerary</h2>
                <div className="space-y-3">
                  {pkg.itinerary.map((day) => (
                    <div key={day.day} className="border border-gray-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setActiveDay(activeDay === day.day ? null : day.day)}
                        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium text-primary-900">
                          <span className="text-accent-500 font-bold mr-2">Day {day.day}</span>
                          {day.title}
                        </span>
                        {activeDay === day.day ? <FiChevronUp /> : <FiChevronDown />}
                      </button>
                      {activeDay === day.day && (
                        <div className="px-4 pb-4 text-gray-600 text-sm border-t border-gray-100 pt-3">
                          {day.description}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Included / Excluded */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {pkg.included && pkg.included.length > 0 && (
                <div>
                  <h3 className="font-heading font-semibold text-lg text-primary-900 mb-3">What&apos;s Included</h3>
                  <ul className="space-y-2">
                    {pkg.included.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <FiCheck className="text-green-500 mt-0.5 flex-shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {pkg.excluded && pkg.excluded.length > 0 && (
                <div>
                  <h3 className="font-heading font-semibold text-lg text-primary-900 mb-3">Not Included</h3>
                  <ul className="space-y-2">
                    {pkg.excluded.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <FiX className="text-red-400 mt-0.5 flex-shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Booking Card */}
          <div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg sticky top-24">
              <div className="mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-primary-900">${pkg.price}</span>
                  {pkg.originalPrice && (
                    <span className="text-lg text-gray-400 line-through">${pkg.originalPrice}</span>
                  )}
                  <span className="text-gray-500">/person</span>
                </div>
                {discount > 0 && (
                  <span className="text-accent-500 text-sm font-semibold">Save {discount}%</span>
                )}
              </div>

              <div className="space-y-3 mb-6 text-sm text-gray-600">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="flex items-center gap-2"><FiClock /> Duration</span>
                  <span className="font-medium text-primary-900">{pkg.duration}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="flex items-center gap-2"><FiUsers /> Group Size</span>
                  <span className="font-medium text-primary-900">Max {pkg.maxGroupSize}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span>Difficulty</span>
                  <span className="font-medium text-primary-900 capitalize">{pkg.difficulty}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="flex items-center gap-2"><FiStar className="text-yellow-500" /> Rating</span>
                  <span className="font-medium text-primary-900">{pkg.rating} ({pkg.reviewCount})</span>
                </div>
              </div>

              <Link
                to={`/booking/${pkg.slug}`}
                className="btn-primary w-full block text-center"
              >
                Book This Package
              </Link>
              <p className="text-center text-xs text-gray-400 mt-3">No payment required to reserve</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
