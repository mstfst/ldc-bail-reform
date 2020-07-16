import React from "react"
import { Jumbotron, Container, Row, Col } from "react-bootstrap"
import "./issues-hero.scss"

const IssuesHero = () => {
  return (
    <Jumbotron className="fluid pt-5 issuesHeroWrap">
      <Container className="mt-4">
        <Row className="justify-content-center mt-4">
          <Col className="justify-content-center" sm="3">
            <img src="https://placehold.it/250x250" alt="Cloud image" className="issueImage" />
          </Col>
        </Row>

        <Row md="10" className="justify-content-center pr-4 pl-4 pt-5 pb-5 crookedBox">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris feugiat orci vel justo semper varius. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam fermentum, massa ut molestie venenatis, justo nibh laoreet risus, at imperdiet nisl purus sed augue.</p>
        </Row>

        <Row md="10" className="justify-content-center mt-4 pt-4 text-white">
          <Col md="4">
            <h2 className="pinkTag">Momentum</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Col>

          <Col md="4">
            <h2 className="pinkTag">Opportunity</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Col>

          <Col md="4">
            <h2 className="pinkTag">Explorable Explanation</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Col>
        </Row>
      </Container>
    </Jumbotron>
  )
}

export default IssuesHero