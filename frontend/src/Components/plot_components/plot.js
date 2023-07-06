import React, { useEffect, useState, useContext } from 'react';
import Plot from 'react-plotly.js';
import { usePlots } from '../../App';

export function PlotLaw() {
  const {
    listRevenue,
    regression,
    range,
    trevenue,
    changeGraph,
    listSupplyRevenue,
  } = useContext(usePlots);

  const [plotWidth, setPlotWidth] = useState(0);

  // for first instanciation of the app
  // getting width of the
  useEffect(() => {
    console.log(changeGraph);
    if (document.body.clientWidth > 900) {
      setPlotWidth(900);
    } else {
      setPlotWidth(document.body.clientWidth);
    }
  }, []);

  // id the window changes, rezise the graph
  window.addEventListener('resize', () => {
    if (document.body.clientWidth > 900) {
      setPlotWidth(900);
      return;
    }
    setPlotWidth(document.body.clientWidth);
  });

  const [revenue, setRevenue] = useState([{}]);
  const [supplyCircle, setsupplyCircle] = useState([{}]);
  useEffect(() => {
    setRevenue(() => listRevenue);
    setsupplyCircle(() => listSupplyRevenue);
  }, [listRevenue, listSupplyRevenue]);

  const showDemandCircle = revenue.map((field, i) => (
    !field.show && { // Demand point
      type: 'circle',
      xref: 'x',
      yref: 'y',
      x0: regression.demand.regression.qd[field.value] - 0.75, // X coordinate of the dot
      y0: regression.demand.regression.price[field.value] - 0.75, // Y coordinate of the dot
      x1: regression.demand.regression.qd[field.value] + 0.75, // X coordinate of the dot
      y1: regression.demand.regression.price[field.value] + 0.75, // Y coordinate of the dot
      fillcolor: 'blue', // Color of the dot
      opacity: 1,
      line: {
        width: 0,
      },
    }));

  const showDemandBox = revenue.map((field, i) => (
    !field.show && {
      text: `P${i}`,
      type: 'rect',
      xref: 'x',
      yref: 'y',
      x0: -1,
      y0: -1,
      x1: regression.demand.regression.qd[field.value],
      y1: regression.demand.regression.price[field.value],
      layer: 'below',
      line: {
        dash: 'dash',
        width: 5,
        color: 'blue',
        opacity: 1,
      },

    }));

  const showSupplyCircle = supplyCircle.map((field, i) => (
    !field.show && { // Demand point
      type: 'circle',
      xref: 'x',
      yref: 'y',
      x0: regression.supply.regression.qd[field.value] - 0.75, // X coordinate of the dot
      y0: regression.supply.regression.price[field.value] - 0.75, // Y coordinate of the dot
      x1: regression.supply.regression.qd[field.value] + 0.75, // X coordinate of the dot
      y1: regression.supply.regression.price[field.value] + 0.75, // Y coordinate of the dot
      fillcolor: 'red', // Color of the dot
      opacity: 1,
      line: {
        width: 0,
      },
    }));

  const showSupplyBox = supplyCircle.map((field, i) => (
    !field.show && {
      type: 'rect',
      xref: 'x',
      yref: 'y',
      x0: -1,
      y0: -1,
      x1: regression.supply.regression.qd[field.value],
      y1: regression.supply.regression.price[field.value],
      opacity: 1,
      layer: 'below',
      line: {
        dash: 'dash',
        width: 5,
        color: 'red',
        opacity: 1,
      },

    }));

  return (
    <Plot
      data={[
        {
          x: regression.supply.regression.qd,
          y: regression.supply.regression.price,
          type: 'line',
          marker: { color: 'red' },
          line: { width: 7 },
          name: 'Supply Regression',
        },
        {
          x: regression.demand.regression.qd,
          y: regression.demand.regression.price,
          type: 'line',
          marker: { color: 'blue' },
          line: { width: 7 },
          name: 'Demand Regression',
        },
      ]}
      layout={{

        width: plotWidth,
        height: plotWidth,
        margin: {
          l: 50, // left margin
          r: 50, // right margin
          t: 50, // top margin
          b: 50, // bottom margin
          pad: 4, // padding between plot area and the margin
        },
        xaxis: {
          title: 'Q',
          rangemode: 'nonnegative',
          autotick: true,
          range: [0, range.qdmax],
        },
        yaxis: {
          title: 'Price',
          rangemode: 'nonnegative',
          autotick: true,
          range: [0, range.pricemax],
        },
        legend: {
          y: -0.2, // Set the yanchor value to "bottom"
          x: 0,
        },

        shapes: [
          ...showDemandCircle,
          ...showDemandBox,
          ...showSupplyCircle,
          ...showSupplyBox,

          regression.priceEquilibrium[0] && { // equilibrium point
            type: 'circle',
            xref: 'x',
            yref: 'y',
            x0: regression.priceEquilibrium[0] - 0.75, // X coordinate of the dot
            y0: regression.priceEquilibrium[1] - 0.75, // Y coordinate of the dot
            x1: regression.priceEquilibrium[0] + 0.75, // X coordinate of the dot
            y1: regression.priceEquilibrium[1] + 0.75, // Y coordinate of the dot
            fillcolor: 'black', // Color of the dot
            opacity: 1,
            line: {
              color: 'black', // Color of the dot's outline
              width: 0,
            },
          },

          // price floor
          (changeGraph.showPriceFloor && regression.priceFloorPoints[0][0]) && {
            type: 'line', // price floor line
            xref: 'x',
            yref: 'y',
            x0: 0,
            y0: regression.priceFloorPoints[0][1],
            x1: range.qdmax,
            y1: regression.priceFloorPoints[0][1],
            line: {
              color: 'black',
              width: 4,
              dash: 'dash',
            },
          },

          (changeGraph.showPriceFloor && regression.priceFloorPoints[0][0]) && {
            type: 'circle',
            xref: 'x',
            yref: 'y',
            x0: regression.priceFloorPoints[0][0] - 0.75, // X coordinate of the dot
            y0: regression.priceFloorPoints[0][1] - 0.75, // Y coordinate of the dot
            x1: regression.priceFloorPoints[0][0] + 0.75, // X coordinate of the dot
            y1: regression.priceFloorPoints[0][1] + 0.75, // Y coordinate of the dot
            fillcolor: 'blue', // Color of the dot
            layer: 'above',

            opacity: 1,
            line: {
              width: 0,

            },
          },

          (changeGraph.showPriceFloor && regression.priceFloorPoints[1][0]) && {
            type: 'circle',
            xref: 'x',
            yref: 'y',
            x0: regression.priceFloorPoints[1][0] - 0.75, // X coordinate of the dot
            y0: regression.priceFloorPoints[1][1] - 0.75, // Y coordinate of the dot
            x1: regression.priceFloorPoints[1][0] + 0.75, // X coordinate of the dot
            y1: regression.priceFloorPoints[1][1] + 0.75, // Y coordinate of the dot
            fillcolor: 'red', // Color of the dot
            layer: 'above',
            opacity: 1,
            line: {
              width: 0,
            },
          },

          // price celing
          // price floor
          (changeGraph.showPriceCeiling && regression.priceCeilingPoints[0][0]) && {
            type: 'line', // price floor line
            xref: 'x',
            yref: 'y',
            x0: 0,
            y0: regression.priceCeilingPoints[0][1],
            x1: range.qdmax,
            y1: regression.priceCeilingPoints[0][1],
            line: {
              color: 'black',
              width: 4,
              dash: 'dash',
            },
          },

          (changeGraph.showPriceCeiling && regression.priceCeilingPoints[0][0]) && {
            type: 'circle',
            xref: 'x',
            yref: 'y',
            x0: regression.priceCeilingPoints[0][0] - 0.75, // X coordinate of the dot
            y0: regression.priceCeilingPoints[0][1] - 0.75, // Y coordinate of the dot
            x1: regression.priceCeilingPoints[0][0] + 0.75, // X coordinate of the dot
            y1: regression.priceCeilingPoints[0][1] + 0.75, // Y coordinate of the dot
            fillcolor: 'blue', // Color of the dot
            layer: 'above',

            opacity: 1,
            line: {
              width: 0,

            },
          },

          (changeGraph.showPriceCeiling && regression.priceCeilingPoints[1][0]) && {
            type: 'circle',
            xref: 'x',
            yref: 'y',
            x0: regression.priceCeilingPoints[1][0] - 0.75, // X coordinate of the dot
            y0: regression.priceCeilingPoints[1][1] - 0.75, // Y coordinate of the dot
            x1: regression.priceCeilingPoints[1][0] + 0.75, // X coordinate of the dot
            y1: regression.priceCeilingPoints[1][1] + 0.75, // Y coordinate of the dot
            fillcolor: 'red', // Color of the dot
            layer: 'above',
            opacity: 1,
            line: {
              width: 0,
            },
          },

        ],
      }}
    />
  );
}
