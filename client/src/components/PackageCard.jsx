import { Link } from 'react-router-dom';
import { FiClock, FiStar, FiMapPin, FiUsers } from 'react-icons/fi';

export default function PackageCard({ pkg }) {
  const discount = pkg.originalPrice
    ? Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {discount > 0 && (
          <span className="absolute top-4 left-4 bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            {discount}% OFF
          </span>
        )}
        <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-primary-900 text-xs font-semibold px-3 py-1 rounded-full capitalize">
          {pkg.category}
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
          <FiMapPin className="text-accent-500" />
          <span>{pkg.destination}, {pkg.country}</span>
        </div>

        <h3 className="font-heading text-xl font-semibold text-primary-900 mb-2 group-hover:text-accent-600 transition-colors">
          {pkg.title}
        </h3>

        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {pkg.description}
        </p>

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <FiClock className="text-accent-500" />
            {pkg.duration}
          </span>
          <span className="flex items-center gap-1">
            <FiStar className="text-yellow-500 fill-yellow-500" />
            {pkg.rating} ({pkg.reviewCount})
          </span>
          <span className="flex items-center gap-1">
            <FiUsers className="text-accent-500" />
            Max {pkg.maxGroupSize}
          </span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <span className="text-2xl font-bold text-primary-900">${pkg.price}</span>
            {pkg.originalPrice && (
              <span className="text-sm text-gray-400 line-through ml-2">${pkg.originalPrice}</span>
            )}
            <span className="text-sm text-gray-500"> /person</span>
          </div>
          <Link
            to={`/packages/${pkg.slug}`}
            className="bg-primary-800 hover:bg-accent-500 text-white text-sm font-medium py-2 px-5 rounded-full transition-colors duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
