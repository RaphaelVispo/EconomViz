from pydantic import BaseModel
from typing import Dict, List, Optional

class point (BaseModel):
    qd : List[float]
    price : List[float]

class type (BaseModel):
    original: point
    slope: int = 0
    shift: int = 0

class data(BaseModel):
    demand : type
    supply : type
    price_floor : Optional[float]
    price_ceiling: Optional[float]


class return_Data(BaseModel):
    demand : point
    supply : point
    equilibrum_point: tuple
    price_floor : Optional[tuple] = None
    price_ceiling: Optional[tuple] = None