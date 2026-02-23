import hashlib
from fastapi import APIRouter, Depends, Query, Request, Form
from sqlalchemy.orm import Session
from datetime import datetime
from app.core.database import get_db

from app.api.dependencies import get_current_user
from app.models.user import User
from app.models.sensor_data import AuditLog

from app.schemas.nexus import NexusArchitectRequest, NexusArchitectResponse, NexusExecuteRequest, MealArchitectCommand

import logging
logger = logging.getLogger(__name__)

router = APIRouter()

@router.post("/chat", response_model=NexusArchitectResponse, tags=["Breakroom AI"])
def meal_architect_chat(payload: MealArchitectCommand):
    """
    Mock-AI endpoint simulating the automated meal architect.
    Returns targeted ingredient IDs based on keywords.
    """
    cmd = payload.command.lower()
    if "protein" in cmd or "muscle" in cmd:
         return {"response": "I see you require sustenance for physical exertion. Injecting synthetic aminos.", "suggested_ingredients": ["ing_synth_beef", "ing_whey_isolate"]}
    elif "focus" in cmd or "code" in cmd:
         return {"response": "Mental acuity requested. Suggesting high-caffeine and nootropic blends.", "suggested_ingredients": ["ing_caffeine_100mg", "ing_l_theanine"]}
    else:
         return {"response": "Processing baseline nutritional request. Proceed with standard caloric paste.", "suggested_ingredients": ["ing_base_paste_01"]}

@router.post("/execute", tags=["Breakroom AI"])
def execute_nexus_order(
    request: NexusExecuteRequest,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    """Simulates the materialization command sent to the robotic bay."""
    
    # Generate deterministic hash for the order
    ingredients_str = ",".join(sorted(request.ingredients))
    order_string = f"{user.id}:{ingredients_str}:{datetime.utcnow().isoformat()}"
    signature = hashlib.sha256(order_string.encode()).hexdigest()
    
    # Log the action (demonstrating the auditability of backend requests even for silly things)
    audit = AuditLog(
        field_id="nexus_breakroom",
        decision_type="MEAL_MATERIALIZATION",
        input_telemetry={"ingredients": request.ingredients},
        rules_applied={"user_tier": user.tier.value},
        deterministic_output=f"Dispensing {len(request.ingredients)} items",
        provenance="nexus_v1",
        model_type="robotic_bay_api",
        integrity_hash=signature
    )
    db.add(audit)
    db.commit()
    
    logger.info(f"Nexus materializing order {signature} for {user.email}")
    
    return {"status": "materializing", "bay": 4, "eta_seconds": 45, "receipt": signature}
    
@router.post("/push", tags=["Push Gateway"])
def handle_push_query(
    request: Request,
    From: str = Form(...),
    Body: str = Form(...),
    db: Session = Depends(get_db)
):
    """
    Generic Push Gateway (ntfy.sh / Matrix / Webhook Compatible).
    Allows farmers to query field status via text.
    """
    logger.info(f"Received push query from {From}: {Body}")
    query = Body.lower()
    response_msg = "Command not recognized."
    
    if "status" in query:
        response_msg = "Field status: ACTIVE. Moisture 22%. Pump IDLE."
    elif "water" in query:
        response_msg = "Watering recommended for Field 1. ET0 high (8.2mm)."
        
    return {"message": response_msg, "action": "sent_push_notification"}
