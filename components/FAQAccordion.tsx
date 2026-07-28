'use client'

import { useState } from 'react'
import type { FAQ } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface FAQAccordionProps {
  faqs: FAQ[]
  defaultOpenId?: string
}

export default function FAQAccordion({ faqs, defaultOpenId }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null)

  if (!faqs || faqs.length === 0) {
    return <p className="text-sm text-ink-500">No questions available yet.</p>
  }

  return (
    <div className="divide-y divide-ink-200 overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-soft">
      {faqs.map((faq) => {
        if (!faq || !faq.id) return null

        const question = getMetafieldValue(faq.metadata?.question) || faq.title
        const answer = getMetafieldValue(faq.metadata?.answer)
        const isOpen = openId === faq.id

        return (
          <div key={faq.id}>
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : faq.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-ink-50/70"
            >
              <span className="text-base font-semibold text-ink-900">{question}</span>
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-ink-200 text-ink-600 transition-transform duration-200 ${
                  isOpen ? 'rotate-45 border-brand-300 bg-brand-50 text-brand-700' : ''
                }`}
                aria-hidden="true"
              >
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M10 4v12M4 10h12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </button>

            {isOpen && answer.length > 0 && (
              <div className="px-6 pb-6 pr-14">
                <p className="whitespace-pre-line text-sm leading-relaxed text-ink-600">{answer}</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}