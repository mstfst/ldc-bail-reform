import React from "react"

import { Link, graphql, useStaticQuery } from "gatsby"
import { Navbar, Nav, Container } from "react-bootstrap"
import headerStyles from "./header.module.scss"
import ProgressBar from "./progress-bar"

/* Import SVG Components */
import Logo from "../../static/assets/svg/logo_navbar.svg"

const Header = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/" aria-label="Go to homepage">
          <Logo width={200}/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className={headerStyles.nav}>
          <Nav className="ml-auto">
            <Nav.Link as={Link} activeClassName="active" to="/narrative">Stories</Nav.Link>
            <Nav.Link as={Link} activeClassName="active" to="/system-map">System Map</Nav.Link>
            <NavDropdown title="Issues" className="nav-dropdown"  activeClassName="active">
              <NavDropdown.Item href="/issue1">Damaging Lives</NavDropdown.Item>
              <NavDropdown.Item href="/issue2">Denying Dignity</NavDropdown.Item>
              <NavDropdown.Item href="/issue3">Culture of Fear</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={Link} activeClassName="active" to="/methodology">Methodology</Nav.Link>
            <Nav.Link as={Link} activeClassName="active" to="/cta" className={headerStyles.ctaHover}><p className={headerStyles.cta}>Get Involved</p></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <ProgressBar/>

  )
}

export default Header
