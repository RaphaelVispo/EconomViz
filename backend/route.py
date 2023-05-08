
from fastapi import APIRouter

router  = APIRouter()

@router.post("/linear_regression")
async def linear_regression():
    return {"Linear regression"}

