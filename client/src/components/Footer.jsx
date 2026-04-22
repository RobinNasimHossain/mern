import { Link } from "react-router-dom";
import { MdFlightTakeoff } from "react-icons/md";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2 text-white">
              <MdFlightTakeoff className="h-7 w-7 text-brand-400" />
              <span className="text-xl font-bold">
                Wanderlust<span className="text-brand-400"> Travels</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Creating unforgettable travel experiences since 2010. We bring your dream vacations to
              life with handpicked destinations and expert-curated itineraries.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-brand-400 transition">Home</Link></li>
              <li><Link to="/packages" className="hover:text-brand-400 transition">Packages</Link></li>
              <li><Link to="/about" className="hover:text-brand-400 transition">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-brand-400 transition">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Popular Destinations
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/packages/bali-paradise-retreat" className="hover:text-brand-400 transition">Bali, Indonesia</Link></li>
              <li><Link to="/packages/swiss-alps-adventure" className="hover:text-brand-400 transition">Swiss Alps</Link></li>
              <li><Link to="/packages/santorini-luxury-escape" className="hover:text-brand-400 transition">Santorini, Greece</Link></li>
              <li><Link to="/packages/japan-cultural-journey" className="hover:text-brand-400 transition">Japan</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Contact Info
            </h3>
            <ul className="space-y-2 text-sm">
              <li>123 Travel Street, Suite 100</li>
              <li>New York, NY 10001</li>
              <li>+1 (555) 123-4567</li>
              <li>hello@wanderlusttravels.com</li>
            </ul>
            <div className="mt-4 flex gap-3">
              <a href="#" className="rounded-full bg-slate-800 p-2 hover:bg-brand-600 transition" aria-label="Facebook">
                <FaFacebookF className="h-4 w-4" />
              </a>
              <a href="#" className="rounded-full bg-slate-800 p-2 hover:bg-brand-600 transition" aria-label="Instagram">
                <FaInstagram className="h-4 w-4" />
              </a>
              <a href="#" className="rounded-full bg-slate-800 p-2 hover:bg-brand-600 transition" aria-label="Twitter">
                <FaTwitter className="h-4 w-4" />
              </a>
              <a href="#" className="rounded-full bg-slate-800 p-2 hover:bg-brand-600 transition" aria-label="YouTube">
                <FaYoutube className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} Wanderlust Travels. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
