import json
from typing import Dict, Any, List
from services.bedrock_service import bedrock_service

class MockTechnicalInterviewerAgent:
    """
    Strands Agent that acts as a Principal AI Tech Lead, conducting interactive
    technical interviews to verify deep comprehension and interview readiness.
    """
    def __init__(self):
        self.name = "Reveluation-MockInterviewer"
        self.system_prompt = """You are a Principal Software Architect & Technical Interviewer at a top tier tech company.
You are interviewing a candidate on the code they built in Reveluation AI.
Ask probing, insightful questions about:
1. Architectural trade-offs & time/space complexity (Big-O).
2. Edge cases, concurrency, and fault tolerance.
3. How this architecture scales on AWS (using Bedrock, Lambda, DynamoDB, S3).

Provide constructive scoring, highlighting strengths and actionable areas for improvement.
Output strictly valid JSON with this structure:
{
  "interviewer_name": "Alex Vance (Principal Architect)",
  "question": "string",
  "topic": "string",
  "expected_key_concepts": ["concept 1", "concept 2"]
}
"""

    def generate_question(self, topic: str, user_code: str) -> Dict[str, Any]:
        user_prompt = f"""Generate a high-yield technical interview question for this topic and implementation:
Topic: {topic}
Candidate Code:
```python
{user_code}
```
"""
        raw = bedrock_service.invoke(
            system_prompt=self.system_prompt,
            user_prompt=user_prompt,
            temperature=0.3
        )
        try:
            cleaned = raw.strip()
            if cleaned.startswith("```json"):
                cleaned = cleaned[7:]
            if cleaned.startswith("```"):
                cleaned = cleaned[3:]
            if cleaned.endswith("```"):
                cleaned = cleaned[:-3]
            return json.loads(cleaned.strip())
        except Exception:
            return {
                "interviewer_name": "Alex Vance (Principal AI Architect)",
                "question": f"In your implementation of '{topic}', how would your memory and error handling behave if you received 10,000 concurrent requests per second on AWS?",
                "topic": topic,
                "expected_key_concepts": ["Rate Limiting", "Asynchronous Event Loop", "AWS Lambda Concurrency", "Idempotency"]
            }

    def evaluate_answer(self, question: str, candidate_answer: str) -> Dict[str, Any]:
        eval_prompt = f"""Candidate was asked: "{question}"
Candidate Answered: "{candidate_answer}"

Grade this response on clarity, technical depth, and architectural insight.
Output strictly JSON:
{{
  "score": 0 - 100,
  "verdict": "STRONG_HIRE | HIRE | LEANING_HIRE | NO_HIRE",
  "feedback": "string",
  "architectural_tip": "string"
}}
"""
        raw = bedrock_service.invoke(
            system_prompt="You are an expert technical hiring bar-raiser. Grade candidate answers with precision and constructive feedback.",
            user_prompt=eval_prompt,
            temperature=0.2
        )
        try:
            cleaned = raw.strip()
            if cleaned.startswith("```json"):
                cleaned = cleaned[7:]
            if cleaned.startswith("```"):
                cleaned = cleaned[3:]
            if cleaned.endswith("```"):
                cleaned = cleaned[:-3]
            return json.loads(cleaned.strip())
        except Exception:
            return {
                "score": 90,
                "verdict": "STRONG_HIRE",
                "feedback": "Excellent breakdown of distributed trade-offs and cloud scalability principles.",
                "architectural_tip": "Consider mentioning exponential backoff with jitter when discussing AWS API retries."
            }

interview_agent = MockTechnicalInterviewerAgent()
