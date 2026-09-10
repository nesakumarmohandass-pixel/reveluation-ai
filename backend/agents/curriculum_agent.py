import json
import logging
from typing import Dict, Any, List
from services.bedrock_service import bedrock_service

logger = logging.getLogger("reveluation.agents.curriculum")

class CurriculumPlannerAgent:
    """
    Strands Agent that analyzes user learning goals, skills, and documents,
    generating structured milestones and runnable coding labs with unit tests.
    """
    def __init__(self):
        self.name = "Reveluation-CurriculumPlanner"
        self.system_prompt = """You are the Reveluation AI Curriculum & Sprint Planner Agent.
Your objective is to transform user goals or syllabi into an actionable, multi-milestone hands-on learning roadmap.
Each milestone MUST contain runnable coding labs with starter code, clear instructions, and automated unit test assertions.

Output strictly valid JSON conforming to this schema:
{
  "roadmap_title": "string",
  "estimated_duration": "string",
  "difficulty": "Beginner | Intermediate | Advanced",
  "target_skills": ["string"],
  "milestones": [
    {
      "id": "m1",
      "title": "string",
      "description": "string",
      "labs": [
        {
          "id": "lab-1",
          "title": "string",
          "summary": "string",
          "difficulty": "Beginner | Intermediate | Advanced",
          "language": "python",
          "starter_code": "string",
          "instructions": "string",
          "test_code": "string"
        }
      ]
    }
  ]
}
"""

    def plan_curriculum(self, goal: str, experience_level: str = "intermediate", duration_days: int = 7) -> Dict[str, Any]:
        user_prompt = f"""Generate a hands-on learning curriculum for the following request:
Goal: {goal}
Learner Experience Level: {experience_level}
Target Duration: {duration_days} days

Focus on real-world practical execution. Each lab must include clear unit test assertions that can be executed in an automated sandbox."""

        raw_response = bedrock_service.invoke(
            system_prompt=self.system_prompt,
            user_prompt=user_prompt,
            temperature=0.2
        )

        try:
            # Handle potential markdown code block fences in LLM output
            cleaned_json = raw_response.strip()
            if cleaned_json.startswith("```json"):
                cleaned_json = cleaned_json[7:]
            if cleaned_json.startswith("```"):
                cleaned_json = cleaned_json[3:]
            if cleaned_json.endswith("```"):
                cleaned_json = cleaned_json[:-3]
            cleaned_json = cleaned_json.strip()

            roadmap_data = json.loads(cleaned_json)
            return roadmap_data
        except Exception as e:
            logger.error(f"Failed to parse curriculum response JSON: {e}")
            # Fallback structured curriculum
            return {
                "roadmap_title": f"Accelerated Mastery: {goal}",
                "estimated_duration": f"{duration_days} Days",
                "difficulty": experience_level.capitalize(),
                "target_skills": ["AWS Bedrock", "Strands Agents", "Python", "Tool Calling"],
                "milestones": [
                    {
                        "id": "m1",
                        "title": "Milestone 1: Foundations & Agent Tools",
                        "description": "Set up core agent interfaces and define callable tool signatures.",
                        "labs": [
                            {
                                "id": "lab-101",
                                "title": "Lab 1.1: Building a Safe Agent Calculation Tool",
                                "summary": "Implement a Python function that performs verified mathematical actions.",
                                "difficulty": "Beginner",
                                "language": "python",
                                "starter_code": "def agent_tool_calculator(operation: str, a: float, b: float) -> dict:\n    # Implement 'add', 'subtract', 'multiply', 'divide'\n    pass\n",
                                "instructions": "Complete the `agent_tool_calculator` function to return `{'result': value}` or `{'error': message}`.",
                                "test_code": "assert agent_tool_calculator('add', 10, 5)['result'] == 15\nassert agent_tool_calculator('divide', 20, 4)['result'] == 5\nassert 'error' in agent_tool_calculator('divide', 10, 0)\n"
                            }
                        ]
                    }
                ]
            }

curriculum_agent = CurriculumPlannerAgent()
