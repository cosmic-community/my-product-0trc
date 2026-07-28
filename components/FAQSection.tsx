import Link from 'next/link'
import type { FAQ } from '@/types'
import FAQAccordion from '@/components/FAQAccordion'
import SectionHeading from '@/components/SectionHeading'

interface FAQSectionProps {
  faqs: FAQ[]
  limit?: number
  showViewAll?: boolean
}

export default function FAQSection({ faqs, limit, showViewAll = false }: FAQSectionProps) {
  if (!faqs || faqs.length === 0) {
    return null
  }

  const visible = typeof limit === 'number' ? faqs.slice(0, limit) : faqs
  const first = visible[0]

  return (
    <section id="faq" className="border-t border-ink-200 bg-ink-50/50 py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently asked questions"
          description="Everything you need to know about the product and billing."
        />

        <div className="mx-auto mt-12 max-w-3xl">
          <FAQAccordion faqs={visible} defaultOpenId={first ? first.id : undefined} />

          {showViewAll && faqs.length > visible.length && (
            <div className="mt-10 text-center">
              <Link href="/faq" className="btn-secondary">
                See all {faqs.length} questions
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}