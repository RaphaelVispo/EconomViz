
from fastapi import APIRouter
from fastapi.responses import JSONResponse
import numpy as np
import pandas as pd
from json_model import JSON_Model
from  data_model import data
import math

router  = APIRouter()

@router.post("/linear_regression")
async def linear_regression(data: data)-> JSONResponse: 


    df = pd.DataFrame(data = {"qd":data.demand.original.qd,"price":data.demand.original.price})

    b, a = np.polyfit(df.qd, df.price, deg=1)

    qd_range = np.linspace(0, max(df.qd), 101)
  
    price_range = a + b* qd_range 


    # Rotation of the line if slope is given
    point = (qd_range, price_range)
    origin = (qd_range[50], price_range[50]) # getting the midpoint as the origin
    x_range_slope , y_range_slope = rotate(origin, point, math.radians(data.slope*0.5))

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
