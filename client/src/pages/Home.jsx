import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Hero from '../components/Hero';
import PackageCard from '../components/PackageCard';
import TestimonialCard from '../components/TestimonialCard';
import { FiGlobe, FiShield, FiHeart, FiHeadphones, FiArrowRight } from 'react-icons/fi';

const API = import.meta.env.VITE_API_URL || '';

const testimonials = [
  {
    name: 'Sarah Mitchell',
    location: 'New York, USA',
    text: 'The Bali trip was absolutely magical! Every detail was perfectly planned, from the temple visits to the cooking class. Wanderlust made our honeymoon unforgettable.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
  },
  {
    name: 'James Anderson',
    location: 'London, UK',
    text: 'Our Swiss Alps adventure exceeded all expectations. The paragliding over Interlaken was a once-in-a-lifetime experience. Highly recommend Wanderlust!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
  },
  {
    name: 'Priya Sharma',
    location: 'Mumbai, India',
    text: 'The African Safari was breathtaking. Seeing the Big Five up close and the Maasai village visit were highlights we will cherish forever. Thank you, Wanderlust!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
  },
];

const features = [
  { icon: FiGlobe, title: 'Handpicked Destinations', desc: 'Curated travel experiences to the world\'s most extraordinary places.' },
  { icon: FiShield, title: 'Safe & Secure', desc: 'Your safety is our priority with 24/7 support and trusted local partners.' },
  { icon: FiHeart, title: 'Tailored Experiences', desc: 'Every trip is customized to match your interests and travel style.' },
  { icon: FiHeadphones, title: '24/7 Support', desc: 'Our travel experts are always available to assist you on your journey.' },
];

const destinations = [
  { name: 'Asia', image: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=600', count: '15+ Packages' },
  { name: 'Europe', image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600', count: '12+ Packages' },
  { name: 'Africa', image: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=600', count: '8+ Packages' },
  { name: 'South America', image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=600', count: '6+ Packages' },
];

export default function Home() {
  const [featuredPkgs, setFeaturedPkgs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/api/packages?featured=true&limit=4`)
      .then((res) => setFeaturedPkgs(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Hero />

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-title">Why Choose Wanderlust?</h2>
            <p className="section-subtitle">We go above and beyond to make your travel dreams a reality</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <f.icon className="text-accent-500 text-2xl" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-primary-900 mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
            <div>
              <h2 className="section-title">Featured Travel Packages</h2>
              <p className="section-subtitle text-left mt-2">Our most popular and highly-rated travel experiences</p>
            </div>
            <Link to="/packages" className="flex items-center gap-2 text-accent-500 hover:text-accent-600 font-medium mt-4 md:mt-0">
              View All Packages <FiArrowRight />
            </Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-gray-100 rounded-2xl h-96 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredPkgs.map((pkg) => (
                <PackageCard key={pkg._id} pkg={pkg} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20 bg-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white font-heading">Popular Destinations</h2>
            <p className="text-white/70 mt-3 text-lg">Explore our most sought-after travel regions</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((d) => (
              <Link
                key={d.name}
                to={`/packages?continent=${encodeURIComponent(d.name)}`}
                className="group relative rounded-2xl overflow-hidden h-72"
              >
                <img src={d.image} alt={d.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-white font-heading font-bold text-xl">{d.name}</h3>
                  <p className="text-white/70 text-sm mt-1">{d.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-title">What Our Travelers Say</h2>
            <p className="section-subtitle">Real experiences from real adventurers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-accent-500">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            Ready for Your Next Adventure?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Subscribe to our newsletter and get exclusive deals, travel tips, and destination guides.
          </p>
          <form className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow w-full py-3.5 px-5 rounded-full focus:outline-none focus:ring-2 focus:ring-white shadow-lg"
            />
            <button type="submit" className="bg-primary-900 hover:bg-primary-800 text-white font-semibold py-3.5 px-8 rounded-full transition-colors shadow-lg whitespace-nowrap w-full sm:w-auto">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
