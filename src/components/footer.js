import React from "react"
import { graphql, useStaticQuery } from "gatsby"
// import footerStyles from "./footer.module.scss"
import { Container } from "react-bootstrap";

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author
        }
      }
    }
  `);

  return (
    <footer className={`bg-dark text-white text-center`}>
      <Container> 
        <p className="m-0 py-3">Created by {data.site.siteMetadata.author} © 2020</p>
      </Container>
    </footer>
  )
}

export default Footer;