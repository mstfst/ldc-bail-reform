import React from "react"
import "intersection-observer"
// import { Step } from 'react-scrollama';
import Layout from "../components/layout"
import Head from "../components/head"
import NarrativeComponent from "../components/narrative-body"

const NarrativePage = () => {
  return (
    <Layout>
      <Head title="Narrative" />
      <NarrativeComponent />
    </Layout>
  )
}

export default NarrativePage