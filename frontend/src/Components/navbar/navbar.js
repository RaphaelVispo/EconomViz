import React, {
  Container, Navbar, Nav,
} from 'react-bootstrap';

export function NavBarMain() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>EconomViz</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>Introduction to Economics</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
