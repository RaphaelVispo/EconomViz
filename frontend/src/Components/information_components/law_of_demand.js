import { InlineMath, BlockMath } from 'react-katex';
import { Profit_Max_Demand } from './profit_max_demand';
import React from 'react'

import {Container, Navbar, Nav, Row, Col, Card, Button} from 'react-bootstrap';
import { Elasticity_Demand } from './elasticity_Demand';


export function Law_Of_Demand(props) {
    const { data_slider, adjust_slider, data_Demand, adjust_slope_slider, slope_slider ,shift_slider, adjust_shift_slider} =  props


    return (
        <Container style={{ padding: '30px' }}>
            <br/>

            <h2> Law of Demand</h2>
            <p> Demand refers to the various quatities of the a good or service that users/consumers are willing and able to buy.</p>
            <br/>

            <h5> Demand Equation</h5>
            <p> Quantity demanded <InlineMath math="(Qd)"/> if a function of the price <InlineMath math="(P)"/> </p>
            
            <BlockMath> Qd = a-bP</BlockMath>

            <Profit_Max_Demand
                data_Demand = {data_Demand}

                data_slider = {data_slider}
                adjust_slider = {adjust_slider}
             />
            <Elasticity_Demand 
                shift_slider = {shift_slider}
                adjust_shift_slider  = {adjust_shift_slider}
                data_slider = {data_slider}
                adjust_slider = {adjust_slider}
                slope_slider = {slope_slider}
                data_Demand = {data_Demand}
                adjust_slope_slider = {adjust_slope_slider}

            />
             
        </Container>
    );
  }
  