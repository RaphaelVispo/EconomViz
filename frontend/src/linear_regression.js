const solveLinearRegression = async (
  original,
  regression,
  changeGraph,
  setRegression,
  setRange,
  newrange,
  setChangeGraph,
) => {
  const plots = {
    demand: { ...original.demand, ...changeGraph.demand },
    supply: { ...original.supply, ...changeGraph.supply},
    price_floor : changeGraph.priceFloor
  
  };
  console.log(plots)

  const res = await fetch('http://localhost:5000/api/linear_regression', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(plots),
  });

  const resData = await res.json();
  const jsonData = JSON.parse(resData);
  console.log(changeGraph)
  console.log(jsonData);

  setRegression(() => ({
    demand: {
      regression: jsonData.demand
    },
    supply: {
      regression: jsonData.supply
    },
    priceEquilibrium: jsonData.equilibrum_point,
    priceCeilingPoints: jsonData.price_ceiling,
    priceFloorPoints: jsonData.price_floor
  }));

  if (newrange) {
    setChangeGraph(() => ({
      demand: {
        slope: 0,
        shift: 0
      },
      supply: {
        slope: 0,
        shift: 0
      }
    }));
    setRange(() => ({
      qdmax: Math.max(...jsonData.demand.qd),
      pricemax: Math.max(...jsonData.demand.price),
    }));
  }
};

export { solveLinearRegression,};
