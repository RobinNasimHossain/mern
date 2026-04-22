import { HiStar, HiOutlineStar } from "react-icons/hi";

export default function StarRating({ rating, size = "h-5 w-5" }) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) =>
        star <= Math.round(rating) ? (
          <HiStar key={star} className={`${size} text-amber-400`} />
        ) : (
          <HiOutlineStar key={star} className={`${size} text-amber-400`} />
        )
      )}
    </div>
  );
}
