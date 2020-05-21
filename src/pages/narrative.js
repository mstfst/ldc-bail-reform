import React from "react"
// import { Link } from "gatsby"
import { Row, Col } from "react-bootstrap"

import Layout from "../components/layout"
import Head from '../components/head';

const NarrativePage = () => {
  return (
    <Layout>
      <Head title="Narrative"/>
      <div className="container-fluid container-fill">
        <Row className="h-100">
          <Col md="8" xl="9" className="bg-light h-100 p-4 p-xl-5">
            <h2>interaction</h2>
          </Col>
          <Col md="4" xl="3" className="bg-secondary h-100 p-4 p-xl-5">
            <img src="https://placehold.it/1000x1000" alt="Narrative Name" className="img-fluid mb-4"/>
            <h2>Narrative Name</h2>
            <p className="lead">Narrative Biography</p>
          </Col>
        </Row>
      </div>
    </Layout>
  )
}

export default NarrativePage;