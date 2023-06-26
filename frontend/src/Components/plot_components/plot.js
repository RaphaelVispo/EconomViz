import React, { useEffect, useState, useContext } from 'react';
import Plot from 'react-plotly.js';
import { usePlots } from '../../App';

export function PlotLaw() {
  const {
    regression,
    range,
    trevenue,
    changeGraph
  } = useContext(usePlots);

  const [plotWidth, setPlotWidth] = useState(0);

  // for first instanciation of the app
  // getting width of the
  useEffect(() => {
    console.log(changeGraph)
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
          { // Demand point
            type: 'circle',
            xref: 'x',
            yref: 'y',
            x0: regression.demand.regression.qd[trevenue] - 0.75, // X coordinate of the dot
            y0: regression.demand.regression.price[trevenue] - 0.75, // Y coordinate of the dot
            x1: regression.demand.regression.qd[trevenue] + 0.75, // X coordinate of the dot
            y1: regression.demand.regression.price[trevenue] + 0.75, // Y coordinate of the dot
            fillcolor: 'blue', // Color of the dot
            opacity: 1,
            line: {
              width: 0,
            },
          },
          {

            type: 'rect',
            xref: 'x',
            yref: 'y',
            x0: 0,
            y0: 0,
            x1: regression.demand.regression.qd[trevenue],
            y1: regression.demand.regression.price[trevenue],
            fillcolor: '#adadad',
            opacity: 0.5,
            layer:"below",
            line: {

              width: 0,

            },
          },

          regression.priceEquilibrium[0] && { // equilibrium point
            type: 'circle',
            xref: 'x',
            yref: 'y',
            x0: regression.priceEquilibrium[0] - 0.75, // X coordinate of the dot
            y0: regression.priceEquilibrium[1] - 0.75, // Y coordinate of the dot
            x1: regression.priceEquilibrium[0]+ 0.75, // X coordinate of the dot
            y1: regression.priceEquilibrium[1] + 0.75, // Y coordinate of the dot
            fillcolor: 'black', // Color of the dot
            opacity: 1,
            line: {
              color: 'black', // Color of the dot's outline
              width: 0,
            },
          },

          // price floor
          (changeGraph.showPriceFloor && regression.priceFloorPoints[0][0]) &&{
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

          (changeGraph.showPriceFloor && regression.priceFloorPoints[0][0]) &&{
            type: 'circle',
            xref: 'x',
            yref: 'y',
            x0: regression.priceFloorPoints[0][0]- 0.75, // X coordinate of the dot
            y0: regression.priceFloorPoints[0][1] - 0.75, // Y coordinate of the dot
            x1: regression.priceFloorPoints[0][0]+ 0.75, // X coordinate of the dot
            y1: regression.priceFloorPoints[0][1] + 0.75, // Y coordinate of the dot
            fillcolor: 'blue', // Color of the dot
            layer:"above",

            opacity: 1,
            line: {
              width: 0,

            },
          },

          (changeGraph.showPriceFloor && regression.priceFloorPoints[1][0]) &&{
            type: 'circle',
            xref: 'x',
            yref: 'y',
            x0: regression.priceFloorPoints[1][0]- 0.75, // X coordinate of the dot
            y0: regression.priceFloorPoints[1][1] - 0.75, // Y coordinate of the dot
            x1: regression.priceFloorPoints[1][0]+ 0.75, // X coordinate of the dot
            y1: regression.priceFloorPoints[1][1] + 0.75, // Y coordinate of the dot
            fillcolor: 'red', // Color of the dot
            layer:"above",
            opacity: 1,
            line: {
              width: 0,
            },
          },

          // {
          //   type: 'line', // price floor line
          //   xref: 'x',
          //   yref: 'y',
          //   x0: 0,
          //   y0: regression.demand.regression.price[trevenue],
          //   x1: regression.demand.regression.qd[trevenue],
          //   y1: regression.demand.regression.price[trevenue],
          //   layer:"below",
          //   line: {
          //     color: 'black',
          //     width: 2,
          //     dash: 'dash',
          //   },
          // },

        ],
      }}
    />
  );
}
