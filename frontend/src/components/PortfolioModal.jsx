import React, { useState } from 'react'
import { Award, Github, FileCode, CheckCircle2, Download, ExternalLink, X, ShieldCheck, Sparkles, Loader2 } from 'lucide-react'

export default function PortfolioModal({ isOpen, onClose, onAssemble, isAssembling, portfolioData, completedLabsCount }) {
  const [selectedFile, setSelectedFile] = useState('README.md')

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#121829] border border-slate-700/80 w-full max-w-4xl rounded-2xl p-6 lg:p-8 shadow-2xl relative max-h-[90vh] flex flex-col">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-brand-500/10 border border-brand-500/30 text-brand-400">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span>Verified Portfolio & Digital Credential</span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                Strands Automated
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Autonomous packaging of your completed code labs into a production-ready GitHub repository with verified certificates.
            </p>
          </div>
        </div>

        {/* If not assembled yet */}
        {!portfolioData ? (
          <div className="py-12 text-center flex flex-col items-center justify-center my-auto">
            <div className="w-16 h-16 rounded-2xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400 mb-4">
              <Github className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">
              Ready to Scaffold Your Production Portfolio
            </h3>
            <p className="text-xs text-slate-400 max-w-md mb-6">
              The Portfolio Agent will gather your solved labs ({completedLabsCount} completed), generate structured unit test files, package a documentation README, and create a verified digital certificate.
            </p>
            <button
              onClick={onAssemble}
              disabled={isAssembling || completedLabsCount === 0}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-brand-500/25 flex items-center gap-2 transition disabled:opacity-50"
            >
              {isAssembling ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Portfolio Agent Assembling Artifacts...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate GitHub Repository & Certificate</span>
                </>
              )}
            </button>
            {completedLabsCount === 0 && (
              <p className="text-[11px] text-amber-400/80 mt-2">
                ⚠️ Complete at least 1 lab in the studio to generate your portfolio package.
              </p>
            )}
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto space-y-6 pr-1">
            
            {/* Certificate Card */}
            {portfolioData.certificate && (
              <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-brand-950/40 to-slate-900 border border-brand-500/40 relative overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                      {portfolioData.certificate.verification_status}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    ID: {portfolioData.certificate.certificate_id}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-white mb-1">
                  {portfolioData.certificate.title}
                </h3>
                <p className="text-xs text-slate-300">
                  Awarded to <span className="font-bold text-brand-300">{portfolioData.certificate.recipient}</span> for demonstrating 100% test pass rate on automated cloud & agentic evaluations.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-slate-800 text-[11px]">
                  <div>
                    <span className="text-slate-500 block">Issued By</span>
                    <span className="text-slate-200 font-semibold">{portfolioData.certificate.issued_by}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Verification Authority</span>
                    <span className="text-slate-200 font-semibold">AWS Bedrock & Strands</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Timestamp</span>
                    <span className="text-slate-200 font-semibold">{portfolioData.certificate.issued_at}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Generated GitHub Repo Explorer */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Github className="w-4 h-4 text-brand-400" />
                  <span>Generated Repository Tree: {portfolioData.repository_name}</span>
                </h4>
                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{portfolioData.github_push_status}</span>
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 border border-slate-800 rounded-xl overflow-hidden bg-slate-950">
                {/* File Tree List */}
                <div className="md:col-span-4 bg-slate-900/80 p-2 border-r border-slate-800 space-y-1">
                  {Object.keys(portfolioData.files || {}).map((fileName) => (
                    <button
                      key={fileName}
                      onClick={() => setSelectedFile(fileName)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono flex items-center gap-2 transition ${
                        selectedFile === fileName
                          ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30 font-bold'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                      }`}
                    >
                      <FileCode className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{fileName}</span>
                    </button>
                  ))}
                </div>

                {/* File Content Preview */}
                <div className="md:col-span-8 p-3 max-h-72 overflow-y-auto">
                  <pre className="text-xs font-mono text-slate-300 whitespace-pre-wrap">
                    {portfolioData.files?.[selectedFile] || '// Select a file to view code contents'}
                  </pre>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  )
}
