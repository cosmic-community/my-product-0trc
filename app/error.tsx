'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error.message)
  }, [error])

  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="text-4xl" aria-hidden="true">
        ⚠️
      </span>
      <h1 className="mt-5 text-2xl font-bold tracking-tight text-ink-900">Something went wrong</h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-600">
        We couldn&apos;t load this content right now. Please try again in a moment.
      </p>
      <button type="button" onClick={reset} className="btn-primary mt-8">
        Try again
      </button>
    </div>
  )
}