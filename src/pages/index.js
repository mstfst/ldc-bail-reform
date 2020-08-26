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
          fluid(quality: 90) {
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
        className="hero"
        fluid>
        <BackgroundImage
          className="hero-bg"
          fluid={data.homeHero.childImageSharp.fluid}
          backgroundColor={`#F08FDB`}
          alt="A jail cell overlaid with a stylized pink dot pattern"
        >
          {/* <div className="coming-soon-overlay"> */}
            <Container className="h-100 pt-5 pb-5">
              <Row className="justify-content-center align-items-center">
                <Col md="8" className="text-center">
                  <HomeLogo fill='#fff' className="mt-2 mb-4" width={250}/>
                  <h1 className="display-1 mb-5 text-rust uppercase">
                    <span className="hero-em p-3">Coming Soon!</span>
                  </h1>
                  <h2 className="text-rust display-2 uppercase mb-0 pb-0">Ontario's Bail System is broken</h2>
                  <h3 className="text-rust uppercase lh-1">and more people need to know:</h3>
                </Col>
              </Row>
              <Row className="justify-content-center mt-2 mb-4">
                <Col sm="6" lg="4" className="text-center mt-5">
                  <div className="card tilted-left h-100 mb-5">
                    <div className="card-body bg-dark text-white px-3 display-4">
                      <span className="straight-text">70% of people held in Ontario jails are legally innocent awaiting a bail hearing or court date.</span>
                      </div>
                  </div>
                </Col>
                <Col sm="6" lg="4" className="text-center mt-5">
                  <div className="card tilted-right h-100 mb-5">
                    <div className="card-body bg-dark text-white px-3 display-4">Among those people in jail awaiting a bail hearing, Black people are overrepresented by 300% and Indigenous people by 500%.</div>
                  </div>
                </Col>
                <Col sm="6" lg="4" className="text-center mt-5">
                  <div className="card tilted-left h-100 mb-5">
                      <div className="card-body bg-dark text-white px-3 display-4">Ontario’s overall population has grown by 50% in the last 30 years but the number of people in jail awaiting a bail hearing has grown by 300%</div>
                  </div>
                </Col>
              </Row>
            </Container>
          {/* </div> */}
        </BackgroundImage>
      </Jumbotron>

      <Container>
        <Row id="main" className="justify-content-md-center">
          <Col className="mt-5" md="10">
            <p>We’re a group of creatives who are working to help Canadians better understand their legal system: its strengths, weaknesses, and the urgent need for reform.</p>
            <p>In the US, Canada, and across the world, the Black Lives Matter movement has generated an unprecedented level of public awareness about the need for transformative change in our legal system. Through sustained public education, pressure, and advocacy, we can create a “new normal” for our criminal legal system.</p>
            <p>We’re advocating for change in Ontario’s bail system by doing what we do best: creating multimedia content to engage and mobilize audiences.</p>
          </Col>
        </Row>
        <h1 className="text-pink text-center uppercase mt-3 mb-5">Join Us!</h1>
      </Container>

      <Container>
        <Row className="justify-content-center">
          <Col md="6" lg="5" className="pb-4">
            <div className="card bg-rust tilted-left px-2 py-1 inline-block">
              <h3 className="text-white uppercase">Sign Up</h3>
            </div>
            <p className="mt-3">Sign up for <a href="https://airtable.com/shrFS2nS5cPNWvjxa">our mailing list</a>! You’ll be the first to know:</p>
            <ul className="text-left">
              <li className="text-left">when the unlockbailreform.ca goes live and is updated</li>
              <li className="text-left">about virtual events featuring thought leaders at the intersections of law, civic action, and creative industries.</li>
            </ul>
          </Col>

          <Col md="6" lg="5" className="mb-4">
            <div className="card bg-rust tilted-right px-2 py-1 inline-block">
              <h3 className="text-white uppercase">Contact Us</h3>
            </div>
            <p className="mt-3">To learn more about opportunities to collaborate, volunteer, or otherwise support our work, contact us at <a href="mailto:info@lawdesigncolab.ca">info@lawdesigncolab.ca</a></p>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className="justify-content-center mt-3 mb-4">
          <Col xs="10" md="12">
            <p className="text-center"><em>Our work is graciously supported by The Action Group on Access to Justice at the Law Society of Ontario.</em></p>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default IndexPage;
