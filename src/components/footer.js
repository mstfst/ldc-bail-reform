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
        <p className="m-0 py-3">Created by <a href="https://lawdesigncolab.ca/" title="Law &amp; Design Co-Lab" aria-label="Learn more about the civic tech nonprofit behind this project">{data.site.siteMetadata.author}</a> <a href="https://creativecommons.org/licenses/by-sa/4.0/" title="Creative Commons BY-SA 4.0">Creative Commons BY-SA 4.0</a> 2020</p>
      </Container>
    </footer>
  )
}

export default Footer;
