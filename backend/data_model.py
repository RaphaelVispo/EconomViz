from pydantic import BaseModel
from typing import Dict, List

class point (BaseModel):
    qd : List[int]
    price : List[int]

class type (BaseModel):
    original: point
    regression: point

class data(BaseModel):
    demand : type
    supply : type
    slope: int = 0
    shift: int = 0