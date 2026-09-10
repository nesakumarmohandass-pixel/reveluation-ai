import React, { useState, useEffect } from 'react'
import Editor from '@monaco-editor/react'
import confetti from 'canvas-confetti'
import { Play, CheckCircle2, AlertTriangle, Terminal, Cpu, Sparkles, Loader2, RefreshCw, HelpCircle, ArrowRight, MessageSquareCode } from 'lucide-react'

export default function SandboxStudio({ lab, onEvaluate, isEvaluating, evaluationResult, onStartInterview }) {
  const [code, setCode] = useState(lab?.starter_code || '')
  const [activeTab, setActiveTab] = useState('instructions') // 'instructions' | 'tests' | 'diagnostics'

  useEffect(() => {
    if (lab) {
      setCode(lab.starter_code || '')
    }
  }, [lab])

  useEffect(() => {
    if (evaluationResult?.evaluation?.passed) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      })
    }
  }, [evaluationResult])

  if (!lab) {
    return (
      <div className="bg-[#121829] border border-slate-800 rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[500px]">
        <Cpu className="w-12 h-12 text-slate-600 mb-4" />
        <h3 className="text-lg font-bold text-slate-300 mb-1">Select a Lab to Enter the Studio</h3>
        <p className="text-sm text-slate-500 max-w-md">
          Choose any active lab from the curriculum roadmap to begin coding with the Reveluation AI Diagnostic Evaluator.
        </p>
      </div>
    )
  }

  const handleRun = () => {
    onEvaluate(lab.id, lab.title, code, lab.test_code)
  }

  const handleReset = () => {
    setCode(lab.starter_code || '')
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 min-h-[620px]">
      
      {/* Left Column: Problem Instructions & Specifications (4 cols) */}
      <div className="lg:col-span-5 bg-[#121829] border border-slate-800 rounded-2xl flex flex-col overflow-hidden shadow-xl">
        
        {/* Lab Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-400">
              Interactive Lab
            </span>
            <h3 className="text-base font-bold text-white line-clamp-1">
              {lab.title}
            </h3>
          </div>
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
            {lab.language || 'python'}
          </span>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-800 text-xs font-semibold bg-slate-950/40">
          <button
            onClick={() => setActiveTab('instructions')}
            className={`flex-1 py-2.5 px-3 border-b-2 transition ${
              activeTab === 'instructions'
                ? 'border-brand-500 text-white bg-brand-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Instructions
          </button>
          <button
            onClick={() => setActiveTab('tests')}
            className={`flex-1 py-2.5 px-3 border-b-2 transition ${
              activeTab === 'tests'
                ? 'border-brand-500 text-white bg-brand-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Test Suite
          </button>
          <button
            onClick={() => setActiveTab('diagnostics')}
            className={`flex-1 py-2.5 px-3 border-b-2 transition relative ${
              activeTab === 'diagnostics'
                ? 'border-brand-500 text-white bg-brand-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            AI Diagnostics
            {evaluationResult && (
              <span className={`w-2 h-2 rounded-full absolute top-2.5 right-2 ${
                evaluationResult.evaluation?.passed ? 'bg-emerald-400' : 'bg-red-400'
              }`} />
            )}
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-4 flex-1 overflow-y-auto space-y-4 text-sm">
          {activeTab === 'instructions' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase text-slate-400 mb-1">Objective</h4>
                <p className="text-slate-200 text-xs leading-relaxed">
                  {lab.summary}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase text-slate-400 mb-1">Specifications & Guidelines</h4>
                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed">
                  {lab.instructions}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-400 shrink-0" />
                <span>Tip: Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200 font-mono text-[10px]">Ctrl+Enter</kbd> inside the editor to execute tests.</span>
              </div>
            </div>
          )}

          {activeTab === 'tests' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-400">
                Automated test assertions evaluated in the isolated Strands sandbox:
              </p>
              
              {/* If evaluated, show individual test case results */}
              {evaluationResult?.sandbox_result?.test_cases && (
                <div className="space-y-1.5 mb-3">
                  {evaluationResult.sandbox_result.test_cases.map((tc) => (
                    <div key={tc.id} className={`p-2.5 rounded-lg border text-xs flex items-center justify-between ${
                      tc.passed ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-300' : 'bg-red-500/10 border-red-500/25 text-red-300'
                    }`}>
                      <span className="font-semibold">{tc.name}</span>
                      <span className="font-bold text-[10px] uppercase px-1.5 py-0.5 rounded bg-slate-900/80">
                        {tc.passed ? 'PASSED' : 'FAILED'}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto">
                {lab.test_code}
              </pre>
            </div>
          )}

          {activeTab === 'diagnostics' && (
            <div className="space-y-3">
              {!evaluationResult ? (
                <div className="text-center py-8 text-xs text-slate-500">
                  Run your code to see the Strands Agent diagnostic evaluation here.
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Status Banner */}
                  <div className={`p-3.5 rounded-xl border flex items-start gap-3 ${
                    evaluationResult.evaluation?.passed
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      : 'bg-red-500/10 border-red-500/30 text-red-300'
                  }`}>
                    {evaluationResult.evaluation?.passed ? (
                      <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <h4 className="text-xs font-bold">
                        {evaluationResult.evaluation?.passed ? 'All Assertions Passed (Score: 100/100)' : `Test Failed (Score: ${evaluationResult.evaluation?.score || 40}/100)`}
                      </h4>
                      <p className="text-xs mt-0.5 opacity-90">
                        {evaluationResult.evaluation?.summary}
                      </p>
                    </div>
                  </div>

                  {/* Agent Diagnostic Steps */}
                  {evaluationResult.evaluation?.diagnostic_steps && (
                    <div>
                      <h5 className="text-[11px] font-bold uppercase text-slate-400 mb-1.5 flex items-center gap-1">
                        <Cpu className="w-3.5 h-3.5 text-brand-400" />
                        Agent Diagnostic Steps
                      </h5>
                      <ul className="space-y-1.5 pl-2">
                        {evaluationResult.evaluation.diagnostic_steps.map((step, idx) => (
                          <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                            <span className="text-brand-400 font-bold">•</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Conceptual Hint */}
                  {evaluationResult.evaluation?.conceptual_hint && (
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs">
                      <div className="flex items-center gap-1.5 font-bold mb-1 text-amber-300">
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>Adaptive Agent Hint</span>
                      </div>
                      <p>{evaluationResult.evaluation.conceptual_hint}</p>
                    </div>
                  )}

                  {/* Self-Healing Alert if failed */}
                  {!evaluationResult.evaluation?.passed && (
                    <div className="p-3 rounded-xl bg-brand-500/10 border border-brand-500/30 text-xs text-brand-300 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-brand-400 shrink-0" />
                        <span>Self-Healing Agent activated: Guided hints injected above.</span>
                      </div>
                    </div>
                  )}

                  {/* Pro Interview CTA if passed */}
                  {evaluationResult.evaluation?.passed && (
                    <div className="pt-2">
                      <button
                        onClick={() => onStartInterview(lab, code)}
                        className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-purple-500/20 transition active:scale-95"
                      >
                        <MessageSquareCode className="w-4 h-4" />
                        <span>Conduct AI Mock Tech Interview on this Code</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Live Agent Thought Stream */}
        {evaluationResult?.agent_thoughts && (
          <div className="p-3 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-400 font-mono flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-brand-400 animate-pulse shrink-0" />
            <span className="truncate">
              Strands Agent: {evaluationResult.agent_thoughts[evaluationResult.agent_thoughts.length - 1]}
            </span>
          </div>
        )}

      </div>

      {/* Right Column: Monaco Editor & Output Runner (7 cols) */}
      <div className="lg:col-span-7 bg-[#121829] border border-slate-800 rounded-2xl flex flex-col overflow-hidden shadow-xl">
        
        {/* Editor Toolbar */}
        <div className="p-3 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-brand-400" />
            <span className="text-xs font-bold text-slate-200">
              solution.{lab.language === 'javascript' ? 'js' : 'py'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-xs flex items-center gap-1 transition"
              title="Reset starter boilerplate"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>

            <button
              onClick={handleRun}
              disabled={isEvaluating}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md shadow-emerald-500/20 flex items-center gap-1.5 transition disabled:opacity-50 active:scale-95"
            >
              {isEvaluating ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Evaluating with Bedrock...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Run & Test Solution</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Monaco Code Editor */}
        <div className="flex-1 min-h-[380px] bg-[#1e1e1e]">
          <Editor
            height="100%"
            language={lab.language || "python"}
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value || '')}
            options={{
              minimap: { enabled: false },
              fontSize: 13,
              fontFamily: "'JetBrains Mono', monospace",
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 4
            }}
          />
        </div>

        {/* Console Stdout / Stderr Box */}
        {evaluationResult?.sandbox_result && (
          <div className="p-3 bg-slate-950 border-t border-slate-800 max-h-36 overflow-y-auto font-mono text-xs">
            <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
              <span>SANDBOX TERMINAL OUTPUT ({evaluationResult.sandbox_result.duration_ms}ms)</span>
              <span className={evaluationResult.sandbox_result.success ? "text-emerald-400" : "text-red-400"}>
                {evaluationResult.sandbox_result.success ? "EXIT 0" : "EXIT 1"}
              </span>
            </div>
            {evaluationResult.sandbox_result.stdout && (
              <div className="text-slate-300 whitespace-pre-wrap">
                {evaluationResult.sandbox_result.stdout}
              </div>
            )}
            {evaluationResult.sandbox_result.error && (
              <div className="text-red-400 whitespace-pre-wrap">
                {evaluationResult.sandbox_result.error.traceback || evaluationResult.sandbox_result.error.message}
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  )
}
