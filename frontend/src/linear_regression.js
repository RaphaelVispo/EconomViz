const solveLinearRegression = async (
  original,
  regression,
  changeGraph,
  setRegression,
  setRange,
  newrange,
  setChangeGraph
) => {
  const plots = {
    demand: { ...original.demand, ...regression.demand },
    supply: { ...original.supply, ...regression.supply },
    ...changeGraph,
  };

  const res = await fetch('https://economviz-production.up.railway.app/api/linear_regression', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(plots),
  });

  const resData = await res.json();
  const jsonData = JSON.parse(resData);

  setRegression((prev) => ({
    ...prev,
    demand: {
      regression: {
        qd: jsonData.X,
        price: jsonData.y,
      },
    },
  }));


  if (newrange) {
    setChangeGraph(() =>({
      shift: 0,
      slope: 0
    }));
    setRange(() => ({
      qdmax: Math.max(...jsonData.X),
      pricemax: Math.max(...jsonData.y),
    }));
  }
};

const resetValues = (setChangeGraph) => {
  setChangeGraph(() =>({
    shift: 0,
    slope: 0
  }))
}

export { solveLinearRegression, resetValues };
