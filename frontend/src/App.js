import React , {useState, useEffect} from 'react'
import Plot from 'react-plotly.js';
import {solve_linear_regression} from './linear_regression'


function App(){
  const [data_Supply, setData_Supply] = useState({
    original: {
      X: [0, 1, 2, 3, 4],
      y: [0, 1, 4, 9, 16],
    },
    regression: {
      X: [0, 1, 2, 3, 4],
      y: [0, 1, 4, 9, 16],      
    }

  });
  const [data_Demand, setdata_Demand] = useState({
    original: {
      X: [0, 1, 2, 3, 4],
      y: [16, 9, 4, 1, 0]
    },
    regression: {
      X: [0, 1, 2, 3, 4],
      y: [0, 1, 4, 9, 16],      
    }

  });

  
  useEffect(() => {
    solve_linear_regression(setData_Supply, data_Supply);
    solve_linear_regression(setdata_Demand, data_Demand);

  }, []);
  
  useEffect(() => {
    console.log("supply:", data_Supply);
  }, [data_Supply]);

  useEffect(() => {
    console.log("demand:", data_Demand);
  }, [data_Demand]);


  return(
    <div>
      <Plot
        data={[

          {
            x: data_Supply.regression.X  ,
            y: data_Supply.regression.y ,
            type: 'line',
            marker: {color: 'red'},
            line: { width: 5} ,
            name: 'Supply Regression',
          },
          {
            x: data_Demand.regression.X  ,
            y: data_Demand.regression.y ,
            type: 'line',
            marker: {color: 'blue'},
            line: { width: 5} ,
            name: 'Demand Regression',
          },
          {type: 'scatter',
            x: data_Supply.original.X,
            y: data_Supply.original.y,
            mode: 'markers',
            marker: {opacity: 0.5},
            name: 'Supply Data',
          },
          {type: 'scatter',
            x: data_Demand.original.X,
            y: data_Demand.original.y,
            mode: 'markers',
            marker: {opacity: 0.5},
            name: 'Demand Data',
          },
        ]}
        layout={{width: 1000, height: 1000}}
        ></Plot>
    </div>
  )
}

export default App