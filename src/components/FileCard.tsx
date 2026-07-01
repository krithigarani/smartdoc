interface FileCardProps {
  fileName: string
  fileSize: number
  pageCount: number
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function FileCard({ fileName, fileSize, pageCount }: FileCardProps) {
  return (
    <div className="animate-fade-slide-up rounded-xl border border-border bg-surface p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-text" title={fileName}>
            {fileName}
          </p>
          <p className="mt-1 text-xs text-muted">
            {formatFileSize(fileSize)} &middot; {pageCount} {pageCount === 1 ? 'page' : 'pages'}
          </p>
        </div>

        <span
          role="status"
          aria-label="Document indexed and ready"
          className="flex shrink-0 items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-2.5 py-1 text-xs font-medium text-success shadow-[0_0_12px_rgba(16,185,129,0.25)]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
          Indexed
        </span>
      </div>
    </div>
  )
}

export default FileCard
