import type { Metadata } from 'next'
import { getFAQs, groupFAQsByCategory } from '@/lib/cosmic'
import FAQAccordion from '@/components/FAQAccordion'
import SectionHeading from '@/components/SectionHeading'
import CTASection from '@/components/CTASection'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'FAQ — My Product',
  description:
    'Answers to the most common questions about My Product features, billing, security, and support.',
}

export default async function FAQPage() {
  const faqs = await getFAQs()
  const groups = groupFAQsByCategory(faqs)

  return (
    <>
      <section className="border-b border-ink-200 bg-ink-50/40 py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Support"
            title="Frequently asked questions"
            description="Can't find what you're looking for? Our support team is one message away."
          />
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-page">
          {groups.length === 0 ? (
            <p className="text-center text-ink-500">No questions have been published yet.</p>
          ) : (
            <div className="mx-auto max-w-3xl space-y-14">
              {groups.map((group) => {
                if (!group || group.items.length === 0) return null
                const firstItem = group.items[0]
                return (
                  <div key={group.category}>
                    <h2 className="mb-6 text-xl font-bold tracking-tight text-ink-900">
                      {group.category}
                    </h2>
                    <FAQAccordion
                      faqs={group.items}
                      defaultOpenId={firstItem ? firstItem.id : undefined}
                    />
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      <CTASection
        title="Still have questions?"
        description="Start a free trial and explore the product yourself, or reach out and we'll walk you through it."
        primaryLabel="Start free trial"
        secondaryLabel="Read customer stories"
        secondaryHref="/testimonials"
      />
    </>
  )
}