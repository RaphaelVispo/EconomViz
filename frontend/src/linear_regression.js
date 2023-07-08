
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
    supply: { ...original.supply, ...changeGraph.supply },
    price_floor: changeGraph.priceFloor,
    price_ceiling: changeGraph.priceCeiling,

  };

  const res = await fetch('http://139.144.120.253:5000/api/linear_regression', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(plots),
  });

  const resData = await res.json();
  const jsonData = JSON.parse(resData);

  if (newrange) {
    setRange(() => ({
      qdmax: Math.max(...jsonData.demand.qd),
      pricemax: Math.max(...jsonData.demand.price),
    }));
    setChangeGraph(() => ({
      demand: {
        slope: 0,
        shift: 0,
      },
      supply: {
        slope: 0,
        shift: 0,
      },
    }));

  }

  setRegression(() => ({
    demand: {
      regression: jsonData.demand,
    },
    supply: {
      regression: jsonData.supply,
    },
    priceEquilibrium: jsonData.equilibrum_point,
    priceCeilingPoints: jsonData.price_ceiling,
    priceFloorPoints: jsonData.price_floor,
  }));


};

export { solveLinearRegression };
