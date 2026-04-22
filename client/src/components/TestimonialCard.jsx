import StarRating from "./StarRating.jsx";

export default function TestimonialCard({ review }) {
  return (
    <div className="card p-6">
      <StarRating rating={review.rating} />
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        &ldquo;{review.comment}&rdquo;
      </p>
      <div className="mt-4 flex items-center gap-3">
        {review.avatar ? (
          <img
            src={review.avatar}
            alt={review.name}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
            {review.name.charAt(0)}
          </div>
        )}
        <div>
          <p className="text-sm font-semibold text-slate-900">{review.name}</p>
          <p className="text-xs text-slate-500">{review.packageTitle || "Verified Traveler"}</p>
        </div>
      </div>
    </div>
  );
}
