import React from "react"
import { Link } from "gatsby"
import { Container } from "react-bootstrap"

import Layout from "../components/layout"
import Head from '../components/head';


const IndexPage = () => {
  return (
    <Layout>
      <Head title="Home" />
      <Container>
        <h1>Hello.</h1>
        <h2>This is the little starter I put together.</h2>
        <p>It contains:</p>
        <ul>
          <li>Gatsby</li>
          <li>Contentful</li>
          <li>react-bootstrap</li>
        </ul>
        <p>Need a developer? <Link to="/contact">Contact me.</Link></p>
      </Container>
    </Layout>
  )
}

export default IndexPage;