

const solve_linear_regression = async (setData, data) => {
    const res = await fetch("/api/linear_regression", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data.original),
    });
  
    const res_data = await res.json()
    const json_data =  JSON.parse(res_data );

    setData((prev) => ({
        ...prev,
        regression: json_data
      }));
  };

export {solve_linear_regression}