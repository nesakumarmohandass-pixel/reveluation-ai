# Agents for Humans: Architecting Strands Agents with Amazon Bedrock in Reveluation AI

**Published for:** AWS Agents for Humans Hackathon 2026  
**Track:** Everyday Agents & Professional Agents  
**Tags:** #AgentsforHumans #AWSBedrock #StrandsAgents #Architecture #MultiAgent

---

## 1. Why Strands Agents + Amazon Bedrock?

Building an autonomous agent that does real work requires three capabilities:
1. **High-Order Reasoning & Structured Planning:** Generating reliable schema-compliant labs and unit tests without hallucination.
2. **Deterministic Tool Execution:** Safely bridging LLM planning with physical code execution and state management.
3. **Low-Latency Streaming:** Providing the user with continuous visual visibility into the agent's thought process.

To achieve this, we paired the **Strands Agents SDK** with **Amazon Bedrock** (using Anthropic Claude 3.5 Sonnet and Meta Llama 3 models).

---

## 2. Multi-Agent Topology

Rather than relying on a monolithic prompt, Reveluation AI divides responsibilities across specialized, autonomous agents:

```
                          ┌──────────────────────────┐
                          │   Agent Orchestrator     │
                          └─────────────┬────────────┘
                                        │
           ┌────────────────────────────┼────────────────────────────┐
           │                            │                            │
           ▼                            ▼                            ▼
┌──────────────────────┐     ┌──────────────────────┐     ┌──────────────────────┐
│  Curriculum Planner  │     │ Real-Time Evaluator  │     │  Portfolio Assembler │
│        Agent         │     │        Agent         │     │        Agent         │
├──────────────────────┤     ├──────────────────────┤     ├──────────────────────┤
│ • Ingests user goals │     │ • Runs sandbox code  │     │ • Bundles repo files │
│ • Structures sprints │     │ • Analyzes failures  │     │ • Creates README.md  │
│ • Creates unit tests │     │ • Generates hints    │     │ • Issues certificate │
└──────────┬───────────┘     └──────────┬───────────┘     └──────────┬───────────┘
           │                            │                            │
           └────────────────────────────┼────────────────────────────┘
                                        ▼
                         ┌─────────────────────────────┐
                         │   Amazon Bedrock AgentCore  │
                         └─────────────────────────────┘
```

---

## 3. Implementing the Strands Agent Loop

Here is how the core orchestration loop is structured using Python and Strands Agents tool definitions:

```python
from strands_agents import Agent, Tool
import boto3

# Amazon Bedrock Runtime Client
bedrock_runtime = boto3.client(
    service_name="bedrock-runtime",
    region_name="us-east-1"
)

# Custom Tool: Sandboxed Code Execution
@Tool(name="execute_python_sandbox", description="Runs user code against unit test assertions")
def execute_python_sandbox(code: str, test_assertions: str) -> dict:
    # Safely executes code in isolated execution context
    return sandbox_runner.run(code, test_assertions)

# Evaluator Agent Definition
evaluator_agent = Agent(
    name="Reveluation-Evaluator",
    model="anthropic.claude-3-5-sonnet-20241022-v2:0",
    system_prompt="""You are the Reveluation AI Diagnostic Evaluator. 
    Analyze test failures and guide the student towards conceptual mastery without giving away direct answers.""",
    tools=[execute_python_sandbox]
)
```

---

## 4. Key Architectural Advantages

1. **State Isolation:** Each learning sprint maintains its own isolated memory state, ensuring low token overhead and zero context drift.
2. **Resilient Fallbacks:** Intelligent local fallback simulation ensures uninterrupted development and demonstration even under strict network boundaries.
3. **Credit & Metering Integration:** Every agent invocation transparently updates a token & credit ledger, enabling SaaS commercialization while preserving full evaluator access for hackathon judges.

In **Part 3**, we explore the automated code sandbox and evaluation engine that powers real-time feedback in Reveluation AI.
