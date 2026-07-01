import type { ChatMessage } from '../types'

interface ChatBubbleProps {
  message: ChatMessage
  index: number
}

function ChatBubble({ message, index }: ChatBubbleProps) {
  const isUser = message.role === 'user'

  return (
    <div
      className={`animate-fade-slide-up flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
      style={{ animationDelay: `${Math.min(index, 10) * 50}ms` }}
    >
      {!isUser && (
        <div
          aria-hidden="true"
          className="flex h-7 w-7 shrink-0 animate-pulse items-center justify-center rounded-full bg-accent/20 font-mono text-xs font-semibold text-accent"
        >
          S
        </div>
      )}

      <div
        role="article"
        aria-label={isUser ? 'Your message' : "SmartDoc's response"}
        className={`max-w-[75%] px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? 'rounded-b-2xl rounded-tl-md rounded-tr-2xl bg-accent text-white'
            : 'rounded-b-2xl rounded-tl-2xl rounded-tr-md border border-border bg-surface text-text'
        }`}
      >
        {message.content}
      </div>
    </div>
  )
}

export default ChatBubble
