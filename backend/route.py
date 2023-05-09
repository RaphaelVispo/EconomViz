
from fastapi import APIRouter
from fastapi.responses import JSONResponse
import numpy as np
import pandas as pd
from json_model import JSON_Model
from  data_model import Data

router  = APIRouter()

@router.post("/linear_regression")
async def linear_regression(data: Data)-> JSONResponse: 

    if (len(data.X) ==1 ):
        return JSONResponse(content="The lenght should be greatert than 1", 
                            status_code = 422)
    
    
    
    df = pd.DataFrame(data = {"X":data.X,"y":data.y})

    b, a = np.polyfit(df.X, df.y, deg=1)

    x_range = np.linspace(0, len(df.X), 100)
    y_range = a + b* x_range 

    me = JSON_Model(x_range, y_range)

    return JSONResponse(content = me.toJSON(), status_code = 200)

