import Link from 'next/link'
import type { Feature } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface HeroProps {
  featureCount: number
  testimonialCount: number
  heroFeature?: Feature | undefined
}

export default function Hero({ featureCount, testimonialCount, heroFeature }: HeroProps) {
  const screenshot = heroFeature?.metadata?.screenshot

  return (
    <section className="relative overflow-hidden border-b border-ink-200 bg-ink-50/40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-brand-200/40 blur-3xl"
      />
      <div className="container-page relative py-20 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-1.5 text-xs font-semibold text-brand-700 shadow-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            New — {featureCount > 0 ? `${featureCount} powerful features` : 'Now available'}
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-ink-900 sm:text-6xl">
            Everything your team needs,{' '}
            <span className="bg-brand-gradient bg-clip-text text-transparent">in one place</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-600">
            My Product brings planning, building, and shipping together so your team can move faster
            with less friction — and finally retire the tool sprawl.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/pricing" className="btn-primary w-full px-8 py-3.5 text-base sm:w-auto">
              Start free trial
            </Link>
            <Link href="/features" className="btn-secondary w-full px-8 py-3.5 text-base sm:w-auto">
              Explore features
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-ink-500">
            <span className="flex items-center gap-2">
              <CheckIcon /> No credit card required
            </span>
            <span className="flex items-center gap-2">
              <CheckIcon /> Cancel anytime
            </span>
            {testimonialCount > 0 && (
              <span className="flex items-center gap-2">
                <CheckIcon /> Loved by {testimonialCount}+ teams
              </span>
            )}
          </div>
        </div>

        {screenshot?.imgix_url && (
          <div className="mx-auto mt-16 max-w-5xl animate-fade-up">
            <div className="overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-lift">
              <img
                src={`${screenshot.imgix_url}?w=2000&h=1120&fit=crop&auto=format,compress`}
                alt={getMetafieldValue(heroFeature?.metadata?.feature_name) || 'Product screenshot'}
                width={1000}
                height={560}
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="text-brand-600"
    >
      <path
        d="M4 10.5l4 4 8-9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}