import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"

const NarrativeJoshPage = ({data}) => {
  console.log(data);
  
  return (
    <Layout>

    </Layout>
  )
}

export default NarrativeJoshPage

export const query = graphql`
  query {
    allContentfulNarrativePageTemplate {
      edges {
        node {
          slideNumber
        }
      }
    }
  }
`