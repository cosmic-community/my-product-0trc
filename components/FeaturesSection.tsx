import Link from 'next/link'
import type { Feature } from '@/types'
import FeatureCard from '@/components/FeatureCard'
import SectionHeading from '@/components/SectionHeading'

interface FeaturesSectionProps {
  features: Feature[]
  limit?: number
  showViewAll?: boolean
}

export default function FeaturesSection({
  features,
  limit,
  showViewAll = false,
}: FeaturesSectionProps) {
  if (!features || features.length === 0) {
    return null
  }

  const visible = typeof limit === 'number' ? features.slice(0, limit) : features

  return (
    <section id="features" className="py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Features"
          title="Built for teams that ship"
          description="Every capability you need to plan, collaborate, and deliver — thoughtfully designed and deeply integrated."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((feature) => {
            if (!feature || !feature.id) return null
            return <FeatureCard key={feature.id} feature={feature} />
          })}
        </div>

        {showViewAll && features.length > visible.length && (
          <div className="mt-12 text-center">
            <Link href="/features" className="btn-secondary">
              View all {features.length} features
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}