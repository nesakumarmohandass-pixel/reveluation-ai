import json
import logging
from typing import Dict, Any
from services.bedrock_service import bedrock_service
from services.code_sandbox import code_sandbox

logger = logging.getLogger("reveluation.agents.evaluator")

class DiagnosticEvaluatorAgent:
    """
    Strands Agent that runs learner code against test suites in an isolated sandbox,
    analyzes failures, and generates diagnostic feedback and conceptual guidance.
    """
    def __init__(self):
        self.name = "Reveluation-DiagnosticEvaluator"
        self.system_prompt = """You are the Reveluation AI Diagnostic Evaluator.
You analyze learner code execution results, test assertion failures, or runtime errors.
Provide encouraging, highly constructive feedback.
Do NOT give away the complete direct answer; instead, explain the underlying logic error, provide a targeted hint, and highlight the exact concept to review.

Output strictly valid JSON with the following structure:
{
  "passed": true | false,
  "score": 0 - 100,
  "summary": "string",
  "diagnostic_steps": ["step 1 analysis", "step 2 analysis"],
  "conceptual_hint": "string",
  "remediation_needed": true | false
}
"""

    def evaluate_submission(self, user_code: str, test_code: str, lab_title: str) -> Dict[str, Any]:
        # Step 1: Execute in sandboxed runtime
        sandbox_result = code_sandbox.execute(user_code, test_code)

        agent_thoughts = [
            f"Invoked CodeSandbox tool for lab '{lab_title}'",
            f"Sandbox execution time: {sandbox_result['duration_ms']}ms",
            f"Execution status: {'PASSED' if sandbox_result['success'] else 'FAILED'}"
        ]

        if sandbox_result["success"]:
            return {
                "success": True,
                "sandbox_result": sandbox_result,
                "evaluation": {
                    "passed": True,
                    "score": 100,
                    "summary": f"Outstanding work! Your solution for '{lab_title}' passed all automated test assertions.",
                    "diagnostic_steps": [
                        "Clean syntax with zero compilation errors.",
                        "All unit test assertions and edge cases verified.",
                        f"Execution completed with optimal efficiency ({sandbox_result['duration_ms']}ms)."
                    ],
                    "conceptual_hint": "Ready to advance to the next milestone sprint!",
                    "remediation_needed": False
                },
                "agent_thoughts": agent_thoughts
            }

        # If tests failed, analyze with Bedrock
        error_context = sandbox_result.get("error", {})
        user_prompt = f"""Evaluate this failed submission:
Lab: {lab_title}
User Code:
```python
{user_code}
```
Test Code:
```python
{test_code}
```
Execution Error:
Type: {error_context.get('type')}
Message: {error_context.get('message')}
Traceback: {error_context.get('traceback')}
Stdout: {sandbox_result.get('stdout')}
"""

        raw_response = bedrock_service.invoke(
            system_prompt=self.system_prompt,
            user_prompt=user_prompt,
            temperature=0.2
        )

        try:
            cleaned = raw_response.strip()
            if cleaned.startswith("```json"):
                cleaned = cleaned[7:]
            if cleaned.startswith("```"):
                cleaned = cleaned[3:]
            if cleaned.endswith("```"):
                cleaned = cleaned[:-3]
            evaluation = json.loads(cleaned.strip())
        except Exception:
            evaluation = {
                "passed": False,
                "score": 40,
                "summary": f"Your code encountered a {error_context.get('type', 'Runtime')} error.",
                "diagnostic_steps": [
                    f"Execution triggered: {error_context.get('message', 'Assertion failed')}",
                    error_context.get("suggestion", "Check function return values and types.")
                ],
                "conceptual_hint": "Review the test assertions and verify that your function handles edge cases and expected data structures.",
                "remediation_needed": True
            }

        agent_thoughts.append(f"Diagnostic analysis complete: Identified {error_context.get('type')} bottleneck")

        return {
            "success": False,
            "sandbox_result": sandbox_result,
            "evaluation": evaluation,
            "agent_thoughts": agent_thoughts
        }

evaluator_agent = DiagnosticEvaluatorAgent()
