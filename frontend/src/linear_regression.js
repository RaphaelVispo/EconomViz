import { useContext } from "react";
import { usePlots } from "./App";

const solve_linear_regression = async (plots, setSolved) => {

  const res = await fetch("http://0.0.0.0:5000/api/linear_regression", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(plots),
  });

  const res_data = await res.json()
  const json_data =  JSON.parse(res_data );

  setSolved((prev)=>({
    ...plots,
    demand:{
      ...plots.demand,
      regression:{
        qd: json_data.X,
        price: json_data.y
      }
    }
  }))

  };

export {solve_linear_regression}