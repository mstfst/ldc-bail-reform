import React from "react"
import { Link } from "gatsby"
import { Container } from "react-bootstrap"

import Layout from "../components/layout"
import Head from '../components/head';

const NarrativePage = () => {
  return (
    <Layout>
      <Head title="About"/>
      <Container className="mt-4">
        <h1>Narrative</h1>
        <p>I'm Joshua, a creative technologist, living in Toronto.</p>
        <p><Link to="/contact">some cta</Link></p>
      </Container>
    </Layout>
  )
}

export default NarrativePage;