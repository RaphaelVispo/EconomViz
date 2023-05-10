import React , {useState, useEffect} from 'react'
import Plot from 'react-plotly.js';


function App(){
  const [data, setData] = useState([{}]);

  const solve_linear_regression = async () => {
    const res = await fetch("/api/linear_regression", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        X: [0, 1, 2, 3, 4],
        y: [0, 1, 4, 9, 16],
      }),
    });
  
    const res_data = await res.json()
    const json_data =  JSON.parse(res_data );
    setData(json_data);
  };
  
  useEffect(() => {
    solve_linear_regression();
  }, []);
  
  useEffect(() => {
    console.log(data);
  }, [data]);


  return(
    <div>
      <Plot
        data={[
          {
            x: data.X,
            y: data.y,
            type: 'line',
            marker: {color: 'red'},
          },
          {type: 'scatter',
            x: [0, 1, 2, 3, 4], 
            y: [0, 1, 4, 9, 16],
            mode: 'markers',
          },
        ]}
        layout={{width: 1000, height: 1000, title: 'A Fancy Plot'}}
        ></Plot>
    </div>
  )
}

export default App