import React, { useEffect, useState, useContext } from 'react';
import Plot from 'react-plotly.js';
import { solvedRegeression, usePlots} from '../../App';

export function Plot_Law(props) {
    const { solved, setSolved, trevenue, setTrevenue} = useContext(solvedRegeression);
    const { plots, setUsePlots, original, setOriginal } = useContext(usePlots);
    const [plotWidth, setPlotWidth] = useState(0);
    const [qdmax, setqdmax ] = useState(0);
    const [pricemax, setpricemax] = useState(0);

    

    // for first instanciation of the app 
    // getting width of the 
    useEffect(
        () => {
            if (document.body.clientWidth > 900) {
                setPlotWidth(900)
                return;
            } else {
                setPlotWidth(document.body.clientWidth)
            }

        }, []
    )

    // id the window changes, rezise the graph
    window.addEventListener("resize", function (event) {
        if (document.body.clientWidth > 900) {
            setPlotWidth(900)
            return;
        }
        setPlotWidth(document.body.clientWidth)
    })


    useEffect(()=>{
        console.log("original", original, plots.demand.orginal)
        setqdmax(val => val = Math.max(...solved.demand.regression.qd))
        setpricemax(val => val = Math.max(...solved.demand.regression.price))
    }, [original])
    

    return (
        <>
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
                        x: solved.demand.regression.qd,
                        y: solved.demand.regression.price,
                        type: 'line',
                        marker: { color: 'blue' },
                        line: { width: 5 },
                        name: 'Demand Regression',
                    },
                    // {type: 'scatter',
                    //   x: data_Supply.original.X,
                    //   y: data_Supply.original.y,
                    //   mode: 'markers',
                    //   marker: {opacity: 0.5},
                    //   name: 'Supply Data',
                    // },
                    // {type: 'scatter',
                    //   x: data_Demand.original.X,
                    //   y: data_Demand.original.y,
                    //   mode: 'markers',
                    //   marker: {opacity: 0.5},
                    //   name: 'Demand Data',
                    // },
                ]}
                layout={{

                    width: plotWidth,
                    height: plotWidth,
                    margin: {
                        l: 50, // left margin
                        r: 50, // right margin
                        t: 50, // top margin
                        b: 50, // bottom margin
                        pad: 4 // padding between plot area and the margin
                    },
                    xaxis: {
                        title: 'Qd',
                        rangemode: 'tozero',
                        autotick: true,
                        range:[0, qdmax]
                    },
                    uirevision: 'initial_layout',
                    yaxis: {
                        title: 'Price',
                        rangemode: 'tozero',
                        autotick: true,
                        range: [0, pricemax]
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
                            x1: solved.demand.regression.qd[trevenue],
                            y1: solved.demand.regression.price[trevenue],
                            fillcolor: '#adadad',
                            opacity: 0.5,

                            line: {

                                width: 0

                            }
                        },

                    ]
                }}
            ></Plot>
        </>
    )

}
