from pydantic import BaseModel
from typing import List

class NexusArchitectRequest(BaseModel):
    message: str

class NexusArchitectResponse(BaseModel):
    response: str
    suggested_ingredients: List[str]

class NexusExecuteRequest(BaseModel):
    ingredients: List[str]

class MealArchitectCommand(BaseModel):
    command: str

class NexusExecuteOrderRequest(BaseModel):
    ingredient_ids: List[str]
