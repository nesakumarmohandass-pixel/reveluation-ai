import React, { useState } from 'react'
import { Sparkles, Terminal, Rocket, BookOpen, Layers, ArrowRight, Loader2 } from 'lucide-react'

const PRESET_GOALS = [
  {
    title: "AWS Bedrock AgentCore & Strands Orchestrator",
    level: "Intermediate",
    days: 7,
    icon: Rocket,
    desc: "Build autonomous multi-agent tool loops, prompt chains, and self-healing error handlers on Amazon Bedrock."
  },
  {
    title: "Python Async & Cloud Microservices",
    level: "Advanced",
    days: 5,
    icon: Terminal,
    desc: "Master asynchronous IO, FastAPI event loops, connection pooling, and distributed error handling."
  },
  {
    title: "Full-Stack AI Engineer: RAG & Vector Embeddings",
    level: "Intermediate",
    days: 10,
    icon: Layers,
    desc: "Implement document chunking, semantic vector search, reranking, and dynamic context injection."
  }
]

export default function OnboardingModal({ isOpen, onClose, onGenerate, isGenerating }) {
  const [customGoal, setCustomGoal] = useState('')
  const [experienceLevel, setExperienceLevel] = useState('intermediate')
  const [durationDays, setDurationDays] = useState(7)

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!customGoal.trim()) return
    onGenerate(customGoal, experienceLevel, durationDays)
  }

  const handleSelectPreset = (preset) => {
    setCustomGoal(preset.title)
    setExperienceLevel(preset.level.toLowerCase())
    setDurationDays(preset.days)
    onGenerate(preset.title, preset.level.toLowerCase(), preset.days)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#121829] border border-slate-700/80 w-full max-w-2xl rounded-2xl p-6 lg:p-8 shadow-2xl relative overflow-hidden">
        
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-brand-500/10 border border-brand-500/30 text-brand-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              What skill do you want to master?
            </h2>
            <p className="text-sm text-slate-400">
              Reveluation AI will autonomously generate a customized, hands-on curriculum with runnable sandbox labs.
            </p>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="mb-6">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 block">
            Popular Learning Tracks (1-Click Start)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {PRESET_GOALS.map((preset, idx) => {
              const Icon = preset.icon
              return (
                <button
                  key={idx}
                  disabled={isGenerating}
                  onClick={() => handleSelectPreset(preset)}
                  className="text-left p-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-brand-500/50 transition flex flex-col justify-between group disabled:opacity-50"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Icon className="w-4 h-4 text-brand-400 group-hover:text-brand-300" />
                      <span className="text-[10px] font-semibold text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                        {preset.days}d
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-200 group-hover:text-white line-clamp-2 mb-1">
                      {preset.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-2">
                      {preset.desc}
                    </p>
                  </div>
                  <div className="mt-2 text-[10px] font-semibold text-brand-400 flex items-center gap-1">
                    <span>Start Track</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition" />
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Custom Goal Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">
              Or Define Your Custom Goal / Topic
            </label>
            <input
              type="text"
              placeholder="e.g. Master LangChain, Vector Databases, and Python Async APIs"
              value={customGoal}
              onChange={(e) => setCustomGoal(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-500 transition"
              disabled={isGenerating}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-400 mb-1 block">Experience Level</label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-sm focus:outline-none focus:border-brand-500"
                disabled={isGenerating}
              >
                <option value="beginner">Beginner (Foundations & Syntax)</option>
                <option value="intermediate">Intermediate (Real-World Patterns)</option>
                <option value="advanced">Advanced (High Scale & Systems)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 mb-1 block">Target Sprint Duration</label>
              <select
                value={durationDays}
                onChange={(e) => setDurationDays(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-sm focus:outline-none focus:border-brand-500"
                disabled={isGenerating}
              >
                <option value={3}>3 Days (Crash Course)</option>
                <option value={7}>7 Days (Standard Sprint)</option>
                <option value={14}>14 Days (Comprehensive Mastery)</option>
              </select>
            </div>
          </div>

          <div className="pt-3 flex items-center justify-end gap-3">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                disabled={isGenerating}
                className="px-4 py-2.5 text-sm font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={isGenerating || !customGoal.trim()}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-brand-500/20 flex items-center gap-2 transition disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Planning Multi-Agent Curriculum...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Autonomous Labs</span>
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}
