import { useContext } from "react";
import { usePlots } from "./App";

const solve_linear_regression = async (original, regression,
   changeGraph, setRegression, setRange, newrange) => {
  const plots = {
    demand :{...original.demand, ...regression.demand}, 
    supply: {...original.supply, ...regression.supply},
     ...changeGraph}
  console.log(plots)

  const res = await fetch("http://0.0.0.0:5000/api/linear_regression", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(plots),
  });

  const res_data = await res.json()
  const json_data =  JSON.parse(res_data );

  setRegression((prev)=>({
    ...prev,
    demand:{
      regression:{
        qd: json_data.X,
        price: json_data.y
      }
    }
  }))

  if (newrange){
    console.log("New view!!")
    setRange(val => ({
      qdmax: Math.max(...json_data.X),
      pricemax: Math.max(...json_data.y)
    }))
  }



  };

export {solve_linear_regression}