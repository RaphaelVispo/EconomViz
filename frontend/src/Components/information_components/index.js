
import React, { useState } from 'react';
import {Nav, Card} from 'react-bootstrap';
import {Law_Of_Demand} from "./law_of_demand";
import {Law_of_Supply} from "./law_of_supply";
import { Matrix_Input } from '../matrix_input/matrix_input';



export function Card_information(props) {
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
        {(info === "Matrix_Input") && <Matrix_Input/>}
        {(info ===  "Law_of_Demand") && <Law_Of_Demand/>}
        {(info ===  "Law_of_Supply") && <Law_of_Supply />}


        </Card>
    )
}



  

