import React, { useState } from 'react';
import { Navbar, Nav, Container, Offcanvas, Button, NavDropdown } from 'react-bootstrap';
import { FaUser, FaBars, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { userInfo } = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

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
            {userInfo ? (
              <NavDropdown title={userInfo.username} id='username'>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to='/login'>
                <Nav.Link>
                  <FaUser /> Sign In
                </Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </header>
  );
};

export default Header;
