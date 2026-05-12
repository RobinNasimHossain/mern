import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function navClass({ isActive }) {
  return [
    "rounded-md px-3 py-1.5 text-sm font-medium",
    isActive
      ? "bg-brand-50 text-brand-700"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
  ].join(" ");
}

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">
            SB
          </span>
          <span className="text-base font-semibold tracking-tight text-slate-900">
            Shoreline Bank
          </span>
        </Link>
        {user ? (
          <nav className="flex items-center gap-1">
            <NavLink to="/" end className={navClass}>
              Dashboard
            </NavLink>
            <NavLink to="/transfer" className={navClass}>
              Transfer
            </NavLink>
            <NavLink to="/deposit" className={navClass}>
              Deposit
            </NavLink>
            <NavLink to="/withdraw" className={navClass}>
              Withdraw
            </NavLink>
            <NavLink to="/renovation" className={navClass}>
              Renovation
            </NavLink>
            <div className="ml-3 flex items-center gap-3 border-l border-slate-200 pl-3">
              <span className="text-sm text-slate-600">{user.name}</span>
              <button
                type="button"
                onClick={handleLogout}
                className="btn-secondary py-1.5 text-xs"
              >
                Log out
              </button>
            </div>
          </nav>
        ) : (
          <nav className="flex items-center gap-2">
            <NavLink to="/login" className={navClass}>
              Log in
            </NavLink>
            <NavLink
              to="/register"
              className="btn-primary px-3 py-1.5 text-xs"
            >
              Open account
            </NavLink>
          </nav>
        )}
      </div>
    </header>
  );
}
