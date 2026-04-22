import { Link } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/packages?search=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/60 via-primary-900/40 to-primary-900/80" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <p className="text-accent-300 font-medium tracking-widest uppercase text-sm mb-4 animate-fade-in">
          Discover Your Next Adventure
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-heading font-bold text-white leading-tight mb-6">
          Explore the World&apos;s <br />
          <span className="text-accent-400">Most Beautiful</span> Places
        </h1>
        <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
          Curated travel experiences to extraordinary destinations. Let us take you on the journey of a lifetime.
        </p>

        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-3 max-w-lg mx-auto mb-8">
          <div className="relative flex-grow w-full">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search destinations..."
              className="w-full pl-12 pr-4 py-3.5 rounded-full bg-white/95 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-400 shadow-lg"
            />
          </div>
          <button type="submit" className="btn-primary whitespace-nowrap w-full sm:w-auto">
            Search
          </button>
        </form>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/packages" className="btn-secondary">
            View All Packages
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto">
          <div className="text-center">
            <p className="text-3xl font-bold text-white">500+</p>
            <p className="text-white/60 text-sm mt-1">Happy Travelers</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white">50+</p>
            <p className="text-white/60 text-sm mt-1">Destinations</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white">4.9</p>
            <p className="text-white/60 text-sm mt-1">Average Rating</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-1">
          <div className="w-1.5 h-3 bg-white/70 rounded-full" />
        </div>
      </div>
    </section>
  );
}
