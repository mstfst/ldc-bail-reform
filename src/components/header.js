import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import { Navbar, Nav } from "react-bootstrap"
// import './header.module.scss'
// import headerStyles from './header.module.scss';

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/">Bail Reform Project</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} activeClassName="active" to="/">Introduction</Nav.Link>
          <Nav.Link as={Link} activeClassName="active" to="/narrative">Narrative</Nav.Link>
          <Nav.Link as={Link} activeClassName="active" to="/system-map">System Map</Nav.Link>
          <Nav.Link as={Link} activeClassName="active" to="/methodology">Methodology</Nav.Link>
          <Nav.Link as={Link} activeClassName="active" to="/cta">CTA</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header;