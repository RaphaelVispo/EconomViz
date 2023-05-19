import Plot from 'react-plotly.js';


export function Plot_Law (props) {
    const {data_Supply, data_Demand, data_slider} = props

    return(
        <>
    <Plot
    data={[

    {
        x: data_Supply.regression.X  ,
        y: data_Supply.regression.y ,
        type: 'line',
        marker: {color: 'red'},
        line: { width: 5} ,
        name: 'Supply Regression',
    },
    {
        x: data_Demand.regression.X  ,
        y: data_Demand.regression.y ,
        type: 'line',
        marker: {color: 'blue'},
        line: { width: 5} ,
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
    
        width: 950,
        height: 800,
        margin: {
        l: 50, // left margin
        r: 50, // right margin
        t: 50, // top margin
        b: 50, // bottom margin
        pad: 4 // padding between plot area and the margin
        },
        xaxis: {
        rangemode: 'tozero', 
        autotick: false,
        range: [0, 5]
        },
        yaxis: {
        rangemode: 'tozero', 
        autotick: false,
        range: [0, 16]
        },
        shapes : [
        {

            type: 'rect',
            xref: 'x',
            yref: 'y',
            x0: 0,
            y0: 0,
            x1: data_Demand.regression.X[data_slider],
            y1: data_Demand.regression.y[data_slider],
            fillcolor: '#adadad',
            opacity: 0.5,

            line: {

                width: 0

            }
        }
        ]
        }}
    ></Plot>       
        </>
    )

}