import Link from 'next/link'
import type { Testimonial } from '@/types'
import TestimonialCard from '@/components/TestimonialCard'
import SectionHeading from '@/components/SectionHeading'

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
  limit?: number
  showViewAll?: boolean
}

export default function TestimonialsSection({
  testimonials,
  limit,
  showViewAll = false,
}: TestimonialsSectionProps) {
  if (!testimonials || testimonials.length === 0) {
    return null
  }

  const visible = typeof limit === 'number' ? testimonials.slice(0, limit) : testimonials

  return (
    <section id="testimonials" className="py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Customer stories"
          title="Teams love working in My Product"
          description="Don't take our word for it — here's what real customers say after switching to My Product."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((testimonial) => {
            if (!testimonial || !testimonial.id) return null
            return <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          })}
        </div>

        {showViewAll && testimonials.length > visible.length && (
          <div className="mt-12 text-center">
            <Link href="/testimonials" className="btn-secondary">
              Read all customer stories
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}