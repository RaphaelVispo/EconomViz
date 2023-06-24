import React, { useState } from 'react';
import { Nav, Card } from 'react-bootstrap';
import { LawOfDemand } from './LawOfDemand/LawOfDemand';
import { LawOfSupply } from './LawOfSupply/LawOfSupply';
import { MatrixInput } from '../MatrixInput/MatrixInput';

export function CardInformation() {
  const [info, setInfo] = useState('MatrixInput');

  const changeInfo = (value) => {
    setInfo(value);
  };

  return (
    <Card id="info">
      <Card.Header>
        <Nav variant="pills" defaultActiveKey="#first">
          <Nav.Item>
            <Nav.Link onClick={() => { changeInfo('MatrixInput'); }}>Plot</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={() => { changeInfo('LawOfDemand'); }}>Demand</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={() => { changeInfo('LawOfSupply'); }}>Supply</Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>
      {(info === 'MatrixInput') && <MatrixInput />}
      {(info === 'LawOfDemand') && <LawOfDemand />}
      {(info === 'LawOfSupply') && <LawOfSupply />}

    </Card>
  );
}
