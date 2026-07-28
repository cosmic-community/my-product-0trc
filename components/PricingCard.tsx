'use client'

import Link from 'next/link'
import type { PricingTier } from '@/types'
import { getMetafieldValue, getNumberValue } from '@/lib/cosmic'

interface PricingCardProps {
  tier: PricingTier
  billing: 'monthly' | 'annual'
}

function parseIncludedList(value: string): string[] {
  if (!value || value.trim().length === 0) return []
  return value
    .split(/\r?\n/)
    .map((line) => line.replace(/^[-*•\s]+/, '').trim())
    .filter((line) => line.length > 0)
}

export default function PricingCard({ tier, billing }: PricingCardProps) {
  if (!tier) return null

  const planName = getMetafieldValue(tier.metadata?.plan_name) || tier.title
  const tagline = getMetafieldValue(tier.metadata?.tagline)
  const monthly = getNumberValue(tier.metadata?.monthly_price)
  const annual = getNumberValue(tier.metadata?.annual_price)
  const ctaLabel = getMetafieldValue(tier.metadata?.cta_label) || 'Get started'
  const ctaLink = getMetafieldValue(tier.metadata?.cta_link) || '/pricing'
  const popular = tier.metadata?.most_popular === true

  const includedText = getMetafieldValue(tier.metadata?.whats_included)
  const textList = parseIncludedList(includedText)

  const relatedFeatures = Array.isArray(tier.metadata?.included_features)
    ? tier.metadata.included_features
    : []

  const featureList: string[] =
    textList.length > 0
      ? textList
      : relatedFeatures
          .map((feature) => {
            if (!feature) return ''
            return getMetafieldValue(feature.metadata?.feature_name) || feature.title || ''
          })
          .filter((label) => label.length > 0)

  const isAnnual = billing === 'annual'
  const displayPrice = isAnnual ? (annual !== null ? annual / 12 : monthly) : monthly
  const savings =
    monthly !== null && annual !== null && monthly > 0
      ? Math.max(0, Math.round(((monthly * 12 - annual) / (monthly * 12)) * 100))
      : 0

  const isExternal = ctaLink.startsWith('http')

  return (
    <div
      className={`relative flex h-full flex-col rounded-2xl border bg-white p-7 transition-all duration-200 ${
        popular
          ? 'border-brand-300 shadow-lift ring-2 ring-brand-500/20 lg:-translate-y-2'
          : 'border-ink-200 shadow-soft hover:-translate-y-1 hover:shadow-lift'
      }`}
    >
      {popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-gradient px-4 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-soft">
          Most popular
        </span>
      )}

      <h3 className="text-lg font-bold text-ink-900">{planName}</h3>
      {tagline.length > 0 && <p className="mt-1.5 text-sm text-ink-600">{tagline}</p>}

      <div className="mt-6 flex items-end gap-1.5">
        {displayPrice !== null ? (
          <>
            <span className="text-4xl font-extrabold tracking-tight text-ink-900">
              ${Number.isInteger(displayPrice) ? displayPrice : displayPrice.toFixed(2)}
            </span>
            <span className="pb-1.5 text-sm font-medium text-ink-500">/ month</span>
          </>
        ) : (
          <span className="text-3xl font-extrabold tracking-tight text-ink-900">Custom</span>
        )}
      </div>

      <p className="mt-1.5 h-5 text-xs font-medium text-brand-700">
        {isAnnual && annual !== null
          ? `$${annual} billed annually${savings > 0 ? ` · save ${savings}%` : ''}`
          : monthly !== null
            ? 'Billed monthly'
            : 'Talk to our team'}
      </p>

      <Link
        href={ctaLink}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className={`mt-6 w-full ${popular ? 'btn-primary' : 'btn-secondary'}`}
      >
        {ctaLabel}
      </Link>

      {featureList.length > 0 && (
        <ul className="mt-7 space-y-3 border-t border-ink-200 pt-7">
          {featureList.map((item, index) => (
            <li key={`${tier.id}-item-${index}`} className="flex items-start gap-2.5 text-sm">
              <svg
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-brand-600"
              >
                <path
                  d="M4 10.5l4 4 8-9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="leading-relaxed text-ink-700">{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}