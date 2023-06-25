import { InlineMath, BlockMath } from 'react-katex';
import React, { useContext } from 'react';
import { usePlots } from '../../../App';
import { Container } from 'react-bootstrap';
import TotalRevenueDemand from './TotalRevenueDemand';
import ElasticityDemand from './ElasticityDemand';

export function LawOfDemand() {
  const {
    regression
  } = useContext(usePlots);
  return (
    <Container className="p-3">

      <h2> Law of Demand</h2>
      <p>
        {' '}
        Demand refers to the various quatities of the a good
        or service that users/consumers are willing and able to buy.
      </p>

      <h5> Demand Equation</h5>
      <p>
        {' '}
        Quantity demanded
        <InlineMath math="(Qd)" />
        {' '}
        if a function of the price
        <InlineMath math="(P)" />
      </p>

      <BlockMath> Qd = a-bP</BlockMath>
      <h4>
        Equilibrium Point:
      </h4>
      <BlockMath math={regression.priceEquilibrium[0] ? String.raw`Q^* = ${parseFloat(regression.priceEquilibrium[0]).toFixed(2)}, 
      ~~~~~~~~ P^* = ${parseFloat(regression.priceEquilibrium[1]).toFixed(2)}`: "\\text{No equilibrium point}"} />

      <TotalRevenueDemand />
      <ElasticityDemand />

    </Container>
  );
}
