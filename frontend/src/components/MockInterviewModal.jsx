import React, { useState } from 'react'
import { MessageSquareCode, Sparkles, Send, X, ShieldAlert, Award, Loader2, CheckCircle2, User, Bot } from 'lucide-react'

export default function MockInterviewModal({ isOpen, onClose, lab, userCode, onFetchQuestion, onEvaluateAnswer }) {
  const [questionData, setQuestionData] = useState(null)
  const [candidateAnswer, setCandidateAnswer] = useState('')
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(false)
  const [isSubmittingAnswer, setIsSubmittingAnswer] = useState(false)
  const [evaluationFeedback, setEvaluationFeedback] = useState(null)

  if (!isOpen) return null

  const handleStartInterview = async () => {
    setIsLoadingQuestion(true)
    setEvaluationFeedback(null)
    setCandidateAnswer('')
    try {
      const q = await onFetchQuestion(lab.title, userCode)
      setQuestionData(q)
    } finally {
      setIsLoadingQuestion(false)
    }
  }

  const handleSubmitAnswer = async (e) => {
    e.preventDefault()
    if (!candidateAnswer.trim() || !questionData) return
    setIsSubmittingAnswer(true)
    try {
      const result = await onEvaluateAnswer(questionData.question, candidateAnswer)
      setEvaluationFeedback(result)
    } finally {
      setIsSubmittingAnswer(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#121829] border border-slate-700/80 w-full max-w-2xl rounded-2xl p-6 lg:p-8 shadow-2xl relative max-h-[90vh] flex flex-col">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
            <MessageSquareCode className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span>AI Mock Technical Interview</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Principal Bar-Raiser
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Test your conceptual depth, Big-O trade-offs, and cloud scalability on your solved solution.
            </p>
          </div>
        </div>

        {/* Start Interview Prompt or Active Session */}
        {!questionData ? (
          <div className="py-8 text-center my-auto flex flex-col items-center justify-center">
            <Bot className="w-12 h-12 text-purple-400 mb-3" />
            <h3 className="text-base font-bold text-white mb-1">
              Interview Topic: {lab?.title || "Agent Code Architecture"}
            </h3>
            <p className="text-xs text-slate-400 max-w-md mb-6">
              Our Principal Architect Agent will inspect your code implementation and ask a real-world system design and complexity question.
            </p>
            <button
              onClick={handleStartInterview}
              disabled={isLoadingQuestion}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-purple-500/25 flex items-center gap-2 transition disabled:opacity-50"
            >
              {isLoadingQuestion ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Preparing Socratic Question...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Begin Mock Interview</span>
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto space-y-4 pr-1">
            
            {/* Interviewer Question Box */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-purple-300 flex items-center gap-1.5">
                  <Bot className="w-4 h-4 text-purple-400" />
                  {questionData.interviewer_name || "Alex Vance (Principal Architect)"}
                </span>
                <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                  Topic: {questionData.topic}
                </span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-medium">
                "{questionData.question}"
              </p>
            </div>

            {/* Answer Submission Form */}
            {!evaluationFeedback ? (
              <form onSubmit={handleSubmitAnswer} className="space-y-3">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-brand-400" />
                    Your Answer
                  </label>
                  <textarea
                    rows={4}
                    value={candidateAnswer}
                    onChange={(e) => setCandidateAnswer(e.target.value)}
                    placeholder="Explain your approach, architectural trade-offs, Big-O complexity, and AWS cloud scalability considerations..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-purple-500"
                    disabled={isSubmittingAnswer}
                  />
                </div>

                <div className="flex items-center justify-end gap-2">
                  <button
                    type="submit"
                    disabled={isSubmittingAnswer || !candidateAnswer.trim()}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-purple-500/20 flex items-center gap-1.5 transition disabled:opacity-50"
                  >
                    {isSubmittingAnswer ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Evaluating Response...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Answer</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4 animate-in fade-in duration-300">
                
                {/* Result Card */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-900 border border-purple-500/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      Verdict: {evaluationFeedback.verdict}
                    </span>
                    <span className="text-sm font-bold text-amber-300">
                      Score: {evaluationFeedback.score}/100
                    </span>
                  </div>

                  <p className="text-xs text-slate-200">
                    {evaluationFeedback.feedback}
                  </p>

                  {evaluationFeedback.architectural_tip && (
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-amber-200">
                      <span className="font-bold text-amber-400 block mb-0.5">💡 Architect Tip</span>
                      {evaluationFeedback.architectural_tip}
                    </div>
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleStartInterview}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
                  >
                    Try Another Question
                  </button>
                </div>

              </div>
            )}

          </div>
        )}

      </div>
    </div>
  )
}
