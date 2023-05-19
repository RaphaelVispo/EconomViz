
from fastapi import APIRouter
from fastapi.responses import JSONResponse
import numpy as np
import pandas as pd
from json_model import JSON_Model
from  data_model import Data
import math

router  = APIRouter()

@router.post("/linear_regression")
async def linear_regression(data: Data)-> JSONResponse: 

    if (len(data.X) ==1 ):
        return JSONResponse(content="The lenght should be greatert than 1", 
                            status_code = 422)
    
    
    
    df = pd.DataFrame(data = {"X":data.X,"y":data.y})

    b, a = np.polyfit(df.X, df.y, deg=1)

    x_range = np.linspace(0, max(df.X), 101)
    y_range = a + b* x_range 

    # Rotation of the line if slope is given
    point = (x_range, y_range)
    origin = (x_range[50], y_range[50]) # getting the midpoint as the origin
    x_range_slope , y_range_slope = rotate(origin, point, math.radians(data.slope))

    x_range_slope+= data.shift

    me = JSON_Model(x_range_slope, y_range_slope)

    return JSONResponse(content = me.toJSON(), status_code = 200)



def rotate(origin, point, angle):
    """
    Rotate a point counterclockwise by a given angle around a given origin.

    The angle should be given in radians.
    """
    ox, oy = origin
    px, py = point

    qx = ox + math.cos(angle) * (px - ox) - math.sin(angle) * (py - oy)
    qy = oy + math.sin(angle) * (px - ox) + math.cos(angle) * (py - oy)
    return qx, qy
