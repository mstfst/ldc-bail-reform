/* Import React, Gatsby & React Bootstrap */
import React from "react"
import { Link } from "gatsby"
import { Row, Col, Jumbotron, Button, Container, Card } from "react-bootstrap"

/* Import Layout Components */
import Layout from "../components/layout"
import Head from "../components/head";

/* Import SVG Components */
import ChevronDown from "../../static/assets/svg/chevron-down.svg";
import HomeLogo from "../../static/assets/svg/logo_homepage.svg";

const IndexPage = () => {
  return (
    <Layout>
      <Head title="Home" />
      <Jumbotron className="hero mb-1">
        <Container>
          <Row className="justify-content-center">   
            <Col md="10" className="text-center">
              <HomeLogo width={300} fill='#fff' className="mt-5 mb-5"/>
              <h1 className="display-2 mt-4">According to the Auditor General</h1>
              <h1 className="display-1 mb-5">70% of people held in Ontario jails are <span className="hero-em">legally innocent</span></h1>
              <p className="display-3 pt-4 mb-3">Why?</p>
              <p>
                <Button variant="link" className="heartbeat" aria-label="Learn more">
                  <Link to="/#main">
                    <ChevronDown />
                  </Link>
                </Button>
              </p>
            </Col>
        </Row>
        </Container>
      </Jumbotron>
      
      <Container id="main" className="pt-2">
        <Row className="justify-content-md-center mt-5 pt-5 mb-4">
          <Col md="10">
            <p><strong>If we have a bail system that is supposed to release people from jail, with the assurance that they show up for trial, and they aren’t a risk to public safety, then why does this issue exist?</strong></p>
            <p>We’ve created some resources to try and help you answer this question:</p>
          </Col>
        </Row>

        <Row className="mb-4 pb-4">
          <Row className="justify-content-md-center mb-4">
            <Col md="5" lg="4">
              <Link to="/system-map">
                <Card className="bg-dark text-dark mb-3">
                  <Card.Img src="https://placehold.it/600x400" alt="Card image" />
                  <Card.ImgOverlay className="align-contents-bottom">
                    <Card.Title><h3>The Bail System</h3></Card.Title>
                    <Card.Text className="min-height-3rem">
                      How bail is supposed to work and when it doesn’t.
                    </Card.Text>
                  </Card.ImgOverlay>
                </Card>
              </Link>
            </Col>
            <Col md="5" lg="4">
              <Link to="/narrative">
                <Card className="bg-dark text-dark mb-3">
                  <Card.Img src="https://placehold.it/600x400" alt="Card image" />
                  <Card.ImgOverlay className="align-contents-bottom">
                    <Card.Title><h3>The Human Experience</h3></Card.Title>
                    <Card.Text className="min-height-3rem">
                      The human cost of bail.
                    </Card.Text>
                  </Card.ImgOverlay>
                </Card>
              </Link>
            </Col>
          </Row>

          <Col md="12" className="text-center mb-4 pb-4">
            <p>Check out what the experts have to say in <Link to="/methodology">the Reports</Link>.</p>
          </Col>
        </Row>

        <Row className="justify-content-md-center mb-4 text-center">
          <Col md="4">
            <h2>What We Can Do</h2>
            <p>Ways to create momentum for bail reform.</p>
          </Col>
        </Row>

        <Row className="justify-content-md-center mb-5">
          <Col xs="12" md="4">
            <Link to="" aria-label="Read more about Risk Averse Culture">
              <img src="https://placehold.it/400x300" className="img-fluid mb-4" alt=""/>
            </Link>
          </Col>
          <Col xs="12" md="4">
            <Link to="" aria-label="Read more about Socioeconomic factors">
              <img src="https://placehold.it/400x300" className="img-fluid mb-4" alt=""/>
            </Link>
          </Col>
          <Col xs="12" md="4">
            <Link to="" aria-label="Read more about Insufficient Resources">
              <img src="https://placehold.it/400x300" className="img-fluid mb-4" alt=""/>
            </Link>
          </Col>
        </Row>

      </Container>
    </Layout>
  )
}

export default IndexPage;