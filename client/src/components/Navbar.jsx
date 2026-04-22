import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiMapPin } from 'react-icons/fi';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/packages', label: 'Packages' },
  { path: '/destinations', label: 'Destinations' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isHome ? 'bg-transparent' : 'bg-primary-900 shadow-lg'}`}
      style={{ backdropFilter: 'blur(8px)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2 text-white">
            <FiMapPin className="text-accent-400 text-2xl" />
            <span className="text-xl md:text-2xl font-heading font-bold">Wanderlust</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  location.pathname === link.path
                    ? 'text-accent-400'
                    : 'text-white/90 hover:text-accent-300'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/packages" className="btn-primary text-sm py-2 px-6">
              Book Now
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white text-2xl"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-primary-900/95 backdrop-blur-lg border-t border-white/10">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block py-2 text-sm font-medium ${
                  location.pathname === link.path
                    ? 'text-accent-400'
                    : 'text-white/90'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/packages"
              onClick={() => setIsOpen(false)}
              className="block btn-primary text-sm py-2 px-6 text-center mt-3"
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
