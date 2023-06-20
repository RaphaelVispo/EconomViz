import { useContext } from "react";
import { usePlots } from "./App";

const solve_linear_regression = async (plots, setPlots) => {


  console.log(JSON.stringify(plots))

  const res = await fetch("http://0.0.0.0:5000/api/linear_regression", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(plots),
  });

  console.log(res)

  // const res_data = await res.json()
  // const json_data =  JSON.parse(res_data );

  // evaluated_level[slope]=json_data

  // setData((prev) => ({
  //     ...prev,
  //     regression: json_data
  //   }));
  };

export {solve_linear_regression}