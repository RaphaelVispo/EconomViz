import { InlineMath, BlockMath } from 'react-katex';

import React from 'react'
import {Container, Navbar, Nav, Row, Col, Card, Button} from 'react-bootstrap';


export function Law_Of_Demand() {
    return (
        <Container style={{ padding: '30px' }}>
            <br/>

            <h2> Law of Demand</h2>
            <p> Demand refers to the various quatities of the a good or service that users/consumers are willing and able to buy.</p>
            <br/>

            <h5> Demand Equation</h5>
            <p> Quantity demanded <InlineMath math="(Qd)"/> if a function of the price <InlineMath math="(P)"/> </p>

            <BlockMath> Qd = a-bP</BlockMath>


        </Container>
    );
  }
  