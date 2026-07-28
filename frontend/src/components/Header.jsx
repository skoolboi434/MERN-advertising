import React, { useState } from 'react';
import { Navbar, Nav, Container, Offcanvas, Button } from 'react-bootstrap';
import { FaUser, FaBars, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
        <Container>
          <Button variant='dark' className='me-2' onClick={() => setShowSidebar(true)}>
            <FaBars />
          </Button>
          <LinkContainer to='/'>
            <Navbar.Brand className='m-auto'>MERN - Advertising</Navbar.Brand>
          </LinkContainer>
        </Container>
      </Navbar>

      <Offcanvas show={showSidebar} onHide={() => setShowSidebar(false)} placement='start'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className='flex-column'>
            <LinkContainer to='/'>
              <Nav.Link>
                <FaHome /> Dashboard
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to='/publications'>
              <Nav.Link>Publications</Nav.Link>
            </LinkContainer>
            {/* <Nav.Link href='/ad-types'>Ad Types</Nav.Link>
            <Nav.Link href='/pricing'>Pricing</Nav.Link>
            <Nav.Link href='/financial'>Financial</Nav.Link>
            <Nav.Link href='/accounts'>Accounts</Nav.Link> */}
            <Nav.Link href='/login'>
              <FaUser /> Sign In
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </header>
  );
};

export default Header;
