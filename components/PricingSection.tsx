'use client'

import { useState } from 'react'
import type { PricingTier } from '@/types'
import PricingCard from '@/components/PricingCard'
import SectionHeading from '@/components/SectionHeading'

interface PricingSectionProps {
  tiers: PricingTier[]
  showHeading?: boolean
}

export default function PricingSection({ tiers, showHeading = true }: PricingSectionProps) {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly')

  if (!tiers || tiers.length === 0) {
    return null
  }

  const gridCols =
    tiers.length >= 4 ? 'lg:grid-cols-4' : tiers.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'

  return (
    <section id="pricing" className="border-y border-ink-200 bg-ink-50/50 py-20 sm:py-24">
      <div className="container-page">
        {showHeading && (
          <SectionHeading
            eyebrow="Pricing"
            title="Simple, transparent pricing"
            description="Start free and upgrade as you grow. Every plan includes unlimited projects and world-class support."
          />
        )}

        <div className="mt-10 flex justify-center">
          <div
            role="group"
            aria-label="Billing period"
            className="inline-flex rounded-xl border border-ink-200 bg-white p-1 shadow-soft"
          >
            <button
              type="button"
              onClick={() => setBilling('monthly')}
              aria-pressed={billing === 'monthly'}
              className={`rounded-lg px-5 py-2 text-sm font-semibold transition-colors ${
                billing === 'monthly'
                  ? 'bg-brand-600 text-white'
                  : 'text-ink-600 hover:text-ink-900'
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBilling('annual')}
              aria-pressed={billing === 'annual'}
              className={`rounded-lg px-5 py-2 text-sm font-semibold transition-colors ${
                billing === 'annual' ? 'bg-brand-600 text-white' : 'text-ink-600 hover:text-ink-900'
              }`}
            >
              Annual
            </button>
          </div>
        </div>

        <div className={`mt-12 grid gap-6 sm:grid-cols-2 ${gridCols}`}>
          {tiers.map((tier) => {
            if (!tier || !tier.id) return null
            return <PricingCard key={tier.id} tier={tier} billing={billing} />
          })}
        </div>
      </div>
    </section>
  )
}