import { BlockMath } from 'react-katex';
import React, { useContext } from 'react';
import ReactSlider from 'react-slider';
import { usePlots } from '../../../App';

export default function TotalRevenueDemand() {
  const {
    regression, trevenue, setTrevenue,
  } = useContext(usePlots);

  const demandRegressionQd = regression.demand.regression.qd[trevenue];
  const demandRegressionP = regression.demand.regression.price[trevenue];
  const Total = demandRegressionQd * demandRegressionP;

  return (
    <>

      <h5> Total Revenue Equation</h5>
      <BlockMath>TR ~= ~ P \times Q</BlockMath>
      <BlockMath
        math={`TR =${parseFloat(demandRegressionP).toFixed(2)} ~\\times~ ${parseFloat(demandRegressionQd).toFixed(2)} ~= ~${Total.toFixed(2)}`}
      />

      <ReactSlider
        className="customSlider"
        thumbClassName="customSlider-thumb"
        trackClassName="customSlider-track"
        markClassName="customSlider-mark"
        marks={20}
        min={0}
        max={regression.demand.regression.qd.length - 1}
        defaultValue={0}
        value={trevenue}
        onChange={(value) => setTrevenue(() => value)}
      />

    </>

  );
}
