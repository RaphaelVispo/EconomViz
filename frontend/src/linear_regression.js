const solveLinearRegression = async (
  original,
  regression,
  changeGraph,
  setRegression,
  setRange,
  newrange,
) => {
  const plots = {
    demand: { ...original.demand, ...regression.demand },
    supply: { ...original.supply, ...regression.supply },
    ...changeGraph,
  };

  const res = await fetch('http://0.0.0.0:5000/api/linear_regression', {
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
    setRange(() => ({
      qdmax: Math.max(...jsonData.X),
      pricemax: Math.max(...jsonData.y),
    }));
  }
};

export { solveLinearRegression };
