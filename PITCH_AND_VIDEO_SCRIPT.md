# 🎬 Reveluation AI — Official Video Pitch & Demo Script
**Target Duration:** ~3:30 – 4:00 Minutes (Max Limit: 5 Minutes)  
**Video Upload Platform:** YouTube / Vimeo (Set to Public)  
**Format:** Screen Recording + Voiceover (No on-camera face required)

---

## ⏱️ Video Structure & Timestamps

```
[0:00 - 0:45] ──► Section 1: The Pitch (Problem, Target Audience, Why it Matters)
[0:45 - 1:15] ──► Section 2: Architecture & AWS Bedrock / Strands Agents
[1:15 - 3:00] ──► Section 3: Live End-to-End Demo Walkthrough
[3:00 - 3:30] ──► Section 4: Monetization SaaS MVP & AI Mock Interviewer
[3:30 - 3:50] ──► Section 5: Closing & AWS Hackathon Submission
```

---

## 🎙️ Complete Scene-by-Scene Script

### 📍 Scene 1: The Hook & Pitch (0:00 – 0:45)
**🖥️ Visual on Screen:** Show the [README.md](file:///c:/Users/NESAKUMAR/OneDrive/Desktop/Samuel%20br/Final/Agents%20for%20Humans%20Hackathon/README.md) or the landing view of the **Reveluation AI** Web Studio (`http://localhost:5173`).

**🗣️ Voiceover:**
> *"Hello judges! Welcome to **Reveluation AI** — the Universal Autonomous Learning & Real-Time Evaluation Engine, built for the **AWS Agents for Humans Hackathon**.*
>
> *(1) **The Problem:** Over 80% of self-learners and developers upskilling in cloud and AI get trapped in 'Tutorial Hell'. They watch hours of passive videos without building real, verified skills. Existing AI tutors are just conversational chatbots—they answer questions, but they can't execute code, run tests, diagnose stack traces, or build verified portfolios.*
>
> *(2) **Who It’s For:** Reveluation AI is built for career switchers, STEM students, and professional engineers who need hands-on, accelerated mastery without paying \$15,000 for private bootcamps.*
>
> *(3) **Why It Matters:** We shift AI education from passive chat to active, end-to-end execution. Reveluation AI plans runnable curriculums, tests your code inside an isolated sandbox, dynamically heals knowledge gaps, and automatically exports production-ready GitHub repositories."*

---

### 📍 Scene 2: The Architecture & AWS Stack (0:45 – 1:15)
**🖥️ Visual on Screen:** Show the [ARCHITECTURE.md](file:///c:/Users/NESAKUMAR/OneDrive/Desktop/Samuel%20br/Final/Agents%20for%20Humans%20Hackathon/ARCHITECTURE.md) diagram or Mermaid chart.

**🗣️ Voiceover:**
> *"Under the hood, Reveluation AI utilizes a multi-agent topology orchestrated by the **Strands Agents SDK** and powered by **Amazon Bedrock** with Claude 3.5 Sonnet.*
>
> *Our architecture separates responsibilities across specialized agents:*
> * *The **Curriculum Planner Agent** transforms raw goals or syllabi into structured micro-sprints.*
> * *The **Diagnostic Evaluator Agent** runs user solutions in a sandboxed runtime and performs line-by-line trace analysis.*
> * *The **Portfolio Agent** packages solved labs into deployable GitHub repositories.*
> * *And the **Mock Interviewer Agent** acts as a Principal Architect bar-raiser testing conceptual depth.*
>
> *Let’s see it in action live!"*

---

### 📍 Scene 3: Live End-to-End Demo (1:15 – 3:00)
**🖥️ Visual on Screen:** Switch to the live web application in browser.

**Action 1: Goal Generation**
* Click **"Switch Goal / Track"** or open the Onboarding modal.
* Select the preset: *"AWS Bedrock AgentCore & Strands Orchestrator"* (or type a custom goal).
* Click **"Generate Autonomous Labs"**.

**🗣️ Voiceover:**
> *"Here in the Studio, we can define any learning goal or choose a curated track. When I click generate, the Strands Curriculum Agent plans an adaptive roadmap with concrete milestones and runnable Python coding labs."*

**Action 2: Code Editor & Sandboxed Test Execution**
* Click on **"Lab 1.1: Building a Tool-Calling Strands Agent"**.
* Show the problem instructions, guidelines, and automated test assertions.
* In the Monaco code editor, deliberately write an incomplete function (e.g. `pass`) and click **"Run & Test Solution"**.

**🗣️ Voiceover:**
> *"Let’s dive into Lab 1. Notice the split-screen studio with a full Monaco code editor. If I run an incomplete solution, our agent captures the failure in the sandbox, analyzes the stack trace, and provides constructive diagnostic feedback and an adaptive hint without spoiling the answer."*

**Action 3: Passing the Solution & Celebration**
* Complete the code:
```python
def agent_tool_calculator(operation: str, a: float, b: float) -> dict:
    if operation == 'add': return {'result': a + b}
    if operation == 'subtract': return {'result': a - b}
    if operation == 'multiply': return {'result': a * b}
    if operation == 'divide':
        if b == 0: return {'error': 'Zero division'}
        return {'result': a / b}
    return {'error': 'Unsupported operation'}
```
* Click **"Run & Test Solution"**.
* Confetti triggers 🎉. Diagnostic shows **100/100 Test Pass Rate**.

**🗣️ Voiceover:**
> *"Now I’ll implement the complete handler with zero-division handling and hit Run. The agent executes the test suite in real time, verifies all assertions, and awards 100% mastery!"*

---

### 📍 Scene 4: Portfolio Dispatch & SaaS Monetization (3:00 – 3:30)
**🖥️ Visual on Screen:** Click on the **"Portfolio & Cert"** button in the header.

**🗣️ Voiceover:**
> *"Once milestones are completed, the learner doesn't just get a badge—they click **'Portfolio & Cert'**, and our Portfolio Agent autonomously scaffolds a multi-file GitHub repository with documentation, tests, and a cryptographically verified Digital Certificate of Competency.*
>
> *For monetization, Reveluation AI is built as a sustainable SaaS MVP with a Freemium credit ledger, a \$19/month Pro Career Accelerator tier, and a dedicated **'Judge Review Mode'** toggle ensuring hackathon evaluators test everything with zero limits."*

---

### 📍 Scene 5: Conclusion & Wrap-Up (3:30 – 3:50)
**🖥️ Visual on Screen:** Show the header / GitHub repository with the **MIT License** and **Amazon Bedrock / Strands badges**.

**🗣️ Voiceover:**
> *"Reveluation AI proves that agents for humans must do real work: planning, executing, evaluating, and delivering tangible proof of mastery.*
>
> *Thank you AWS and Devpost judges! We look forward to your feedback!"*

---

## 🎥 Recording Tips:
1. **Screen Resolution:** Record in **1080p (1920x1080)** for crisp text.
2. **Audio:** Use a clean microphone or headset; speak clearly at a natural, energetic pace.
3. **Screen Tool:** You can use free tools like **OBS Studio**, **Loom**, or the built-in Windows Game Bar (`Win + G`).
4. **Duration Check:** Keep the total recording under 4 minutes to ensure judges watch the entire video!
