/* Import React, Gatsby & React Bootstrap */
import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { Row, Col, Jumbotron, Button, Container, Card } from "react-bootstrap"
import Img from "gatsby-image"
import BackgroundImage from "gatsby-background-image"

/* Import Layout Components */
import Layout from "../components/layout"
import Head from "../components/head";

/* Import graphics */
import HomeLogo from "../../static/assets/svg/logo_homepage.svg";

const IndexPage = () => {
  const data = useStaticQuery(graphql `
    query {
      homeHero: file(relativePath: { eq: "images/home_hero.jpg" }) {
        childImageSharp {
          fluid(quality: 90, maxWidth: 2000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      issue1: file(relativePath: { eq: "images/issue1.jpg" }) {
        childImageSharp {
          fixed(width: 250) {
            ...GatsbyImageSharpFixed_tracedSVG
          }
        }
      }
      issue2: file(relativePath: { eq: "images/issue2.jpg" }) {
        childImageSharp {
          fixed(width: 250) {
            ...GatsbyImageSharpFixed_tracedSVG
          }
        }
      }
      issue3: file(relativePath: { eq: "images/issue3.jpg" }) {
        childImageSharp {
          fixed(width: 250) {
            ...GatsbyImageSharpFixed_tracedSVG
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <Head title="Home" />
      <Jumbotron 
        className="hero vh-100" 
        fluid>
        <BackgroundImage
          className="h-100"
          fluid={data.homeHero.childImageSharp.fluid}
          backgroundColor={`#F08FDB`}
          alt="A jail cell overlaid with a stylized pink dot pattern"
        >
          <Container
            className="h-100"
          >
            <Row className="h-100 justify-content-center align-items-center">   
              <Col md="8" className="text-center">
                <HomeLogo fill='#fff' className="mt-2 mb-5 w-50"/>
                <h1 className="display-1 mb-5 text-rust uppercase">
                  <span className="hero-em px-5">Coming Soon!</span>
                </h1>
                <p className="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui diam amet, quis mauris lorem. Ipsum tristique pellentesque lawdesigncolab.ca</p>
              </Col>
            </Row>
          </Container>
        </BackgroundImage>
      </Jumbotron>

      
    </Layout>
  )
}

export default IndexPage;