import React from 'react'
import { Zap, ShieldCheck, Sparkles, Award, PlayCircle, Lock } from 'lucide-react'

export default function Header({ userStatus, onToggleJudgeMode, onOpenPricing, onOpenPortfolio, onNewGoal, completedCount }) {
  return (
    <header className="border-b border-slate-800/80 bg-[#0f1422]/90 backdrop-blur sticky top-0 z-40 px-4 lg:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={onNewGoal}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-500 to-purple-400 flex items-center justify-center shadow-lg shadow-brand-500/20">
            <Zap className="w-5 h-5 text-white fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                Reveluation<span className="text-brand-400">.AI</span>
              </span>
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-300 border border-brand-500/30">
                AWS Hackathon Edition
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Universal Autonomous Learning & Real-Time Evaluation Engine
            </p>
          </div>
        </div>

        {/* Actions & SaaS Metering */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          
          {/* Judge / Hackathon Demo Mode Toggle */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/60 text-xs">
            <ShieldCheck className={`w-4 h-4 ${userStatus?.judge_mode ? 'text-emerald-400' : 'text-slate-400'}`} />
            <span className="text-slate-300">Judge Mode:</span>
            <button
              onClick={() => onToggleJudgeMode(!userStatus?.judge_mode)}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${
                userStatus?.judge_mode 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {userStatus?.judge_mode ? 'ON (Unlimited)' : 'OFF'}
            </button>
          </div>

          {/* Credits Counter */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-400">Credits:</span>
            <span className="font-mono font-bold text-amber-300">
              {userStatus?.tier === 'pro' || userStatus?.judge_mode ? '∞' : userStatus?.credits || 0}
            </span>
          </div>

          {/* Portfolio & Certificate Button */}
          <button
            onClick={onOpenPortfolio}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition"
          >
            <Award className="w-3.5 h-3.5 text-brand-400" />
            <span className="hidden sm:inline">Portfolio & Cert</span>
            {completedCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-brand-500 text-white text-[10px] flex items-center justify-center font-bold">
                {completedCount}
              </span>
            )}
          </button>

          {/* Upgrade to Pro / Tier Badge */}
          {userStatus?.tier === 'pro' ? (
            <div className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500/20 to-purple-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 fill-amber-400" />
              <span>PRO ACCELERATOR</span>
            </div>
          ) : (
            <button
              onClick={onOpenPricing}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-brand-500/20 transition active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Upgrade Pro</span>
            </button>
          )}

        </div>

      </div>
    </header>
  )
}
