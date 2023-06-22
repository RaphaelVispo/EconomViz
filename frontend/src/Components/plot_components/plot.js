import React, { useEffect, useState, useContext } from 'react';
import Plot from 'react-plotly.js';
import { usePlots } from '../../App';

export function PlotLaw() {
  const {
    regression,
    range,
    trevenue,
  } = useContext(usePlots);

  const [plotWidth, setPlotWidth] = useState(0);

  // for first instanciation of the app
  // getting width of the
  useEffect(() => {
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

        // {
        //     x: data_Supply.regression.X  ,
        //     y: data_Supply.regression.y ,
        //     type: 'line',
        //     marker: {color: 'red'},
        //     line: { width: 5} ,
        //     name: 'Supply Regression',
        // },
        {
          x: regression.demand.regression.qd,
          y: regression.demand.regression.price,
          type: 'line',
          marker: { color: 'blue' },
          line: { width: 5 },
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

            line: {

              width: 0,

            },
          },

        ],
      }}
    />
  );
}
