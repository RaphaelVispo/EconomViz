
import {Container, Navbar, Nav, Row, Col, Card, Button} from 'react-bootstrap';

export function NavBar_Main (){
    return(
        <>
            <Navbar  bg="light"  expand="lg">
            <Container>
                <Navbar.Brand >EconomViz</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link>ECON 11</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </>
    )
}