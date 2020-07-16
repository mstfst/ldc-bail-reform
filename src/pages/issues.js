import React from "react"
import { Row, Col, Container } from "react-bootstrap"

import Layout from "../components/layout"
import Head from '../components/head'
import IssuesHero from "../components/issues-hero"

const IssuesPages = () => {
  return (
    <Layout>
      <Head title="Issues"/>
      <IssuesHero />
    </Layout>
  )
}

export default IssuesPages