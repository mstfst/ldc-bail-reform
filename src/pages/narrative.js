import React, { Component } from "react"
import "intersection-observer";
// import { Step } from 'react-scrollama';
import Layout from "../components/layout"
import Head from '../components/head';
import NarrativeComponent from "../components/narrative-body"

class NarrativePage extends Component {
  render() {
    return (
      <Layout>
        <Head title="Narrative"/>
        <NarrativeComponent />
      </Layout>
    )
  }
}
export default NarrativePage;