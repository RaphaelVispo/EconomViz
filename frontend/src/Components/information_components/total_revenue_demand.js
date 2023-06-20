
import { InlineMath, BlockMath } from 'react-katex';
import { useContext } from 'react';
import { solvedRegeression } from '../../App';
import ReactSlider from "react-slider";


export function Total_Revenue_Demand(props) {
    const { solved, setSolved, trevenue, setTrevenue } = useContext(solvedRegeression);

    const demand_Regression_Qd = solved.demand.regression.qd[trevenue]
    const demand_Regression_P = solved.demand.regression.price[trevenue]
    const Total = demand_Regression_Qd * demand_Regression_P

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
                value={trevenue}
                onChange={(value) => setTrevenue(val => val = value)}

            />

        </>

    )
}


