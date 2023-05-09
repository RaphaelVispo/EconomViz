from pydantic import BaseModel

class Data(BaseModel):
    X: list[int]
    y: list[int]

