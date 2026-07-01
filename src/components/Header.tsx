import type { AppStatus } from '../types'

interface HeaderProps {
  status: AppStatus
}

const STATUS_CONFIG: Record<AppStatus, { label: string; dot: string; pulse: boolean }> = {
  ready: { label: 'Ready', dot: 'bg-success', pulse: false },
  processing: { label: 'Processing', dot: 'bg-accent', pulse: true },
  thinking: { label: 'Thinking', dot: 'bg-accent', pulse: true },
}

function Header({ status }: HeaderProps) {
  const config = STATUS_CONFIG[status]

  return (
    <header className="fixed top-0 left-0 right-0 z-20 flex h-14 items-center justify-between border-b border-border bg-bg/80 px-4 backdrop-blur-md sm:px-6">
      <div className="flex items-center font-mono text-lg font-medium tracking-tight text-text">
        SmartDoc
        <span className="ml-1 h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
      </div>

      <div
        role="status"
        aria-label={`Status: ${config.label}`}
        className="flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted"
      >
        <span className="relative flex h-2 w-2" aria-hidden="true">
          {config.pulse && (
            <span
              className={`absolute inline-flex h-full w-full animate-ping rounded-full ${config.dot} opacity-60`}
            />
          )}
          <span className={`relative inline-flex h-2 w-2 rounded-full ${config.dot}`} />
        </span>
        {config.label}
      </div>
    </header>
  )
}

export default Header
