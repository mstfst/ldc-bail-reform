import React from "react"
import { Row, Col, Container } from "react-bootstrap"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import Head from '../components/head'
import IssuesHero from "../components/issues-hero"
import MomentumTabs from "../components/issues-momentum"

const Issue3Page = () => {
  const data = useStaticQuery(graphql `
    query {
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
      <Head title="Issues"/>
      <IssuesHero issueName="Culture Built on Fear" issueImg={ data.issue3.childImageSharp.fixed } link1="/issue3#momentum" link2="/issue3#opportunity" link3="/issue3#explanation" />

      <Row it="momentum" className="justify-content-center">
        <Col className="mb-2" md="9">
          <h2 className="text-center uppercase">Momentum</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris feugiat orci vel justo semper varius. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam fermentum, massa ut molestie venenatis, justo nibh laoreet risus, at imperdiet nisl purus sed augue.</p>
        </Col>
      </Row>

      <Row className="justify-content-center pb-5">
        <MomentumTabs />
      </Row>

      <Row id="opportunity" className="justify-content-center pt-5 pb-5 pl-4 pr-4 bg-rust">
        <Col className="mb-2 pt-4 pb-4 crooked-box" md="9">
          <h2 className="text-center uppercase text-pink">Opportunity</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris feugiat orci vel justo semper varius. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam fermentum, massa ut molestie venenatis, justo nibh laoreet risus, at imperdiet nisl purus sed augue.</p>
        </Col>
      </Row>

      <Row id="explanation" className="justify-content-center">
        <Col className="mt-5 mb-5" md="10">
          <h2 className="text-center uppercase text-rust">Explorable Explanation</h2>
        </Col>
      </Row>
    </Layout>
  )
}

export default Issue3Page