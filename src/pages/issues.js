import React from "react";
import Layout from "../components/layout"
import Head from '../components/head';

import { Container } from "react-bootstrap"


const IssuesPages = () => {
  return (
    <Layout>
      <Head title="Issues"/>
      <Container className="mt-4">
        <h1>Issues</h1> 
        <p>Issues will show up here.</p>
      </Container>
    </Layout>
  )
}

export default IssuesPages