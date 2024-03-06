import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'

const Header = () => {
  return (
    <header>
      <Navbar expand="lg" className="bg-body-tertiary" bg='dark' data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">ShopSphere</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/cart"><i className='fas fa-shopping-cart'></i> Cart</Nav.Link>
              <Nav.Link href="/login"><i className='fas fa-user'></i> Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
    </Navbar>
    </header>
  )
}

export default Header