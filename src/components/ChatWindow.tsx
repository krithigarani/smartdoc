import { useEffect, useRef } from 'react'
import type { ChatMessage } from '../types'
import ChatBubble from './ChatBubble'
import TypingIndicator from './TypingIndicator'

interface ChatWindowProps {
  messages: ChatMessage[]
  isThinking: boolean
}

function ChatWindow({ messages, isThinking }: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isThinking])

  return (
    <div
      role="log"
      aria-label="Chat conversation"
      aria-live="polite"
      className="flex-1 space-y-4 overflow-y-auto px-4 py-6 sm:px-6"
    >
      {messages.length === 0 && !isThinking && (
        <div className="flex h-full items-center justify-center text-center text-sm text-muted">
          Upload a document and ask a question to get started.
        </div>
      )}

      {messages.map((message, index) => (
        <ChatBubble key={index} message={message} index={index} />
      ))}

      {isThinking && <TypingIndicator />}

      <div ref={bottomRef} />
    </div>
  )
}

export default ChatWindow
