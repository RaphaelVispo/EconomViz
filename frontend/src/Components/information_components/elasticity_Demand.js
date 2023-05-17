
import { InlineMath, BlockMath } from 'react-katex';

import ReactSlider from "react-slider";


export function Elasticity_Demand (props) {
    const { slope_slider, data_Demand, adjust_slope_slider} =  props
    console.log(props)

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
        onChange={(value) => adjust_slope_slider(value)}

    />
    
    </>

    )
}