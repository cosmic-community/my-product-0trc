import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-ink-200 bg-ink-50/60">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient text-base font-bold text-white">
                M
              </span>
              <span className="text-lg font-bold tracking-tight text-ink-900">My Product</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-600">
              The all-in-one platform that helps modern teams plan, build, and ship better software
              — faster than ever before.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink-900">Product</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/features" className="text-ink-600 transition-colors hover:text-brand-700">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-ink-600 transition-colors hover:text-brand-700">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-ink-600 transition-colors hover:text-brand-700">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink-900">Company</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  href="/testimonials"
                  className="text-ink-600 transition-colors hover:text-brand-700"
                >
                  Customer stories
                </Link>
              </li>
              <li>
                <a
                  href="https://www.cosmicjs.com/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-600 transition-colors hover:text-brand-700"
                >
                  Documentation
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-ink-200 pt-6 text-sm text-ink-500 sm:flex-row sm:items-center">
          <p>© {year} My Product. All rights reserved.</p>
          <p>
            Content managed with{' '}
            <a
              href="https://www.cosmicjs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brand-700 hover:underline"
            >
              Cosmic
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}