import { useState } from 'react'
import Header from './components/Header'
import DropZone from './components/DropZone'
import FileCard from './components/FileCard'
import SuggestedQuestions from './components/SuggestedQuestions'
import ChatWindow from './components/ChatWindow'
import ChatInput from './components/ChatInput'
import type { AppStatus, ChatMessage } from './types'

const STARTER_QUESTIONS = [
  'Summarize this document',
  'What are the key takeaways?',
  'List any action items',
]

const MOCK_REPLY =
  "I've reviewed the relevant sections of your document. Here's a placeholder answer — once connected to the Claude API, this will be a real, grounded response based on your file's content."

function estimatePageCount(fileSize: number): number {
  return Math.max(1, Math.round(fileSize / 3000))
}

function App() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isProcessingFile, setIsProcessingFile] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isThinking, setIsThinking] = useState(false)

  const status: AppStatus = isProcessingFile ? 'processing' : isThinking ? 'thinking' : 'ready'

  const handleFileAccepted = (file: File) => {
    setUploadedFile(file)
    setIsProcessingFile(true)
    window.setTimeout(() => setIsProcessingFile(false), 1200)
  }

  const handleSend = (text: string) => {
    setMessages((prev) => [...prev, { role: 'user', content: text }])
    setIsThinking(true)
    window.setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'assistant', content: MOCK_REPLY }])
      setIsThinking(false)
    }, 1500)
  }

  return (
    <div className="flex min-h-screen flex-col bg-bg text-text">
      <Header status={status} />

      <main className="flex flex-1 flex-col pt-14 md:flex-row">
        <section
          aria-label="Document panel"
          className="flex flex-col gap-4 border-b border-border p-4 md:w-[35%] md:border-b-0 md:border-r md:p-6"
        >
          <DropZone onFileAccepted={handleFileAccepted} />

          {isProcessingFile && (
            <div
              role="progressbar"
              aria-label="Indexing document"
              className="relative h-1.5 w-full overflow-hidden rounded-full bg-surface"
            >
              <div className="h-full w-full animate-pulse rounded-full bg-accent" />
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            </div>
          )}

          {uploadedFile && !isProcessingFile && (
            <>
              <FileCard
                fileName={uploadedFile.name}
                fileSize={uploadedFile.size}
                pageCount={estimatePageCount(uploadedFile.size)}
              />
              <SuggestedQuestions questions={STARTER_QUESTIONS} onSelect={handleSend} />
            </>
          )}
        </section>

        <section aria-label="Chat panel" className="flex flex-1 flex-col md:w-[65%]">
          <ChatWindow messages={messages} isThinking={isThinking} />
          <ChatInput onSend={handleSend} disabled={isThinking} />
        </section>
      </main>
    </div>
  )
}

export default App
