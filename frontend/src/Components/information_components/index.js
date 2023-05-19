
import React from 'react';
import {Container, Navbar, Nav, Row, Col, Card, Button} from 'react-bootstrap';
import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";
import {Law_Of_Demand} from "./law_of_demand";
import {Law_of_Supply} from "./law_of_supply";



export function Card_information(props) {
    const { data_slider, adjust_slider, data_Demand, adjust_slope_slider, slope_slider ,shift_slider, adjust_shift_slider} =  props

    return (
        <Card id="info">
        <Card.Header>
        <Nav variant="pills" defaultActiveKey="#first">
            <Nav.Item>
            <Nav.Link href="/matrix" >Matrix</Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <Nav.Link href="/law_of_demand">Law of Demand</Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <Nav.Link href="/law_of_supply">Law of Supply</Nav.Link>
            </Nav.Item>
        </Nav>
        </Card.Header>
        <BrowserRouter>
        <Routes>
        <Route path="/law_of_demand" element={<Law_Of_Demand
                    shift_slider = {shift_slider}
                    adjust_shift_slider  = {adjust_shift_slider}
                    slope_slider = {slope_slider}
                    data_Demand = {data_Demand}
                    data_slider = {data_slider}
                    adjust_slider = {adjust_slider}
                    adjust_slope_slider = {adjust_slope_slider}
        />} />
        <Route path="/law_of_supply" element={<Law_of_Supply />} />
        </Routes>
        </BrowserRouter>
        </Card>
    )
}



  

