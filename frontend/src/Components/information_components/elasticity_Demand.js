
import { InlineMath, BlockMath } from 'react-katex';

import ReactSlider from "react-slider";


export function Elasticity_Demand (props) {
    const { slope_slider, data_Demand, adjust_slope_slider, data_slider, adjust_slider } =  props

    const l  = 10

    const Q1 = parseFloat(data_Demand.regression.X[data_slider])
    const Q2 = parseFloat(data_Demand.regression.X[data_slider-1])
    const P1 = parseFloat(data_Demand.regression.y[data_slider])
    const P2 = parseFloat(data_Demand.regression.y[data_slider-1])

    console.log(typeof(Q1))

    const elasticity = ((parseFloat(Q2)-parseFloat(Q1)) / (Q2+Q1))/((P2 - P1) /(P2 + P1)) 
    console.log(`(Q2-Q1) = ${(Q2-Q1)} / (Q2+Q1)) = ${(Q2+Q1)}/((P2 - P1) = ${(P2 - P1)}/(P2 + P1) = ${(P2 + P1)}`)
    // console.log(`(Q2-Q1)/ (Q2+Q1)) = ${(Q2-Q1)/(Q2+Q1)}/((P2 - P1) /(P2 + P1) = ${(P2 - P1)/(P2 + P1)}`)


    return (
    <>
        <br/>
        <br/>

        <h5> Elasticity of demand </h5>
        <h6> Slope Slider</h6>


        <BlockMath
             math={`${slope_slider}`}
        />

        <ReactSlider
        className="customSlider"
        thumbClassName="customSlider-thumb"
        trackClassName="customSlider-track"
        markClassName="customSlider-mark"
        marks={20}
        min={-50}
        max={100}
        defaultValue={0}
        value={slope_slider}
        onChange={(value) => adjust_slope_slider(value)} />

        <br/>
        <br/>

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