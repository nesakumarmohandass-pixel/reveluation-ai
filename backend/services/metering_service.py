import time
from typing import Dict, Any

class MeteringService:
    """
    SaaS Metering & Subscription Engine for Reveluation AI.
    Tracks token consumption, credit balances, subscription tiers, and Judge Evaluation Mode.
    """
    def __init__(self):
        # In-memory storage for MVP (can back onto DynamoDB / SQLite in production)
        self.users: Dict[str, Dict[str, Any]] = {
            "demo-user": {
                "user_id": "demo-user",
                "email": "learner@reveluation.ai",
                "tier": "free",  # 'free' or 'pro'
                "credits": 100,
                "credits_used": 0,
                "judge_mode": True,  # Default on for seamless hackathon evaluation
                "created_at": time.time()
            }
        }

    def get_user_status(self, user_id: str = "demo-user") -> Dict[str, Any]:
        user = self.users.get(user_id, self.users["demo-user"])
        return {
            "user_id": user["user_id"],
            "tier": user["tier"],
            "credits": user["credits"],
            "credits_used": user["credits_used"],
            "judge_mode": user["judge_mode"],
            "is_unlimited": user["tier"] == "pro" or user["judge_mode"],
            "features": {
                "dynamic_roadmaps": True,
                "standard_evaluator": True,
                "unlimited_runs": user["tier"] == "pro" or user["judge_mode"],
                "github_portfolio_export": user["tier"] == "pro" or user["judge_mode"],
                "ai_mock_interviewer": user["tier"] == "pro" or user["judge_mode"],
                "verified_certificate": user["tier"] == "pro" or user["judge_mode"]
            }
        }

    def deduct_credits(self, amount: int = 10, user_id: str = "demo-user") -> bool:
        user = self.users.get(user_id, self.users["demo-user"])
        if user["judge_mode"] or user["tier"] == "pro":
            user["credits_used"] += amount
            return True
        
        if user["credits"] >= amount:
            user["credits"] -= amount
            user["credits_used"] += amount
            return True
        return False

    def upgrade_to_pro(self, user_id: str = "demo-user") -> Dict[str, Any]:
        user = self.users.get(user_id, self.users["demo-user"])
        user["tier"] = "pro"
        user["credits"] = 999999
        return {
            "status": "success",
            "message": "Successfully upgraded to Reveluation Pro Career Accelerator ($19/mo)!",
            "user": self.get_user_status(user_id)
        }

    def toggle_judge_mode(self, enabled: bool, user_id: str = "demo-user") -> Dict[str, Any]:
        user = self.users.get(user_id, self.users["demo-user"])
        user["judge_mode"] = enabled
        return {
            "status": "success",
            "judge_mode": enabled,
            "user": self.get_user_status(user_id)
        }

metering_service = MeteringService()
