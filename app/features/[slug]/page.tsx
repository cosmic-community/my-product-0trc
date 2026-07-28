// app/features/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getFeature, getFeatures, getMetafieldValue } from '@/lib/cosmic'
import FeatureCard from '@/components/FeatureCard'
import CTASection from '@/components/CTASection'

export const revalidate = 60

interface FeaturePageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: FeaturePageProps): Promise<Metadata> {
  const { slug } = await params
  const feature = await getFeature(slug)

  if (!feature) {
    return { title: 'Feature not found — My Product' }
  }

  const name = getMetafieldValue(feature.metadata?.feature_name) || feature.title
  const description = getMetafieldValue(feature.metadata?.short_description)

  return {
    title: `${name} — My Product`,
    description: description.length > 0 ? description : `Learn more about ${name} in My Product.`,
  }
}

export default async function FeatureDetailPage({ params }: FeaturePageProps) {
  const { slug } = await params
  const feature = await getFeature(slug)

  if (!feature) {
    notFound()
  }

  const allFeatures = await getFeatures()
  const related = allFeatures.filter((item) => item && item.id !== feature.id).slice(0, 3)

  const name = getMetafieldValue(feature.metadata?.feature_name) || feature.title
  const description = getMetafieldValue(feature.metadata?.short_description)
  const icon = getMetafieldValue(feature.metadata?.icon)
  const screenshot = feature.metadata?.screenshot
  const bodyContent = typeof feature.content === 'string' ? feature.content : ''

  return (
    <>
      <section className="border-b border-ink-200 bg-ink-50/40 py-14 sm:py-20">
        <div className="container-page">
          <nav className="mb-8 flex items-center gap-2 text-sm text-ink-500" aria-label="Breadcrumb">
            <Link href="/" className="transition-colors hover:text-brand-700">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/features" className="transition-colors hover:text-brand-700">
              Features
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink-800">{name}</span>
          </nav>

          <div className="max-w-3xl">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-3xl shadow-soft">
              {icon.length > 0 ? (
                <span aria-hidden="true">{icon}</span>
              ) : (
                <span aria-hidden="true" className="text-brand-600">
                  ✦
                </span>
              )}
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-ink-900 sm:text-5xl">
              {name}
            </h1>
            {description.length > 0 && (
              <p className="mt-5 text-lg leading-relaxed text-ink-600">{description}</p>
            )}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/pricing" className="btn-primary">
                Start free trial
              </Link>
              <Link href="/features" className="btn-secondary">
                All features
              </Link>
            </div>
          </div>
        </div>
      </section>

      {screenshot?.imgix_url && (
        <section className="py-14 sm:py-16">
          <div className="container-page">
            <div className="overflow-hidden rounded-2xl border border-ink-200 shadow-lift">
              <img
                src={`${screenshot.imgix_url}?w=2000&h=1120&fit=crop&auto=format,compress`}
                alt={name}
                width={1000}
                height={560}
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {bodyContent.trim().length > 0 && (
        <section className="pb-16">
          <div className="container-page">
            <div
              className="prose prose-slate mx-auto max-w-3xl prose-headings:font-bold prose-a:text-brand-700"
              dangerouslySetInnerHTML={{ __html: bodyContent }}
            />
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="border-t border-ink-200 bg-ink-50/50 py-16 sm:py-20">
          <div className="container-page">
            <h2 className="text-2xl font-bold tracking-tight text-ink-900">More features</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => {
                if (!item || !item.id) return null
                return <FeatureCard key={item.id} feature={item} />
              })}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  )
}