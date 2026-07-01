function TypingIndicator() {
  return (
    <div
      role="status"
      aria-label="SmartDoc is thinking"
      className="flex animate-fade-slide-up items-end gap-2"
    >
      <div
        aria-hidden="true"
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/20 font-mono text-xs font-semibold text-accent"
      >
        S
      </div>
      <div className="flex items-center gap-1 rounded-b-2xl rounded-tl-md rounded-tr-2xl border border-border bg-surface px-4 py-3">
        {[0, 1, 2].map((dot) => (
          <span
            key={dot}
            className="h-1.5 w-1.5 animate-wave rounded-full bg-accent"
            style={{ animationDelay: `${dot * 150}ms` }}
          />
        ))}
      </div>
    </div>
  )
}

export default TypingIndicator
