import { Link } from "react-router-dom";
import { HiOutlineClock, HiOutlineUserGroup, HiOutlineStar } from "react-icons/hi";

export default function PackageCard({ pkg }) {
  return (
    <div className="card group overflow-hidden">
      <div className="relative h-56 overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {pkg.discountPrice && (
          <span className="absolute left-3 top-3 rounded-full bg-rose-500 px-3 py-1 text-xs font-bold text-white">
            Save ${pkg.price - pkg.discountPrice}
          </span>
        )}
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold capitalize text-brand-700 backdrop-blur">
          {pkg.category}
        </span>
      </div>

      <div className="p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-brand-600">
          {pkg.destination}, {pkg.country}
        </p>
        <h3 className="mt-1 text-lg font-bold text-slate-900">{pkg.title}</h3>

        <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <HiOutlineClock className="h-4 w-4" />
            {pkg.duration} Days
          </span>
          <span className="flex items-center gap-1">
            <HiOutlineUserGroup className="h-4 w-4" />
            Max {pkg.groupSize}
          </span>
          <span className="flex items-center gap-1">
            <HiOutlineStar className="h-4 w-4 text-amber-400" />
            {pkg.rating} ({pkg.reviewCount})
          </span>
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div>
            {pkg.discountPrice ? (
              <>
                <span className="text-sm text-slate-400 line-through">${pkg.price}</span>
                <span className="ml-2 text-2xl font-bold text-brand-600">
                  ${pkg.discountPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold text-brand-600">${pkg.price}</span>
            )}
            <span className="text-sm text-slate-500"> / person</span>
          </div>
          <Link
            to={`/packages/${pkg.slug}`}
            className="btn-primary text-xs"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
