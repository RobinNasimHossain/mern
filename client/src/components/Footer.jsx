import { Link } from 'react-router-dom';
import { FiMapPin, FiPhone, FiMail, FiInstagram, FiFacebook, FiTwitter, FiYoutube } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FiMapPin className="text-accent-400 text-2xl" />
              <span className="text-xl font-heading font-bold">Wanderlust</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Your gateway to extraordinary travel experiences. We craft unforgettable journeys to the world&apos;s most breathtaking destinations.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-white/60 hover:text-accent-400 transition-colors text-xl"><FiFacebook /></a>
              <a href="#" className="text-white/60 hover:text-accent-400 transition-colors text-xl"><FiInstagram /></a>
              <a href="#" className="text-white/60 hover:text-accent-400 transition-colors text-xl"><FiTwitter /></a>
              <a href="#" className="text-white/60 hover:text-accent-400 transition-colors text-xl"><FiYoutube /></a>
            </div>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[{ to: '/', label: 'Home' }, { to: '/packages', label: 'Travel Packages' }, { to: '/destinations', label: 'Destinations' }, { to: '/about', label: 'About Us' }, { to: '/contact', label: 'Contact' }].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-white/70 hover:text-accent-400 text-sm transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Popular Destinations</h3>
            <ul className="space-y-2">
              {['Bali, Indonesia', 'Santorini, Greece', 'Swiss Alps', 'Serengeti, Tanzania', 'Maldives'].map((dest) => (
                <li key={dest}>
                  <Link to="/destinations" className="text-white/70 hover:text-accent-400 text-sm transition-colors">{dest}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FiMapPin className="text-accent-400 mt-1 flex-shrink-0" />
                <span className="text-white/70 text-sm">123 Travel Street, Suite 400<br />New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="text-accent-400 flex-shrink-0" />
                <span className="text-white/70 text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="text-accent-400 flex-shrink-0" />
                <span className="text-white/70 text-sm">hello@wanderlust.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">&copy; {new Date().getFullYear()} Wanderlust Travels. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-white/50 hover:text-white/80 text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/50 hover:text-white/80 text-sm transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
