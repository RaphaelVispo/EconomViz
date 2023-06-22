import { InlineMath, BlockMath } from 'react-katex';
import React from 'react';

import { Container } from 'react-bootstrap';
import TotalRevenueDemand from './TotalRevenueDemand';
import ElasticityDemand from './ElasticityDemand';

export function LawOfDemand() {
  return (
    <Container className="p-3">

      <h2> Law of Demand</h2>
      <p> Demand refers to the various quatities of the a good or service that users/consumers are willing and able to buy.</p>

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

      <TotalRevenueDemand />
      <ElasticityDemand />

    </Container>
  );
}
