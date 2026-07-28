export default function Loading() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center gap-4 py-20">
      <span
        className="h-10 w-10 animate-spin rounded-full border-2 border-ink-200 border-t-brand-600"
        aria-hidden="true"
      />
      <p className="text-sm font-medium text-ink-500">Loading…</p>
    </div>
  )
}