import React from "react"
import Layout from "../components/layout"
import Head from '../components/head';

const ContactPage = () => {
  return (
    <Layout>
      <Head title="Contact"/>
      <h1>Contact</h1>
      <p>Get at me on twitter via <a href="https://twitter.com/jjrchrds" target="_blank" rel="noopener noreferrer" >@jjrchrds</a> on Twitter!</p>
    </Layout>
  )
}

export default ContactPage;