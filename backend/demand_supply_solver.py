
import math
import numpy as np
import pandas as pd
from data_model import *


class Demand_Supply_Solver:
    
    def __init__ (self, data):
        self.demand_slope = data.demand.slope
        self.demand_shift = data.demand.shift
        self.supply_slope = data.supply.slope
        self.supply_shift = data.supply.shift
        self.price_ceiling = data.price_ceiling
        self.price_floor = data.price_floor
        
        self.get_initial_points(data)
        self.sloped_points()
        
        self.shift_points()
        
        self.demand_b, self.demand_a = np.polyfit(self.quantity_demanded, self.demand_price, deg=1)
        self.supply_b, self.supply_a = np.polyfit(self.quantity_supplied , self.supply_price, deg=1)
        self.get_equilibrium()
        self.get_price_ceiling()
        self.get_price_floor()
        
    
    def get_initial_points(self, data):
        """
        Get the points for both supply and demand
        used polyfit for the regression
        """
        demand_df = pd.DataFrame(data = {"qd":data.demand.original.qd,"price":data.demand.original.price})
        supply_df = pd.DataFrame(data = {"qs":data.supply.original.qd,"price":data.supply.original.price})

        demand_b, demand_a = np.polyfit(demand_df.qd, demand_df.price, deg=1)
        supply_b, supply_a = np.polyfit(supply_df.qs, supply_df.price, deg=1)

        self.quantity_demanded = np.linspace(0, max(demand_df.qd), 50)
        self.qunatity_supplied = np.linspace(0, max(supply_df.qs), 50)

        self.demand_price = demand_a + demand_b * self.quantity_demanded
        self.supply_price = supply_a + supply_b * self.qunatity_supplied
        
    def rotate(self, origin, point, angle):
        """
        Rotate a point counterclockwise by a given angle around a given origin.

        The angle should be given in radians.
        """
        ox, oy = origin
        px, py = point

        qx = ox + math.cos(angle) * (px - ox) - math.sin(angle) * (py - oy)
        qy = oy + math.sin(angle) * (px - ox) + math.cos(angle) * (py - oy)
        return qx, qy
    
    def sloped_points(self):
        """
        Solve the points with the slope changed

        """
        mid = int( len(self.quantity_demanded)/2)
        
        demand = (self.quantity_demanded, self.demand_price)
        supply = (self.qunatity_supplied, self.supply_price)

        demand_origin = (self.quantity_demanded[mid], self.demand_price[mid]) # getting the midpoint as the origin
        supply_origin = (self.qunatity_supplied[mid], self.supply_price[mid])

        self.quantity_demanded , self.demand_price = self.rotate(demand_origin, demand, math.radians(self.demand_slope))
        self.quantity_supplied , self.supply_price = self.rotate(supply_origin, supply, math.radians(self.supply_slope))
        
    def shift_points(self):
        """
        shift the points 

        """
        self.quantity_demanded += self.demand_shift
        self.quantity_supplied += self.supply_shift
    
    
    
    
    def add_values(self, value, vector, demand_price=False):
        idx = np.searchsorted(vector, value)
        vector = -vector if demand_price else vector
        value = -value if demand_price else value
        return np.concatenate((vector[:idx], [value], vector[idx:])) 
        
    def check_if_exist_values(self, quantity, price):
        return (np.where(self.quantity_demanded > quantity)[0].size == False or 
        np.where(self.demand_price > price)[0].size == False or 
        np.where(self.qunatity_supplied > quantity)[0].size == False or
        np.where(self.supply_price > price)[0].size == False)
    
    def add_points(self, d_quantity, d_price, s_quantity, s_price):
        # adding point to the graph
        # demand
        self.quantity_demanded = self.add_values(d_quantity, self.quantity_demanded )
        self.demand_price = self.add_values(-d_price, -self.demand_price, True)

        # supply
        self.quantity_supplied = self.add_values(s_quantity, self.quantity_supplied)
        self.supply_price = self.add_values(s_price, self.supply_price)
    
    def get_equilibrium(self):
        """
        gets the equilibrium point

        """
        q = (-self.demand_a + self.supply_a)/ (self.demand_b - self.supply_b)
        p = self.supply_a + self.supply_b * q

        # if there is no equilibrium
        if (self.check_if_exist_values(q, p)):
            self.equilibrium_point = (None, None)
            return
        
        self.add_points(q, p, q, p)
        self.equilibrium_point = (q, p)



    def get_price_ceiling(self):
        """
        gets the price cieling if exist

        """
        if (self.price_ceiling is None):
            self.price_ceiling_points = (None , None), (None, None)
            return 
        
        demand_q = (self.price_ceiling - self.demand_a) / self.demand_b 
        supply_q = (self.price_ceiling - self.supply_a) / self.supply_b 

        # adding point to the graph
        # demand
        self.add_points(demand_q, self.price_ceiling, supply_q, self.price_ceiling)

        self.price_ceiling_points = (demand_q , self.price_ceiling), (supply_q, self.price_ceiling)


    def get_price_floor(self):

        if (self.price_floor is None):
            self.price_floor_points = (None , None), (None, None)
            return

        demand_q = (self.price_floor - self.demand_a) / self.demand_b 
        supply_q = (self.price_floor - self.supply_a) / self.supply_b 

        self.add_points(demand_q, self.price_floor, supply_q, self.price_floor)

        self.price_floor_points = (demand_q, self.price_floor), (supply_q, self.price_floor)

    def toJson(self):
        res_data = return_Data(
            demand = {
                'qd': np.round(self.quantity_demanded, decimals = 4).tolist(),
                'price': self.demand_price.tolist()
            },
            supply = {
                'qd': self.quantity_supplied.tolist(),
                'price': self.supply_price.tolist()
            },
            equilibrum_point = self.equilibrium_point,
            price_floor = self.price_floor_points,
            price_ceiling = self.price_ceiling_points
            
        )
        
        return res_data.json()
        