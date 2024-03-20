import React from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { Link } from "react-router-dom"
import { useUserStore } from '../store'

const Header = () => {
  const { user, logout } = useUserStore()

  const logoutHandler = (e) => {
    logout()
    localStorage.removeItem('user')
  }

  return (
    <header>
      <Navbar expand="lg" className="bg-body-tertiary" bg='dark' data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to='/'>ShopSphere</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to='/cart'><i className='fas fa-shopping-cart'></i> Cart</Nav.Link>
              {user ? 
              (<NavDropdown title={user.name} id='username'> 
                  <NavDropdown.Item>
                    <Nav.Link as='li' to='/profile'>Profile</Nav.Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Nav.Link as='li' onClick={logoutHandler}>Logout</Nav.Link>
                  </NavDropdown.Item>
              </NavDropdown>)

              : <Nav.Link as={Link} to='/login'><i className='fas fa-user'></i> Login</Nav.Link>}
            </Nav>
          </Navbar.Collapse>
        </Container>
    </Navbar>
    </header>
  )
}

export default Header