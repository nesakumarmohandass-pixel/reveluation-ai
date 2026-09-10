import React, { useState } from 'react'
import { Sparkles, Check, X, Shield, Zap, Lock, Loader2 } from 'lucide-react'

export default function PricingModal({ isOpen, onClose, onUpgrade, isUpgrading, currentTier }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#121829] border border-slate-700/80 w-full max-w-3xl rounded-2xl p-6 lg:p-8 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="text-center max-w-lg mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SaaS Monetization Engine</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
            Accelerate Your Technical Career
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Choose the plan that fits your ambition. From foundational roadmaps to autonomous GitHub portfolio dispatch.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Free Tier */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Starter Learner</h3>
                  <p className="text-xs text-slate-400">For beginners exploring agentic AI</p>
                </div>
                <span className="text-xl font-bold text-slate-200">$0</span>
              </div>

              <div className="text-xs text-slate-400 font-semibold mb-3">Includes:</div>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100 Free Monthly Credits</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>1 Active Adaptive Curriculum</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Standard Sandboxed Code Execution</span>
                </li>
                <li className="flex items-center gap-2 text-slate-500 line-through">
                  <X className="w-4 h-4 text-slate-600 shrink-0" />
                  <span>1-Click GitHub Repository Dispatch</span>
                </li>
                <li className="flex items-center gap-2 text-slate-500 line-through">
                  <X className="w-4 h-4 text-slate-600 shrink-0" />
                  <span>AI Mock Technical Interviewer</span>
                </li>
                <li className="flex items-center gap-2 text-slate-500 line-through">
                  <X className="w-4 h-4 text-slate-600 shrink-0" />
                  <span>Verified PDF Skill Certificate</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <button
                disabled={currentTier === 'free'}
                className="w-full py-2.5 rounded-xl bg-slate-800 text-slate-400 text-xs font-bold cursor-default"
              >
                {currentTier === 'free' ? 'Current Plan' : 'Free Tier'}
              </button>
            </div>
          </div>

          {/* Pro Accelerator Tier */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-brand-900/30 via-slate-900/90 to-slate-900 border-2 border-brand-500/60 flex flex-col justify-between relative shadow-xl shadow-brand-500/10">
            
            <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-gradient-to-r from-brand-500 to-indigo-500 text-white text-[10px] font-extrabold uppercase tracking-wider shadow">
              Most Popular
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-1.5">
                    <span>Career Accelerator</span>
                    <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400" />
                  </h3>
                  <p className="text-xs text-slate-400">For serious engineers & job seekers</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-white">$19</span>
                  <span className="text-xs text-slate-400">/mo</span>
                </div>
              </div>

              <div className="text-xs text-brand-300 font-semibold mb-3">Everything in Free, plus:</div>
              <ul className="space-y-2.5 text-xs text-slate-200">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-brand-400 shrink-0" />
                  <span className="font-semibold text-white">Unlimited Autonomous Lab Generations</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-brand-400 shrink-0" />
                  <span>High-Speed AWS Bedrock Compute</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-brand-400 shrink-0" />
                  <span className="font-semibold text-white">1-Click GitHub Repository Scaffolding</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-brand-400 shrink-0" />
                  <span>AI Mock Technical Interviewer (Alex Vance)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-brand-400 shrink-0" />
                  <span>Timestamped Digital Certificate of Mastery</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <button
                onClick={onUpgrade}
                disabled={isUpgrading || currentTier === 'pro'}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 hover:from-brand-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 transition active:scale-95 disabled:opacity-50"
              >
                {isUpgrading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing Subscription...</span>
                  </>
                ) : currentTier === 'pro' ? (
                  <span>Active Pro Subscription</span>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-white" />
                    <span>Upgrade to Pro ($19/mo)</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

        <p className="text-[11px] text-center text-slate-500 mt-6">
          🔒 Secure simulated Stripe payment gateway • Cancel anytime with 1 click.
        </p>

      </div>
    </div>
  )
}
