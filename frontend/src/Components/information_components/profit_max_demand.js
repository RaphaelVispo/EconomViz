

import ReactSlider from "react-slider";


export function Profit_Max_Demand (props) {
    const { data_slider, adjust_slider} =  props

    return (
        <ReactSlider
        className="customSlider"
        thumbClassName="customSlider-thumb"
        trackClassName="customSlider-track"
        markClassName="customSlider-mark"
        marks={20}
        min={0}
        max={100}
        defaultValue={0}
        value={data_slider}
        onChange={(value) => adjust_slider(value)}

    />
    )
}


// 

//shapes: [
//   {
//     type: 'line',
//     x0: 1,
//     x1: 1,
//     y0: 1, // Set the desired range for the y-axis
//     y1: 1, // Set the desired range for the y-axis
//     line: {
//       color: 'black',
//       width: 2,
//       dash: 'dash',
//     },
//   },
// ],
// annotations: [
//   {
//     x: 1,
//     y: 1,
//     text: 'Pointer Text',
//     showarrow: true,
//     arrowhead: 7,
//     ax: -50,
//     ay: -50,
//   },
// ]