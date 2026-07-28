import { createBucketClient } from '@cosmicjs/sdk'
import type { FAQ, Feature, PricingTier, Testimonial } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper for Cosmic SDK
export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

// Safely convert any metafield value into a renderable string
export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}

// Safely convert any metafield value into a number
export function getNumberValue(field: unknown): number | null {
  if (typeof field === 'number' && !Number.isNaN(field)) return field
  if (typeof field === 'string') {
    const cleaned = field.replace(/[^0-9.\-]/g, '')
    if (cleaned.length === 0) return null
    const parsed = Number.parseFloat(cleaned)
    return Number.isNaN(parsed) ? null : parsed
  }
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return getNumberValue((field as { value: unknown }).value)
  }
  return null
}

function orderOf(value: unknown): number {
  const num = getNumberValue(value)
  return num === null ? 9999 : num
}

// ---------- Features ----------

export async function getFeatures(): Promise<Feature[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'features' })
      .props(['id', 'title', 'slug', 'type', 'content', 'metadata', 'created_at', 'modified_at'])
      .depth(1)

    const features = (response.objects ?? []) as Feature[]
    return features.sort(
      (a, b) => orderOf(a.metadata?.display_order) - orderOf(b.metadata?.display_order)
    )
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch features')
  }
}

export async function getFeature(slug: string): Promise<Feature | null> {
  try {
    const response = await cosmic.objects.findOne({ type: 'features', slug }).depth(1)
    const feature = response.object as Feature | undefined
    if (!feature) return null
    return feature
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error('Failed to fetch feature')
  }
}

// ---------- Pricing tiers ----------

export async function getPricingTiers(): Promise<PricingTier[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'pricing-tiers' })
      .props(['id', 'title', 'slug', 'type', 'content', 'metadata', 'created_at', 'modified_at'])
      .depth(1)

    const tiers = (response.objects ?? []) as PricingTier[]
    return tiers.sort((a, b) => {
      const priceA = getNumberValue(a.metadata?.monthly_price) ?? 0
      const priceB = getNumberValue(b.metadata?.monthly_price) ?? 0
      return priceA - priceB
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch pricing tiers')
  }
}

// ---------- Testimonials ----------

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'testimonials' })
      .props(['id', 'title', 'slug', 'type', 'content', 'metadata', 'created_at', 'modified_at'])
      .depth(1)

    const testimonials = (response.objects ?? []) as Testimonial[]
    return testimonials.sort((a, b) => {
      const featuredA = a.metadata?.featured === true ? 0 : 1
      const featuredB = b.metadata?.featured === true ? 0 : 1
      return featuredA - featuredB
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch testimonials')
  }
}

// ---------- FAQs ----------

export async function getFAQs(): Promise<FAQ[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'faqs' })
      .props(['id', 'title', 'slug', 'type', 'content', 'metadata', 'created_at', 'modified_at'])
      .depth(1)

    const faqs = (response.objects ?? []) as FAQ[]
    return faqs.sort(
      (a, b) => orderOf(a.metadata?.display_order) - orderOf(b.metadata?.display_order)
    )
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch FAQs')
  }
}

// Group FAQs by their category, preserving the sorted order
export function groupFAQsByCategory(faqs: FAQ[]): Array<{ category: string; items: FAQ[] }> {
  const groups: Record<string, FAQ[]> = {}
  const order: string[] = []

  for (const faq of faqs) {
    if (!faq) continue
    const rawCategory = getMetafieldValue(faq.metadata?.category)
    const category = rawCategory.trim().length > 0 ? rawCategory.trim() : 'General'

    const existing = groups[category]
    if (!existing) {
      groups[category] = [faq]
      order.push(category)
    } else {
      existing.push(faq)
    }
  }

  return order
    .map((category) => {
      const items = groups[category]
      if (!items || items.length === 0) return null
      return { category, items }
    })
    .filter((group): group is { category: string; items: FAQ[] } => group !== null)
}