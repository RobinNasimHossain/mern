import { FiStar } from 'react-icons/fi';

export default function TestimonialCard({ name, location, text, rating, avatar }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }, (_, i) => (
          <FiStar
            key={i}
            className={`${i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
          />
        ))}
      </div>
      <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">&ldquo;{text}&rdquo;</p>
      <div className="flex items-center gap-3">
        <img
          src={avatar}
          alt={name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-primary-900 text-sm">{name}</p>
          <p className="text-gray-500 text-xs">{location}</p>
        </div>
      </div>
    </div>
  );
}
