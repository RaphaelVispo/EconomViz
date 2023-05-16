
import React from 'react';
import {Container, Navbar, Nav, Row, Col, Card, Button} from 'react-bootstrap';
import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";
import {Law_Of_Demand} from "./information_components/law_of_demand";
import {Law_of_Supply} from "./information_components/law_of_supply";



export function Card_information() {
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
        <Route path="/law_of_demand" element={<Law_Of_Demand />} />
        <Route path="/law_of_supply" element={<Law_of_Supply />} />
        </Routes>
        </BrowserRouter>
        </Card>
    )
}



  
