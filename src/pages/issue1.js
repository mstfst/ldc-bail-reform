import React from "react"
import { Row, Col, Container } from "react-bootstrap"

import Layout from "../components/layout"
import Head from '../components/head'
import IssuesHero from "../components/issues-hero"

const Issue1Page = () => {
  return (
    <Layout>
      <Head title="Issues"/>
      <IssuesHero link1="/issue1#momentum" link2="/issue1#opportunity" link3="/issue1#explanation" />

    </Layout>
  )
}

export default Issue1Page