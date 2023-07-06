import { InlineMath, BlockMath } from 'react-katex';
import React, { useContext } from 'react';
import {
  Container,
} from 'react-bootstrap';
import { usePlots } from '../../../App';
import ElasticitySupply from './PriceChange';

export function LawOfSupply() {
  const {
    regression,
  } = useContext(usePlots);
  return (
    <Container className="p-3">
      <h2> Law of Supply</h2>
      <p>
        {' '}
        Suppy refers to thee quatities of the a good or service that
        producers/firms are willing and able to offer for sale.
      </p>
      <br />

      <h5> Supply Equation</h5>
      <p>
        {' '}
        Quantity Supplied
        <InlineMath math="(Qs)" />
        {' '}
        if a function of the price
        <InlineMath math="(P)" />
      </p>

      <BlockMath> Qd = c-dP</BlockMath>

      <BlockMath math={String.raw`Q^* = ${parseFloat(regression.priceEquilibrium[0]).toFixed(2)},
       P^* = ${parseFloat(regression.priceEquilibrium[1]).toFixed(2)}`}
      />

      <ElasticitySupply />
    </Container>

  );
}
