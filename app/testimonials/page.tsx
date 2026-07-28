import type { Metadata } from 'next'
import { getTestimonials } from '@/lib/cosmic'
import TestimonialCard from '@/components/TestimonialCard'
import SectionHeading from '@/components/SectionHeading'
import CTASection from '@/components/CTASection'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Customer Stories — My Product',
  description:
    'Read how teams around the world use My Product to plan, build, and ship better software.',
}

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials()

  const featured = testimonials.filter((item) => item?.metadata?.featured === true)
  const spotlight = featured[0]
  const rest = spotlight
    ? testimonials.filter((item) => item && item.id !== spotlight.id)
    : testimonials

  return (
    <>
      <section className="border-b border-ink-200 bg-ink-50/40 py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Customer stories"
            title="Trusted by teams that build great things"
            description="Real feedback from the product, engineering, and design leaders who use My Product every day."
          />
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-page">
          {testimonials.length === 0 ? (
            <p className="text-center text-ink-500">No testimonials have been published yet.</p>
          ) : (
            <div className="space-y-10">
              {spotlight && (
                <div className="mx-auto max-w-3xl">
                  <TestimonialCard testimonial={spotlight} highlight />
                </div>
              )}

              {rest.length > 0 && (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {rest.map((testimonial) => {
                    if (!testimonial || !testimonial.id) return null
                    return <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <CTASection
        title="Become the next success story"
        description="Try My Product free for 14 days and see why teams switch — and stay."
        secondaryLabel="View pricing"
        secondaryHref="/pricing"
      />
    </>
  )
}