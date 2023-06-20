import { InlineMath, BlockMath } from 'react-katex';
import { Total_Revenue_Demand } from './total_revenue_demand';
import React from 'react'

import {Container, Navbar, Nav, Row, Col, Card, Button} from 'react-bootstrap';
import { Elasticity_Demand } from './elasticity_Demand';


export function Law_Of_Demand(props) {


    return (
        <Container style={{ padding: '1.5em' }}>


            <h2> Law of Demand</h2>
            <p> Demand refers to the various quatities of the a good or service that users/consumers are willing and able to buy.</p>


            <h5> Demand Equation</h5>
            <p> Quantity demanded <InlineMath math="(Qd)"/> if a function of the price <InlineMath math="(P)"/> </p>
            
            <BlockMath> Qd = a-bP</BlockMath>

            <Total_Revenue_Demand/>
            <Elasticity_Demand />
             
        </Container>
    );
  }
  