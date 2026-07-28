# My Product SaaS Site

![App Preview](https://imgix.cosmicjs.com/234a2630-8a1e-11f1-a539-158ba0e078f0-autopilot-photo-1553877522-43269d4ea984-1785199747078.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A modern, fully responsive SaaS marketing website built with Next.js 16 and powered by [Cosmic](https://www.cosmicjs.com). It renders your features, pricing tiers, testimonials, and FAQs into a polished, conversion-optimized experience.

## Features

- 🏠 **Homepage** with hero, feature grid, pricing, testimonials, FAQ preview, and CTA band
- 🚀 **Features index & detail pages** with icons, descriptions, and full-size screenshots
- 💳 **Pricing page** with a monthly/annual billing toggle and automatic annual savings calculation
- ⭐ **Testimonials wall** with star ratings, avatars, and a featured spotlight
- ❓ **FAQ page** with category grouping and accessible accordion interactions
- 📱 **Fully responsive** mobile-first layout with a slide-down mobile navigation
- ⚡ **Server Components** for secure, fast data fetching — API keys never reach the browser
- 🔒 **TypeScript strict mode** with complete type definitions for every Cosmic object type
- 🖼️ **imgix image optimization** at 2x resolution for crisp retina rendering

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a67fc01f5196dac661fab84&clone_repository=6a67fdc0f5196dac661fabde)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for a SaaS product website with features, pricing tiers, documentation pages, and customer testimonials.
>
> User instructions: A SaaS landing page with features, pricing tiers, FAQ, and testimonials"

### Code Generation Prompt

> Build a Next.js application for an online business called "My Product". The content is managed in Cosmic CMS with the following object types: features, pricing-tiers, testimonials, faqs. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: A SaaS landing page with features, pricing tiers, FAQ, and testimonials

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **[Next.js 16](https://nextjs.org)** — App Router, React Server Components
- **[React 19](https://react.dev)**
- **[TypeScript](https://www.typescriptlang.org)** — strict mode
- **[Tailwind CSS](https://tailwindcss.com)** + `@tailwindcss/typography`
- **[Cosmic SDK](https://www.cosmicjs.com/docs)** — headless content management
- **[imgix](https://imgix.com)** — on-the-fly image optimization

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) (or Node.js 20+)
- A Cosmic account with a bucket containing `features`, `pricing-tiers`, `testimonials`, and `faqs` object types

### Installation

1. Clone the repository and install dependencies:

```bash
bun install
```

2. Create a `.env.local` file in the project root with your Cosmic credentials:

```bash
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

3. Start the development server:

```bash
bun run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

```bash
bun run dev         # Start the dev server
bun run build       # Type-check then build for production
bun run start       # Start the production server
bun run type-check  # Run TypeScript validation only
```

## Cosmic SDK Examples

Initialize the client (server-side only):

```typescript
import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})
```

Fetch all features and sort them manually by display order:

```typescript
const response = await cosmic.objects
  .find({ type: 'features' })
  .props(['id', 'title', 'slug', 'metadata', 'type'])
  .depth(1)

const features = response.objects.sort((a, b) => {
  const orderA = Number(a.metadata?.display_order ?? 999)
  const orderB = Number(b.metadata?.display_order ?? 999)
  return orderA - orderB
})
```

Fetch a single pricing tier with connected feature objects resolved:

```typescript
const response = await cosmic.objects
  .findOne({ type: 'pricing-tiers', slug: 'pro' })
  .depth(1)

const tier = response.object
// tier.metadata.included_features is an array of full Feature objects
```

Handle empty results — Cosmic returns a 404 when no objects match:

```typescript
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

try {
  const response = await cosmic.objects.find({ type: 'testimonials' }).depth(1)
  return response.objects
} catch (error) {
  if (hasStatus(error) && error.status === 404) return []
  throw new Error('Failed to fetch testimonials')
}
```

## Cosmic CMS Integration

This app consumes four object types from your bucket:

| Object Type | Slug | Used On |
| --- | --- | --- |
| 🚀 Features | `features` | Homepage grid, `/features`, `/features/[slug]` |
| 💳 Pricing Tiers | `pricing-tiers` | Homepage pricing block, `/pricing` |
| 💬 Testimonials | `testimonials` | Homepage social proof, `/testimonials` |
| ❓ FAQs | `faqs` | Homepage FAQ preview, `/faq` |

**Field mapping**

- `features`: `feature_name`, `short_description`, `icon`, `screenshot`, `display_order`
- `pricing-tiers`: `plan_name`, `tagline`, `monthly_price`, `annual_price`, `whats_included`, `included_features`, `cta_label`, `cta_link`, `most_popular`
- `testimonials`: `quote`, `author_name`, `job_title`, `company`, `avatar`, `rating`, `featured`
- `faqs`: `question`, `answer`, `category`, `display_order`

All content is fetched in Server Components with `depth(1)` so connected objects resolve in a single request. Read the full [Cosmic documentation](https://www.cosmicjs.com/docs) for more details.

## Deployment Options

### Vercel (recommended)

1. Push the repository to GitHub.
2. Import the project at [vercel.com/new](https://vercel.com/new).
3. Add the environment variables `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, and `COSMIC_WRITE_KEY` in **Project Settings → Environment Variables**.
4. Deploy.

### Netlify

1. Connect your repository at [app.netlify.com](https://app.netlify.com).
2. Build command: `bun run build` — Publish directory: `.next`.
3. Add the same three environment variables under **Site settings → Environment variables**.
4. Deploy.

### Environment Variables

| Variable | Description |
| --- | --- |
| `COSMIC_BUCKET_SLUG` | Your Cosmic bucket slug |
| `COSMIC_READ_KEY` | Read key for fetching content |
| `COSMIC_WRITE_KEY` | Write key (reserved for future write operations) |

Never commit `.env` files — they are excluded via `.gitignore`.
<!-- README_END -->