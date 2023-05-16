import { InlineMath, BlockMath } from 'react-katex';
import React from 'react'
import {Container, Navbar, Nav, Row, Col, Card, Button} from 'react-bootstrap';



export function Law_of_Supply() {
    return (
        <Container style={{ padding: '30px' }}>
        <br/>

        <h2> Law of Supply</h2>
        <p> Suppy refers to thee quatities of the a good or service that producers/firms are willing and able to offer for sale.</p>
        <br/>

        <h5> Supply Equation</h5>
        <p> Quantity Supplied <InlineMath math="(Qs)"/> if a function of the price <InlineMath math="(P)"/> </p>

        <BlockMath> Qd = c-dP</BlockMath>


    </Container>
      
    );
  }
