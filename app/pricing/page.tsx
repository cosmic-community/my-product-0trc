import type { Metadata } from 'next'
import { getFAQs, getPricingTiers, getTestimonials } from '@/lib/cosmic'
import PricingSection from '@/components/PricingSection'
import FAQSection from '@/components/FAQSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import SectionHeading from '@/components/SectionHeading'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Pricing — My Product',
  description:
    'Simple, transparent pricing for teams of every size. Compare plans and start your free trial today.',
}

export default async function PricingPage() {
  const [tiers, faqs, testimonials] = await Promise.all([
    getPricingTiers(),
    getFAQs(),
    getTestimonials(),
  ])

  const featuredTestimonials = testimonials.filter((item) => item?.metadata?.featured === true)
  const socialProof = featuredTestimonials.length > 0 ? featuredTestimonials : testimonials

  return (
    <>
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Pricing"
            title="Pick the plan that fits your team"
            description="All plans include unlimited projects, secure hosting, and email support. Upgrade or downgrade at any time."
          />
        </div>
      </section>

      {tiers.length === 0 ? (
        <div className="container-page pb-20">
          <p className="text-center text-ink-500">No pricing plans have been published yet.</p>
        </div>
      ) : (
        <PricingSection tiers={tiers} showHeading={false} />
      )}

      <TestimonialsSection testimonials={socialProof} limit={3} />
      <FAQSection faqs={faqs} limit={6} showViewAll />
    </>
  )
}