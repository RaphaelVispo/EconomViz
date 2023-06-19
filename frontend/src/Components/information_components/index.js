
import React, { useState } from 'react';
import {Nav, Card} from 'react-bootstrap';
import {Law_Of_Demand} from "./law_of_demand";
import {Law_of_Supply} from "./law_of_supply";
import { Matrix_Input } from '../matrix_input/matrix_input';



export function Card_information(props) {
    const { data_slider, adjust_slider, data_Demand, adjust_slope_slider, slope_slider ,shift_slider, adjust_shift_slider} =  props
    const [info, setInfo] = useState("Matrix_Input")

    const change_info  = (value) => {
        setInfo(value)
    }

    return (
        <Card id="info">
        <Card.Header>
        <Nav variant="pills" defaultActiveKey="#first">
            <Nav.Item>
            <Nav.Link onClick={()=>{ change_info("Matrix_Input")}}>Matrix</Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <Nav.Link onClick={()=>{ change_info("Law_of_Demand")}}>Law of Demand</Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <Nav.Link onClick={()=>{ change_info("Law_of_Supply")}}>Law of Supply</Nav.Link>
            </Nav.Item>
        </Nav>
        </Card.Header>
        {
            (info === "Matrix_Input") && <Matrix_Input/>

        }
        {
            (info ===  "Law_of_Demand") && <Law_Of_Demand
                shift_slider = {shift_slider}
                adjust_shift_slider  = {adjust_shift_slider}
                slope_slider = {slope_slider}
                data_Demand = {data_Demand}
                data_slider = {data_slider}
                adjust_slider = {adjust_slider}
                adjust_slope_slider = {adjust_slope_slider}
             />
        }
                {
            (info ===  "Law_of_Supply") && <Law_of_Supply />
        }


        </Card>
    )
}



  

