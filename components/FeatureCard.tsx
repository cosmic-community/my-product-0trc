import Link from 'next/link'
import type { Feature } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface FeatureCardProps {
  feature: Feature
  showImage?: boolean
}

export default function FeatureCard({ feature, showImage = false }: FeatureCardProps) {
  if (!feature) return null

  const name = getMetafieldValue(feature.metadata?.feature_name) || feature.title
  const description = getMetafieldValue(feature.metadata?.short_description)
  const icon = getMetafieldValue(feature.metadata?.icon)
  const screenshot = feature.metadata?.screenshot

  return (
    <Link
      href={`/features/${feature.slug}`}
      className="card group flex h-full flex-col hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift"
    >
      {showImage && screenshot?.imgix_url && (
        <div className="mb-5 overflow-hidden rounded-xl border border-ink-200">
          <img
            src={`${screenshot.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
            alt={name}
            width={400}
            height={225}
            className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>
      )}

      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-2xl">
        {icon.length > 0 ? (
          <span aria-hidden="true">{icon}</span>
        ) : (
          <span aria-hidden="true" className="text-brand-600">
            ✦
          </span>
        )}
      </div>

      <h3 className="text-lg font-semibold text-ink-900 transition-colors group-hover:text-brand-700">
        {name}
      </h3>

      {description.length > 0 && (
        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-600">{description}</p>
      )}

      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
        Learn more
        <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path
            d="M4 10h11m0 0l-4.5-4.5M15 10l-4.5 4.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  )
}