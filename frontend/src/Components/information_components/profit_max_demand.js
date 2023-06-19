
import { InlineMath, BlockMath } from 'react-katex';

import ReactSlider from "react-slider";


export function Profit_Max_Demand (props) {
    const { data_slider, adjust_slider, data_Demand} =  props

    const demand_Regression_Qd = data_Demand.regression.X[data_slider]
    const demand_Regression_P = data_Demand.regression.y[data_slider]
    const Total = demand_Regression_Qd*demand_Regression_P

    return (
    <>

        <h5> Total Revenue Equation</h5>
        <BlockMath>TR ~= ~ P \times Q</BlockMath>
        <BlockMath
             math={`TR =${parseFloat(demand_Regression_P).toFixed(2)} ~\\times~ ${parseFloat(demand_Regression_Qd).toFixed(2)} ~= ~${Total.toFixed(2)}`}
        />

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
    
    </>

    )
}


