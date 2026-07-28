// Base Cosmic object shape
export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, unknown>
  type: string
  created_at: string
  modified_at: string
}

export interface CosmicImage {
  url: string
  imgix_url: string
}

export interface Feature extends CosmicObject {
  type: 'features'
  metadata: {
    feature_name?: string
    short_description?: string
    icon?: string
    screenshot?: CosmicImage
    display_order?: number | string
  }
}

export interface PricingTier extends CosmicObject {
  type: 'pricing-tiers'
  metadata: {
    plan_name?: string
    tagline?: string
    monthly_price?: number | string
    annual_price?: number | string
    whats_included?: string
    included_features?: Feature[]
    cta_label?: string
    cta_link?: string
    most_popular?: boolean
  }
}

export interface Testimonial extends CosmicObject {
  type: 'testimonials'
  metadata: {
    quote?: string
    author_name?: string
    job_title?: string
    company?: string
    avatar?: CosmicImage
    rating?: number | string
    featured?: boolean
  }
}

export interface FAQ extends CosmicObject {
  type: 'faqs'
  metadata: {
    question?: string
    answer?: string
    category?: string
    display_order?: number | string
  }
}

export interface CosmicResponse<T> {
  objects: T[]
  total: number
  limit?: number
  skip?: number
}

// Runtime type guards
export function isFeature(obj: CosmicObject): obj is Feature {
  return obj.type === 'features'
}

export function isPricingTier(obj: CosmicObject): obj is PricingTier {
  return obj.type === 'pricing-tiers'
}

export function isTestimonial(obj: CosmicObject): obj is Testimonial {
  return obj.type === 'testimonials'
}

export function isFAQ(obj: CosmicObject): obj is FAQ {
  return obj.type === 'faqs'
}