import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

interface DropZoneProps {
  onFileAccepted: (file: File) => void
}

function DropZone({ onFileAccepted }: DropZoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (file) onFileAccepted(file)
    },
    [onFileAccepted],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
    },
  })

  return (
    <div
      {...getRootProps()}
      aria-label="Upload a document by dragging and dropping or clicking to browse"
      className={`group flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-8 text-center transition-all duration-300 ${
        isDragActive
          ? 'scale-[1.02] border-accent bg-accent/5 shadow-[0_0_30px_rgba(99,102,241,0.35)]'
          : 'animate-pulse-glow border-border bg-surface'
      }`}
    >
      <input {...getInputProps()} aria-label="Document file input" />
      <svg
        className={`h-8 w-8 transition-colors ${isDragActive ? 'text-accent' : 'text-muted'}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
        />
      </svg>
      <p className="text-sm font-medium text-text">
        {isDragActive ? 'Drop it here' : 'Drag & drop a document, or click to browse'}
      </p>
      <p className="text-xs text-muted">PDF, DOCX, TXT</p>
    </div>
  )
}

export default DropZone
