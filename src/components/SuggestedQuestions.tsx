interface SuggestedQuestionsProps {
  questions: string[]
  onSelect: (question: string) => void
}

function SuggestedQuestions({ questions, onSelect }: SuggestedQuestionsProps) {
  return (
    <div className="animate-fade-slide-up flex flex-wrap gap-2" style={{ animationDelay: '100ms' }}>
      {questions.map((question) => (
        <button
          key={question}
          type="button"
          onClick={() => onSelect(question)}
          aria-label={`Ask: ${question}`}
          className="glow-focus rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-muted transition-all duration-200 hover:border-accent/50 hover:text-text hover:shadow-[0_0_12px_rgba(99,102,241,0.25)]"
        >
          {question}
        </button>
      ))}
    </div>
  )
}

export default SuggestedQuestions
