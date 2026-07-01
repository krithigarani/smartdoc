import { useState } from 'react'
import type { FormEvent } from 'react'

interface ChatInputProps {
  onSend: (text: string) => void
  disabled?: boolean
}

function ChatInput({ onSend, disabled = false }: ChatInputProps) {
  const [value, setValue] = useState('')

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setValue('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 border-t border-border bg-bg/80 p-4 backdrop-blur-md"
    >
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        disabled={disabled}
        placeholder="Ask a question about your document..."
        aria-label="Message input"
        className="glow-focus flex-1 rounded-full border border-border bg-surface px-4 py-2.5 text-sm text-text placeholder:text-muted focus:outline-none disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        aria-label="Send message"
        className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-all duration-200 hover:shadow-[0_0_16px_rgba(99,102,241,0.5)] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <svg
          className="h-4 w-4 transition-transform duration-200 group-hover:rotate-45"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19V5m0 0-6 6m6-6 6 6" />
        </svg>
      </button>
    </form>
  )
}

export default ChatInput
