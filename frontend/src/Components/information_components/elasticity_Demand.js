
import { InlineMath, BlockMath } from 'react-katex';

import ReactSlider from "react-slider";


export function Elasticity_Demand (props) {
    const { slope_slider, data_Demand, adjust_slope_slider, data_slider, adjust_slider ,shift_slider, adjust_shift_slider } =  props


    const Q1 = parseFloat(data_Demand.regression.X[data_slider])
    const Q2 = parseFloat(data_Demand.regression.X[data_slider-1])
    const P1 = parseFloat(data_Demand.regression.y[data_slider])
    const P2 = parseFloat(data_Demand.regression.y[data_slider-1])


    const elasticity = ((parseFloat(Q2)-parseFloat(Q1)) / (Q2+Q1))/((P2 - P1) /(P2 + P1)) 



    return (
    <>
        <br/>
        <br/>

        
        <h5> Rotate</h5>

{/* 
        <BlockMath
             math={`${slope_slider}`}
        /> */}

        <ReactSlider
        className="customSlider"
        thumbClassName="customSlider-thumb"
        trackClassName="customSlider-track"
        markClassName="customSlider-mark"
        marks={20}
        min={-100}
        max={100}
        defaultValue={0}
        value={slope_slider}
        onChange={(value) => adjust_slope_slider(value)} />
        <br/>


        <br/>
        <h5>Change in Demand (shift) </h5>

        <ReactSlider
        className="customSlider"
        thumbClassName="customSlider-thumb"
        trackClassName="customSlider-track"
        markClassName="customSlider-mark"
        step={0.5}
        min={-100}
        max={100}
        defaultValue={0}
        value={shift_slider}
        onChange={(value) => adjust_shift_slider(value)} />

        <br/>
        <br/>

        <h5> Own Price Elasticity of Demand </h5>
        <h6> Using Arc Elasticity </h6>
        <p> The own price elasticity of demend measures the responsiveness of
            Quantity Demanded of a good to change in its own price
        </p>
        <BlockMath
             math={`\\big | \\epsilon \\big |
              = \\left | \\frac{${Q2.toFixed(2)} - ${Q1.toFixed(2)}}{${Q2.toFixed(2)} + ${Q1.toFixed(2)}} \\div 
             \\frac{${P2.toFixed(2)} - ${P1.toFixed(2)}}{${P2.toFixed(2)} + ${P1.toFixed(2)}} \\right|
             =| ${elasticity.toFixed(2) === "-0.00"? "0.00" : elasticity.toFixed(2)} | = ${Math.abs(elasticity.toFixed(2))}`}
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
        onChange={(value) => adjust_slider(value)} />
    
    </>

    )
}