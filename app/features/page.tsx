import type { Metadata } from 'next'
import { getFeatures } from '@/lib/cosmic'
import FeatureCard from '@/components/FeatureCard'
import SectionHeading from '@/components/SectionHeading'
import CTASection from '@/components/CTASection'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Features — My Product',
  description:
    'Explore every capability of My Product — from planning and collaboration to shipping and analytics.',
}

export default async function FeaturesPage() {
  const features = await getFeatures()

  return (
    <>
      <section className="border-b border-ink-200 bg-ink-50/40 py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Features"
            title="Everything included, out of the box"
            description="A complete toolkit designed to remove friction from every stage of your product workflow."
          />
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-page">
          {features.length === 0 ? (
            <p className="text-center text-ink-500">No features have been published yet.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => {
                if (!feature || !feature.id) return null
                return <FeatureCard key={feature.id} feature={feature} showImage />
              })}
            </div>
          )}
        </div>
      </section>

      <CTASection
        title="See these features in action"
        description="Spin up a workspace in under a minute and explore every feature with your own data."
        secondaryLabel="Compare plans"
        secondaryHref="/pricing"
      />
    </>
  )
}