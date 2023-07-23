"""
The file is to test the linear regression api 

"""
import pytest
from wala import *
import requests
import json
"""
Correct tests 

"""
# testing for all correct sample 


def get_correct_sample ():
    message =  {
        "demand": {
          "original": {
            "qd": [0, 10, 20, 30, 40],
            "price":  [40, 30, 20, 10, 0]
          },
          "slope": 0,
          "shift": 0
        },
        "supply": {
          "original": {
            "qd":  [0, 10, 20, 30, 40],
            "price":  [0, 10, 20, 30, 40]
            },
            "slope": 0,
            "shift": 0
        },
            "price_floor": 0,
            "price_ceiling": 0
        }
    result = requests.post(
        'http://localhost:5000/api/linear_regression',
        json =  message)

    return result.text


# if all of the field are field
# must return true
def test_correct_sample():
    result =  json.loads(get_correct_sample())

    assert result



# remove options 
#   testing without the optional fields as seen in the 
#  data_model.py file

def test_correct_sample_wout_options ():
    message =  {
        "demand": {
          "original": {
            "qd": [0, 10, 20, 30, 40],
            "price":  [40, 30, 20, 10, 0]
          }
        },
        "supply": {
          "original": {
            "qd":  [0, 10, 20, 30, 40],
            "price":  [0, 10, 20, 30, 40]
            }
        }
        }
    result = requests.post(
        'http://localhost:5000/api/linear_regression',
        json =  message)


    assert result.text == get_correct_sample()







