import React from "react"
import "intersection-observer"
import Layout from "../components/layout"
import { graphql, StaticQuery } from "gatsby"
import Img from "gatsby-image"
import Head from "../components/head"
import NarrativeComponent from "../components/narrative-body"

// have the content stick while scrolling
// work on the scrollbar

const NarrativePage = () => {
  return (
    <Layout>
      <Head title="Narrative" />
      {/* <StaticQuery
          query={graphql`
            query {
              intro_bg: file(relativePath: { eq: "images/intro_bg.jpg" }) {
                childImageSharp {
                  fluid(maxWidth: 4000) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          `}
          render={data => {
            return (
              <div class="narrative-intro-background">
                  <Img fluid={data.intro_bg.childImageSharp.fluid} />
              </div>
            )
          }}
        /> */}
      <NarrativeComponent />
    </Layout>
  )
}

export default NarrativePage