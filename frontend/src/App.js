import React , {useState, useEffect} from 'react'



const solve_linear_regression = async (setData) => {
  const res = await fetch( "/api/linear_regression", {
    method: "POST",
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify(    {
      "X": [0, 1, 2, 3, 4],
      "y": [0, 1, 4, 9, 16]
  },)})

  const res_data =  await res.json()
  setData(res_data)
  console.log(res_data);

  
}


function App(){
  const [data, setData ] = useState([{}])

  useEffect(()=> {
    solve_linear_regression(setData)
  }, [])
  return(
    <div>

    </div>
  )
}

export default App