import type { Testimonial } from '@/types'
import { getMetafieldValue, getNumberValue } from '@/lib/cosmic'
import StarRating from '@/components/StarRating'

interface TestimonialCardProps {
  testimonial: Testimonial
  highlight?: boolean
}

export default function TestimonialCard({ testimonial, highlight = false }: TestimonialCardProps) {
  if (!testimonial) return null

  const quote = getMetafieldValue(testimonial.metadata?.quote)
  const authorName = getMetafieldValue(testimonial.metadata?.author_name) || testimonial.title
  const jobTitle = getMetafieldValue(testimonial.metadata?.job_title)
  const company = getMetafieldValue(testimonial.metadata?.company)
  const avatar = testimonial.metadata?.avatar
  const rating = getNumberValue(testimonial.metadata?.rating)

  const initials = authorName
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const role = [jobTitle, company].filter((part) => part.length > 0).join(' · ')

  return (
    <figure
      className={`flex h-full flex-col rounded-2xl border p-7 transition-all duration-200 ${
        highlight
          ? 'border-brand-200 bg-brand-50/60 shadow-lift'
          : 'border-ink-200 bg-white shadow-soft hover:-translate-y-1 hover:shadow-lift'
      }`}
    >
      {rating !== null && rating > 0 && <StarRating rating={rating} className="mb-5" />}

      <blockquote
        className={`flex-1 leading-relaxed text-ink-700 ${
          highlight ? 'text-lg sm:text-xl' : 'text-base'
        }`}
      >
        “{quote}”
      </blockquote>

      <figcaption className="mt-7 flex items-center gap-3.5 border-t border-ink-200/80 pt-6">
        {avatar?.imgix_url ? (
          <img
            src={`${avatar.imgix_url}?w=112&h=112&fit=crop&crop=faces&auto=format,compress`}
            alt={authorName}
            width={56}
            height={56}
            className="h-12 w-12 rounded-full object-cover"
          />
        ) : (
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
            {initials.length > 0 ? initials : '★'}
          </span>
        )}
        <div>
          <div className="text-sm font-semibold text-ink-900">{authorName}</div>
          {role.length > 0 && <div className="text-sm text-ink-500">{role}</div>}
        </div>
      </figcaption>
    </figure>
  )
}