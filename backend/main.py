import os
import uvicorn
from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Dict, Any, List, Optional

from services.metering_service import metering_service
from services.bedrock_service import bedrock_service
from agents.curriculum_agent import curriculum_agent
from agents.evaluator_agent import evaluator_agent
from agents.portfolio_agent import portfolio_agent
from agents.interview_agent import interview_agent
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

app = FastAPI(
    title="Reveluation AI — Agentic Backend API",
    description="Universal Autonomous Learning & Real-Time Evaluation Engine powered by Strands Agents & AWS Bedrock.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Request / Response Models ---
class PlanCurriculumRequest(BaseModel):
    goal: str = Field(..., example="Master AWS Bedrock AgentCore and Python Async in 7 Days")
    experience_level: str = Field(default="intermediate", example="intermediate")
    duration_days: int = Field(default=7, example=7)
    user_id: str = Field(default="demo-user")

class EvaluateCodeRequest(BaseModel):
    lab_id: str
    lab_title: str
    user_code: str
    test_code: str
    user_id: str = Field(default="demo-user")

class PortfolioAssembleRequest(BaseModel):
    roadmap_title: str
    completed_labs: List[Dict[str, Any]]
    learner_name: str = Field(default="Alex Hunter")
    user_id: str = Field(default="demo-user")

class InterviewQuestionRequest(BaseModel):
    topic: str
    user_code: str

class InterviewAnswerRequest(BaseModel):
    question: str
    candidate_answer: str

class JudgeModeRequest(BaseModel):
    enabled: bool
    user_id: str = Field(default="demo-user")

# --- Routes ---

@app.get("/")
def root():
    return {
        "app": "Reveluation AI",
        "tagline": "The Universal Autonomous Learning & Real-Time Evaluation Engine",
        "status": "online",
        "aws_bedrock_connected": bedrock_service.client is not None,
        "region": bedrock_service.region,
        "model_id": bedrock_service.model_id
    }

@app.get("/api/user/status")
def get_user_status(user_id: str = "demo-user"):
    return metering_service.get_user_status(user_id)

@app.post("/api/user/judge-mode")
def set_judge_mode(req: JudgeModeRequest):
    return metering_service.toggle_judge_mode(req.enabled, req.user_id)

@app.post("/api/user/upgrade-pro")
def upgrade_pro(user_id: str = "demo-user"):
    return metering_service.upgrade_to_pro(user_id)

@app.post("/api/curriculum/plan")
def generate_curriculum(req: PlanCurriculumRequest):
    if not metering_service.deduct_credits(15, req.user_id):
        raise HTTPException(
            status_code=402, 
            detail="Insufficient credits. Upgrade to Reveluation Pro or toggle Judge Demo Mode."
        )
    roadmap = curriculum_agent.plan_curriculum(
        goal=req.goal,
        experience_level=req.experience_level,
        duration_days=req.duration_days
    )
    return {
        "status": "success",
        "roadmap": roadmap,
        "user_status": metering_service.get_user_status(req.user_id)
    }

@app.post("/api/sandbox/evaluate")
def evaluate_code(req: EvaluateCodeRequest):
    if not metering_service.deduct_credits(5, req.user_id):
        raise HTTPException(
            status_code=402, 
            detail="Insufficient credits. Upgrade to Reveluation Pro or toggle Judge Demo Mode."
        )
    result = evaluator_agent.evaluate_submission(
        user_code=req.user_code,
        test_code=req.test_code,
        lab_title=req.lab_title
    )
    return {
        "status": "success",
        "result": result,
        "user_status": metering_service.get_user_status(req.user_id)
    }

@app.post("/api/portfolio/assemble")
def assemble_portfolio(req: PortfolioAssembleRequest):
    user_status = metering_service.get_user_status(req.user_id)
    if not user_status["features"]["github_portfolio_export"]:
        raise HTTPException(
            status_code=403, 
            detail="GitHub Portfolio Generation is a Reveluation Pro feature. Enable Judge Mode to test."
        )
    portfolio = portfolio_agent.assemble_portfolio(
        roadmap_title=req.roadmap_title,
        completed_labs=req.completed_labs,
        learner_name=req.learner_name
    )
    return portfolio

@app.post("/api/interview/question")
def generate_interview_question(req: InterviewQuestionRequest):
    return interview_agent.generate_question(req.topic, req.user_code)

@app.post("/api/interview/evaluate")
def evaluate_interview_answer(req: InterviewAnswerRequest):
    return interview_agent.evaluate_answer(req.question, req.candidate_answer)

# --- Serve Frontend in Production ---
frontend_dist = os.path.join(os.path.dirname(__file__), "..", "frontend", "dist")
if os.path.exists(frontend_dist):
    app.mount("/assets", StaticFiles(directory=os.path.join(frontend_dist, "assets")), name="assets")

    @app.get("/{full_path:path}")
    async def serve_spa(full_path: str):
        file_path = os.path.join(frontend_dist, full_path)
        if os.path.isfile(file_path):
            return FileResponse(file_path)
        return FileResponse(os.path.join(frontend_dist, "index.html"))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
