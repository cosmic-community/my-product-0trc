import { getFAQs, getFeatures, getPricingTiers, getTestimonials } from '@/lib/cosmic'
import Hero from '@/components/Hero'
import FeaturesSection from '@/components/FeaturesSection'
import PricingSection from '@/components/PricingSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import FAQSection from '@/components/FAQSection'
import CTASection from '@/components/CTASection'

export const revalidate = 60

export default async function HomePage() {
  const [features, tiers, testimonials, faqs] = await Promise.all([
    getFeatures(),
    getPricingTiers(),
    getTestimonials(),
    getFAQs(),
  ])

  const heroFeature = features.find((feature) => Boolean(feature?.metadata?.screenshot))

  return (
    <>
      <Hero
        featureCount={features.length}
        testimonialCount={testimonials.length}
        heroFeature={heroFeature}
      />
      <FeaturesSection features={features} limit={6} showViewAll />
      <PricingSection tiers={tiers} />
      <TestimonialsSection testimonials={testimonials} limit={3} showViewAll />
      <FAQSection faqs={faqs} limit={5} showViewAll />
      <CTASection />
    </>
  )
}