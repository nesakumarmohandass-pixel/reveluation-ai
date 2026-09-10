import React from 'react'
import { CheckCircle2, Circle, Play, Lock, Award, BookOpen, Clock, BarChart2 } from 'lucide-react'

export default function RoadmapView({ roadmap, activeLab, onSelectLab, completedLabIds }) {
  if (!roadmap) return null

  const totalLabs = roadmap.milestones.reduce((acc, m) => acc + m.labs.length, 0)
  const completedCount = completedLabIds.length
  const progressPercent = totalLabs > 0 ? Math.round((completedCount / totalLabs) * 100) : 0

  return (
    <div className="bg-[#121829] border border-slate-800 rounded-2xl p-5 lg:p-6 shadow-xl">
      
      {/* Roadmap Header */}
      <div className="border-b border-slate-800 pb-4 mb-5">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-brand-500/10 text-brand-300 border border-brand-500/30">
            {roadmap.difficulty || "Intermediate"} Track
          </span>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              {roadmap.estimated_duration || "7 Days"}
            </span>
            <span className="flex items-center gap-1 font-semibold text-slate-300">
              <BarChart2 className="w-3.5 h-3.5 text-brand-400" />
              {progressPercent}% Complete
            </span>
          </div>
        </div>

        <h2 className="text-xl font-bold text-white tracking-tight">
          {roadmap.roadmap_title}
        </h2>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-brand-500 to-indigo-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Target Skills Tags */}
      {roadmap.target_skills && roadmap.target_skills.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-5">
          {roadmap.target_skills.map((skill, idx) => (
            <span key={idx} className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-900 border border-slate-700/60 text-slate-300">
              #{skill}
            </span>
          ))}
        </div>
      )}

      {/* Milestones & Labs Tree */}
      <div className="space-y-6">
        {roadmap.milestones.map((milestone, mIdx) => (
          <div key={milestone.id || mIdx} className="space-y-2.5">
            
            {/* Milestone Header */}
            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-brand-400 mt-0.5 shrink-0">
                {mIdx + 1}
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-200">
                  {milestone.title}
                </h3>
                <p className="text-xs text-slate-400">
                  {milestone.description}
                </p>
              </div>
            </div>

            {/* Labs inside Milestone */}
            <div className="pl-8 space-y-2">
              {milestone.labs.map((lab) => {
                const isCompleted = completedLabIds.includes(lab.id)
                const isActive = activeLab?.id === lab.id

                return (
                  <button
                    key={lab.id}
                    onClick={() => onSelectLab(lab)}
                    className={`w-full text-left p-3 rounded-xl border transition flex items-center justify-between gap-3 group ${
                      isActive 
                        ? 'bg-brand-500/10 border-brand-500/60 shadow-md shadow-brand-500/10' 
                        : isCompleted
                          ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                          : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : isActive ? (
                        <Play className="w-4 h-4 text-brand-400 fill-brand-400 shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-600 shrink-0 group-hover:text-slate-400" />
                      )}
                      <div>
                        <h4 className={`text-xs font-semibold ${isActive ? 'text-white font-bold' : isCompleted ? 'text-slate-300' : 'text-slate-300 group-hover:text-white'}`}>
                          {lab.title}
                        </h4>
                        <p className="text-[11px] text-slate-400 line-clamp-1">
                          {lab.summary}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        lab.difficulty === 'Advanced' 
                          ? 'bg-red-500/10 text-red-300 border border-red-500/20' 
                          : lab.difficulty === 'Intermediate'
                            ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                            : 'bg-blue-500/10 text-blue-300 border border-blue-500/20'
                      }`}>
                        {lab.difficulty}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>

          </div>
        ))}
      </div>

    </div>
  )
}
