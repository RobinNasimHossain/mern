import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { MdFlightTakeoff } from "react-icons/md";

const links = [
  { to: "/", label: "Home" },
  { to: "/packages", label: "Packages" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition ${
      isActive
        ? "text-brand-600"
        : "text-slate-700 hover:text-brand-600"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <MdFlightTakeoff className="h-7 w-7 text-brand-600" />
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Wanderlust<span className="text-brand-600"> Travels</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={navLinkClass} end={l.to === "/"}>
              {l.label}
            </NavLink>
          ))}
          <Link to="/packages" className="btn-primary">
            Book Now
          </Link>
        </nav>

        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-slate-700 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <HiOutlineX className="h-6 w-6" /> : <HiOutlineMenu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={navLinkClass}
                end={l.to === "/"}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </NavLink>
            ))}
            <Link to="/packages" className="btn-primary text-center" onClick={() => setOpen(false)}>
              Book Now
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
