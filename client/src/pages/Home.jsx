import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineGlobeAlt,
  HiOutlineShieldCheck,
  HiOutlineCurrencyDollar,
  HiOutlineSupport,
} from "react-icons/hi";
import { MdFlightTakeoff } from "react-icons/md";
import api from "../api.js";
import PackageCard from "../components/PackageCard.jsx";
import TestimonialCard from "../components/TestimonialCard.jsx";
import Spinner from "../components/Spinner.jsx";

const stats = [
  { label: "Happy Travelers", value: "15,000+" },
  { label: "Destinations", value: "50+" },
  { label: "Tour Packages", value: "120+" },
  { label: "Years Experience", value: "15+" },
];

const features = [
  {
    icon: HiOutlineGlobeAlt,
    title: "Worldwide Destinations",
    desc: "Explore handpicked destinations across all seven continents with expert-curated itineraries.",
  },
  {
    icon: HiOutlineShieldCheck,
    title: "Safe & Secure",
    desc: "Travel with confidence. We ensure your safety with verified partners and 24/7 support.",
  },
  {
    icon: HiOutlineCurrencyDollar,
    title: "Best Price Guarantee",
    desc: "Get the most value for your money. We match any comparable price you find elsewhere.",
  },
  {
    icon: HiOutlineSupport,
    title: "24/7 Support",
    desc: "Our travel experts are available round the clock to assist you before, during, and after your trip.",
  },
];

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [pkgRes, revRes] = await Promise.all([
          api.get("/packages?featured=true&limit=4"),
          api.get("/reviews/featured"),
        ]);
        setFeatured(pkgRes.data);
        setReviews(revRes.data);
      } catch {
        /* silent */
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[600px] items-center overflow-hidden bg-slate-900">
        <img
          src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1600&h=900&fit=crop"
          alt="Travel hero"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-brand-400">
              <MdFlightTakeoff className="h-6 w-6" />
              <span className="text-sm font-semibold uppercase tracking-widest">
                Wanderlust Travels
              </span>
            </div>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
              Discover the World&apos;s Most{" "}
              <span className="text-brand-400">Amazing Places</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              From pristine beaches to majestic mountains, ancient temples to modern cities — we
              craft unforgettable journeys tailored just for you. Let your next adventure begin.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/packages" className="btn-primary px-8 py-3 text-base">
                Explore Packages
              </Link>
              <Link to="/contact" className="btn border-2 border-white text-white hover:bg-white/10 px-8 py-3 text-base">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative -mt-16 z-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 rounded-2xl bg-white p-6 shadow-xl sm:grid-cols-4 sm:p-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-bold text-brand-600 sm:text-3xl">{s.value}</p>
                <p className="mt-1 text-sm text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="section-title">Why Choose Wanderlust Travels?</h2>
          <p className="section-subtitle mx-auto">
            We go above and beyond to ensure every trip is a seamless, memorable experience.
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
                <f.icon className="h-7 w-7" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Packages */}
      <section className="bg-slate-100 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="section-title">Featured Travel Packages</h2>
              <p className="section-subtitle">Hand-picked journeys loved by thousands of travelers.</p>
            </div>
            <Link to="/packages" className="btn-outline">
              View All Packages
            </Link>
          </div>
          {loading ? (
            <Spinner />
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((pkg) => (
                <PackageCard key={pkg._id} pkg={pkg} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Popular Destinations Banner */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="section-title">Popular Destinations</h2>
          <p className="section-subtitle mx-auto">
            Explore our most sought-after destinations around the globe.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "Bali, Indonesia", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=400&fit=crop", pkgs: "3 Packages" },
            { name: "Santorini, Greece", img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&h=400&fit=crop", pkgs: "2 Packages" },
            { name: "Tokyo, Japan", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&h=400&fit=crop", pkgs: "2 Packages" },
            { name: "Swiss Alps", img: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&h=400&fit=crop", pkgs: "2 Packages" },
            { name: "Serengeti, Tanzania", img: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&h=400&fit=crop", pkgs: "1 Package" },
            { name: "Maldives", img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&h=400&fit=crop", pkgs: "2 Packages" },
          ].map((d) => (
            <Link
              key={d.name}
              to="/packages"
              className="group relative overflow-hidden rounded-2xl"
            >
              <img
                src={d.img}
                alt={d.name}
                className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-bold">{d.name}</h3>
                <p className="text-sm text-slate-200">{d.pkgs}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      {reviews.length > 0 && (
        <section className="bg-brand-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="section-title">What Our Travelers Say</h2>
              <p className="section-subtitle mx-auto">
                Real stories from real travelers who explored the world with us.
              </p>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.slice(0, 6).map((r) => (
                <TestimonialCard key={r._id} review={r} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative overflow-hidden bg-brand-700 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to Start Your Adventure?
          </h2>
          <p className="mt-4 text-lg text-brand-100">
            Join thousands of happy travelers. Book your dream vacation today and create memories
            that last a lifetime.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/packages" className="btn bg-white text-brand-700 hover:bg-slate-50 px-8 py-3 text-base font-bold">
              Browse Packages
            </Link>
            <Link to="/contact" className="btn border-2 border-white text-white hover:bg-white/10 px-8 py-3 text-base">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
