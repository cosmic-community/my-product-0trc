interface StarRatingProps {
  rating: number
  className?: string
}

export default function StarRating({ rating, className = '' }: StarRatingProps) {
  const safeRating = Math.max(0, Math.min(5, Math.round(rating)))

  return (
    <div
      className={`flex items-center gap-0.5 ${className}`}
      role="img"
      aria-label={`${safeRating} out of 5 stars`}
    >
      {[0, 1, 2, 3, 4].map((index) => (
        <svg
          key={index}
          width="18"
          height="18"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          className={index < safeRating ? 'text-amber-400' : 'text-ink-200'}
        >
          <path d="M10 15.27L4.122 18.36l1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.905 1.123 6.545z" />
        </svg>
      ))}
    </div>
  )
}