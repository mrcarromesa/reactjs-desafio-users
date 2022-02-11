import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// import { Container } from './styles';

const Header: React.FC = () => (
  <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand to="/home" as={Link}>
        Dashboard
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link to="/home" as={Link}>
            Cadastro
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default Header;
