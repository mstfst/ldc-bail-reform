import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import { Controller, Scene } from 'react-scrollmagic';

const NarrativeJoshPage = ({data}) => {
  console.log(data);

  const sortedData = [...data.allContentfulNarrativePageTemplate.edges];

  return (
    <Layout>  
      <Controller>
        { sortedData.map((page, index) => {
            return (
              <Scene key={`slide-${index}`} duration={600} pin>
                <div className="vh-100">
                  { page.node.character }
                </div>
              </Scene>
            )
          }
        )}
      </Controller>
    </Layout>
  )
}

export default NarrativeJoshPage

export const query = graphql`
  query {
    allContentfulNarrativePageTemplate {
      edges {
        node {
          character
          slideNumber
        }
      }
    }
  }
`