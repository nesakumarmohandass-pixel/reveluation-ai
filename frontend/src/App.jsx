import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import OnboardingModal from './components/OnboardingModal'
import RoadmapView from './components/RoadmapView'
import SandboxStudio from './components/SandboxStudio'
import PricingModal from './components/PricingModal'
import PortfolioModal from './components/PortfolioModal'
import MockInterviewModal from './components/MockInterviewModal'
import { Sparkles, Terminal, Rocket, CheckCircle2, Award, Zap, BookOpen, Layers } from 'lucide-react'

const DEFAULT_ROADMAP = {
  "roadmap_title": "Mastering AWS Bedrock AgentCore & Strands Agent Orchestration",
  "estimated_duration": "7 Days (Micro-Sprints)",
  "difficulty": "Intermediate",
  "target_skills": ["AWS Bedrock", "Strands Agents SDK", "Tool Invocation", "Self-Healing State", "Sandboxed Execution"],
  "milestones": [
    {
      "id": "m1",
      "title": "Milestone 1: Strands Agent Core & Autonomous Tool Definitions",
      "description": "Learn to define agent tools, schema validation, and structured JSON output loops.",
      "labs": [
        {
          "id": "lab-101",
          "title": "Lab 1.1: Building a Tool-Calling Strands Agent",
          "summary": "Implement a Python agent that validates input parameters and executes a mathematical computation tool.",
          "difficulty": "Beginner",
          "language": "python",
          "starter_code": "def agent_tool_calculator(operation: str, a: float, b: float) -> dict:\n    # Implement mathematical execution logic\n    # Supported operations: 'add', 'subtract', 'multiply', 'divide'\n    pass\n",
          "instructions": "Complete `agent_tool_calculator` to safely handle 'add', 'subtract', 'multiply', and 'divide'. Include zero-division protection.",
          "test_code": "assert agent_tool_calculator('add', 5, 3)['result'] == 8\nassert agent_tool_calculator('divide', 10, 2)['result'] == 5\nassert 'error' in agent_tool_calculator('divide', 5, 0)\n"
        }
      ]
    },
    {
      "id": "m2",
      "title": "Milestone 2: Bedrock AgentCore & Prompt Chaining",
      "description": "Construct multi-turn reasoning loops that pass context dynamically between agents.",
      "labs": [
        {
          "id": "lab-102",
          "title": "Lab 2.1: Multi-Turn Context Memory Manager",
          "summary": "Build a sliding-window conversational memory manager for agent state tracking.",
          "difficulty": "Intermediate",
          "language": "python",
          "starter_code": "class AgentMemory:\n    def __init__(self, max_turns: int = 5):\n        self.max_turns = max_turns\n        self.history = []\n\n    def add_turn(self, role: str, content: str):\n        # Store turn and maintain sliding window\n        pass\n\n    def get_context_window(self) -> list:\n        # Return formatted messages\n        return self.history\n",
          "instructions": "Ensure `add_turn` only keeps the latest `max_turns` messages.",
          "test_code": "mem = AgentMemory(max_turns=2)\nmem.add_turn('user', 'hello')\nmem.add_turn('assistant', 'hi')\nmem.add_turn('user', 'what is cloud?')\nassert len(mem.get_context_window()) == 2\nassert mem.get_context_window()[0]['content'] == 'hi'\n"
        }
      ]
    },
    {
      "id": "m3",
      "title": "Milestone 3: Autonomous Diagnostic Evaluation & GitHub Portfolio Assembly",
      "description": "Create automated test evaluation pipelines and package production artifacts.",
      "labs": [
        {
          "id": "lab-103",
          "title": "Lab 3.1: Autonomous Error Stack Trace Parser",
          "summary": "Parse raw traceback strings and extract offending line numbers and error types.",
          "difficulty": "Advanced",
          "language": "python",
          "starter_code": "def parse_agent_traceback(tb_string: str) -> dict:\n    # Extract error_type and line_number from traceback\n    return {'error_type': 'Unknown', 'line': 0}\n",
          "instructions": "Parse Python tracebacks to return `{'error_type': 'ZeroDivisionError', 'line': 14}`.",
          "test_code": "sample_tb = '''Traceback (most recent call last):\\n  File \"script.py\", line 14, in <module>\\nZeroDivisionError: division by zero'''\nres = parse_agent_traceback(sample_tb)\nassert res['error_type'] == 'ZeroDivisionError'\nassert res['line'] == 14\n"
        }
      ]
    }
  ]
}

export default function App() {
  const [userStatus, setUserStatus] = useState({
    user_id: 'demo-user',
    tier: 'free',
    credits: 100,
    credits_used: 0,
    judge_mode: true,
    features: {
      dynamic_roadmaps: true,
      standard_evaluator: true,
      unlimited_runs: true,
      github_portfolio_export: true,
      ai_mock_interviewer: true,
      verified_certificate: true
    }
  })

  const [roadmap, setRoadmap] = useState(DEFAULT_ROADMAP)
  const [activeLab, setActiveLab] = useState(DEFAULT_ROADMAP.milestones[0].labs[0])
  const [completedLabs, setCompletedLabs] = useState([])
  const [evaluationResult, setEvaluationResult] = useState(null)

  // Loading States
  const [isGeneratingRoadmap, setIsGeneratingRoadmap] = useState(false)
  const [isEvaluating, setIsEvaluating] = useState(false)
  const [isUpgrading, setIsUpgrading] = useState(false)
  const [isAssemblingPortfolio, setIsAssemblingPortfolio] = useState(false)

  // Modals
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false)
  const [isPricingOpen, setIsPricingOpen] = useState(false)
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false)
  const [isInterviewOpen, setIsInterviewOpen] = useState(false)
  const [interviewLabData, setInterviewLabData] = useState(null)
  const [portfolioData, setPortfolioData] = useState(null)

  useEffect(() => {
    fetchUserStatus()
  }, [])

  const fetchUserStatus = async () => {
    try {
      const res = await fetch('/api/user/status')
      if (res.ok) {
        const data = await res.json()
        setUserStatus(data)
      }
    } catch (e) {
      console.log('Using local client status fallback:', e)
    }
  }

  const handleToggleJudgeMode = async (enabled) => {
    try {
      const res = await fetch('/api/user/judge-mode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled })
      })
      if (res.ok) {
        const data = await res.json()
        setUserStatus(data.user)
      }
    } catch (e) {
      setUserStatus(prev => ({ ...prev, judge_mode: enabled }))
    }
  }

  const handleUpgradeToPro = async () => {
    setIsUpgrading(true)
    try {
      const res = await fetch('/api/user/upgrade-pro', { method: 'POST' })
      if (res.ok) {
        const data = await res.json()
        setUserStatus(data.user)
        setIsPricingOpen(false)
      }
    } catch (e) {
      setUserStatus(prev => ({ ...prev, tier: 'pro', credits: 999999 }))
      setIsPricingOpen(false)
    } finally {
      setIsUpgrading(false)
    }
  }

  const handleGenerateRoadmap = async (goal, experience_level, duration_days) => {
    setIsGeneratingRoadmap(true)
    try {
      const res = await fetch('/api/curriculum/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goal, experience_level, duration_days })
      })
      if (res.ok) {
        const data = await res.json()
        setRoadmap(data.roadmap)
        if (data.user_status) setUserStatus(data.user_status)
        // Select first lab automatically
        if (data.roadmap?.milestones?.[0]?.labs?.[0]) {
          setActiveLab(data.roadmap.milestones[0].labs[0])
          setEvaluationResult(null)
        }
        setIsOnboardingOpen(false)
      }
    } catch (e) {
      console.error('Roadmap generation error:', e)
    } finally {
      setIsGeneratingRoadmap(false)
    }
  }

  const handleEvaluateCode = async (lab_id, lab_title, user_code, test_code) => {
    setIsEvaluating(true)
    try {
      const res = await fetch('/api/sandbox/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lab_id, lab_title, user_code, test_code })
      })
      if (res.ok) {
        const data = await res.json()
        setEvaluationResult(data.result)
        if (data.user_status) setUserStatus(data.user_status)

        // If passed, mark as completed
        if (data.result?.evaluation?.passed) {
          if (!completedLabs.some(l => l.id === lab_id)) {
            setCompletedLabs(prev => [...prev, {
              id: lab_id,
              title: lab_title,
              summary: activeLab?.summary || '',
              user_code
            }])
          }
        }
      }
    } catch (e) {
      console.error('Code evaluation error:', e)
    } finally {
      setIsEvaluating(false)
    }
  }

  const handleAssemblePortfolio = async () => {
    setIsAssemblingPortfolio(true)
    try {
      const res = await fetch('/api/portfolio/assemble', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roadmap_title: roadmap?.roadmap_title || 'Autonomous Agent Mastery',
          completed_labs: completedLabs,
          learner_name: 'Alex Vance (Engineer)'
        })
      })
      if (res.ok) {
        const data = await res.json()
        setPortfolioData(data)
      }
    } catch (e) {
      console.error('Portfolio assembly error:', e)
    } finally {
      setIsAssemblingPortfolio(false)
    }
  }

  const handleOpenInterview = (lab, user_code) => {
    setInterviewLabData({ lab, user_code })
    setIsInterviewOpen(true)
  }

  const handleFetchInterviewQuestion = async (topic, user_code) => {
    const res = await fetch('/api/interview/question', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, user_code })
    })
    return await res.json()
  }

  const handleEvaluateInterviewAnswer = async (question, candidate_answer) => {
    const res = await fetch('/api/interview/evaluate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, candidate_answer })
    })
    return await res.json()
  }

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Header */}
      <Header
        userStatus={userStatus}
        onToggleJudgeMode={handleToggleJudgeMode}
        onOpenPricing={() => setIsPricingOpen(true)}
        onOpenPortfolio={() => setIsPortfolioOpen(true)}
        onNewGoal={() => setIsOnboardingOpen(true)}
        completedCount={completedLabs.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6 space-y-6">
        
        {/* Top Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-[#121829] to-[#0f1424] border border-slate-800 p-4 rounded-2xl shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400">
              <Rocket className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-bold text-white tracking-tight">
                {roadmap ? roadmap.roadmap_title : "Loading Curriculum..."}
              </h1>
              <p className="text-xs text-slate-400">
                Strands Agents multi-agent planning & execution loop active
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOnboardingOpen(true)}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition active:scale-95 shadow"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
            <span>Switch Goal / Track</span>
          </button>
        </div>

        {/* Studio Workspace Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          
          {/* Left: Curriculum & Roadmap Tree (4 cols) */}
          <div className="xl:col-span-4">
            <RoadmapView
              roadmap={roadmap}
              activeLab={activeLab}
              onSelectLab={(lab) => {
                setActiveLab(lab)
                setEvaluationResult(null)
              }}
              completedLabIds={completedLabs.map(l => l.id)}
            />
          </div>

          {/* Right: Live Interactive Sandbox Studio (8 cols) */}
          <div className="xl:col-span-8">
            <SandboxStudio
              lab={activeLab}
              onEvaluate={handleEvaluateCode}
              isEvaluating={isEvaluating}
              evaluationResult={evaluationResult}
              onStartInterview={(lab, code) => handleOpenInterview(lab, code)}
            />
          </div>

        </div>

      </main>

      {/* Modals */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onGenerate={handleGenerateRoadmap}
        isGenerating={isGeneratingRoadmap}
      />

      <PricingModal
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
        onUpgrade={handleUpgradeToPro}
        isUpgrading={isUpgrading}
        currentTier={userStatus?.tier}
      />

      <PortfolioModal
        isOpen={isPortfolioOpen}
        onClose={() => setIsPortfolioOpen(false)}
        onAssemble={handleAssemblePortfolio}
        isAssembling={isAssemblingPortfolio}
        portfolioData={portfolioData}
        completedLabsCount={completedLabs.length}
      />

      {interviewLabData && (
        <MockInterviewModal
          isOpen={isInterviewOpen}
          onClose={() => setIsInterviewOpen(false)}
          lab={interviewLabData.lab}
          userCode={interviewLabData.userCode}
          onFetchQuestion={handleFetchInterviewQuestion}
          onEvaluateAnswer={handleEvaluateInterviewAnswer}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#0f1422] py-4 text-center text-xs text-slate-500">
        <p>
          Built for the <strong className="text-slate-300">AWS Agents for Humans Hackathon 2026</strong> • Powered by <strong className="text-brand-400">Strands Agents SDK</strong> & <strong className="text-amber-400">Amazon Bedrock</strong>
        </p>
      </footer>

    </div>
  )
}
