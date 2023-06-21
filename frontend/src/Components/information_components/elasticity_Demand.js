
import { InlineMath, BlockMath } from 'react-katex';
import { useContext } from 'react';
import ReactSlider from "react-slider";
import { usePlots } from '../../App';


export function Elasticity_Demand(props) {
    const {
        regression, setRegression,
        changeGraph, setChangeGraph,
        original, setOriginal,
        trevenue, setTrevenue } = useContext(usePlots);


    const Q1 = parseFloat(regression.demand.regression.qd[trevenue])
    const Q2 = parseFloat(regression.demand.regression.qd[trevenue - 1])
    const P1 = parseFloat(regression.demand.regression.price[trevenue])
    const P2 = parseFloat(regression.demand.regression.price[trevenue - 1])


    const elasticity = ((parseFloat(Q2) - parseFloat(Q1)) / (Q2 + Q1)) / ((P2 - P1) / (P2 + P1))



    return (
        <>
            <br />
            <br />


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
                value={changeGraph.slope}
                onChange={(slope) => {
                    setChangeGraph(plots => ({
                        ...plots,
                        slope: slope
                    }));
                }
                } />
            <br />


            <br />
            <h5>Change in Demand (shift) </h5>

            <ReactSlider
                className="customSlider"
                thumbClassName="customSlider-thumb"
                trackClassName="customSlider-track"
                markClassName="customSlider-mark"
                step={1}
                min={-100}
                max={100}
                defaultValue={0}
                value={changeGraph.shift}
                onChange={(shift) => {
                    setChangeGraph(plots => ({
                        ...plots,
                        shift: shift
                    }));
                }
                } />

            <br />
            <br />

            <h5> Own Price Elasticity of Demand </h5>
            <h6> Using Arc Elasticity </h6>
            <p> The own price elasticity of demend measures the responsiveness of
                Quantity Demanded of a good to change in its own price
            </p>
            <BlockMath
                math={`\\big | \\epsilon \\big |
              = \\left | \\frac{${Q2.toFixed(2)} - ${Q1.toFixed(2)}}{${Q2.toFixed(2)} + ${Q1.toFixed(2)}} \\div 
             \\frac{${P2.toFixed(2)} - ${P1.toFixed(2)}}{${P2.toFixed(2)} + ${P1.toFixed(2)}} \\right|
             =| ${elasticity.toFixed(2) === "-0.00" ? "0.00" : elasticity.toFixed(2)} | = ${Math.abs(elasticity.toFixed(2))}`}
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
                value={trevenue}
                onChange={(value) => setTrevenue(val => val = value)} />

        </>

    )
}