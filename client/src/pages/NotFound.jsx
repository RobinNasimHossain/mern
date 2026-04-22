import { Link } from "react-router-dom";
import { MdFlightTakeoff } from "react-icons/md";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <MdFlightTakeoff className="h-20 w-20 text-brand-300" />
      <h1 className="mt-6 text-6xl font-extrabold text-slate-900">404</h1>
      <p className="mt-4 text-xl text-slate-600">
        Oops! This destination doesn&apos;t exist on our map.
      </p>
      <p className="mt-2 text-slate-500">
        The page you&apos;re looking for may have been moved or doesn&apos;t exist.
      </p>
      <div className="mt-8 flex gap-4">
        <Link to="/" className="btn-primary px-8 py-3">
          Go Home
        </Link>
        <Link to="/packages" className="btn-outline px-8 py-3">
          Browse Packages
        </Link>
      </div>
    </div>
  );
}
