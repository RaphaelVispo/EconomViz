
from fastapi import APIRouter
from fastapi.responses import JSONResponse
from data_model import data
from demand_supply_solver import Demand_Supply_Solver


router = APIRouter()


@router.post("/linear_regression")
async def linear_regression(data: data) -> JSONResponse:
    print(data)
    solve = Demand_Supply_Solver(data)

    return JSONResponse(content = solve.toJson(), status_code = 200)