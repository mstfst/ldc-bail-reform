import React, { useState, useRef } from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { Controller, Scene } from 'react-scrollmagic';
import BackgroundImage from 'gatsby-background-image'
import { slugify } from "../helpers"
import { Container, Row, Col } from "react-bootstrap"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"


const NarrativeJoshPage = ({data}) => {
  let value = 0;

  // const [ slideIndex, setSlideIndex ] = useState(0);
  const bgs = useRef();
  const progress = useRef();

  //progress bar update
  const updateProgress = ( value ) => {
    progress.current.innerHTML = value;
  }

  const updateBackground = ( id ) => {
    const activeId = 'bg-'+id;
    const backgrounds = bgs.current.querySelectorAll('.bg-cover');
    backgrounds.forEach(background => {

      background.classList.remove('bg-active');
      if (background.id === activeId) {
        background.classList.add('bg-active');
      }

    })
  }

  //initialize slideData
  const slideData = [];
  data.allContentfulNarrativePageBackground.edges.forEach((item, index) => {
    item.node.slides.forEach((slide) => {
      slideData.push(slide);
    })
  });

  //set up documentToReact options
  const options = {
    renderNode: {
      "embedded-asset-block": (node) => {
        const alt = node.data.target.fields.title["en-US"];
        const url = node.data.target.fields.file["en-US"].url;
        console.log(node);
        return <img src={ url } className="img-fluid mb-3" alt={ alt } />;
      },
    }
  }

  return (
    <Layout>  

      <div ref={ bgs } className="bgs position-fixed">
        <div className="bg-cover bg-gradient position-fixed"/>
        { data.allContentfulNarrativePageBackground.edges.map((item, index) => (
          <BackgroundImage
            key={`bg-${index}`} 
            id={`bg-${ slugify(item.node.pageTitle)}`}
            Tag="section"
            className={'position-absolute bg-cover'}
            fluid={item.node.backgroundImage.fluid}
            backgroundColor={`#040e18`}
          />
        ))}
      </div>

      <div className="progress position-fixed">
        <div ref={ progress }>0</div>
      </div>

      <Controller>
        <Scene 
          triggerHook={0} 
          duration={600} 
          pin
        >
          <div className="vh-100">
            <Container className="h-100">
              <Row className="h-100 d-flex align-items-center">
                <h1>test</h1>
              </Row>
            </Container>
          </div>
        </Scene>
        
        { slideData.map((slide, index) => {
          console.log(slide.character);
          return (
            <Scene 
              indicators={true}
              // onEnter={ () => console.log('wow') }
              key={`slide-${index}`} 
              triggerHook={0} 
              duration={"150%"} 
              pin
            >
              {(progress, event) => {
                if (event.type === "enter") {
                  updateProgress( index );
                  updateBackground( slide.character );
                }
                return (
                <div className={`vh-100 ${ slide.character }`}>
                  <Container className={`h-100 opacity-0 ${ progress > .1 && progress < .9 ? 'opacity-1' : ''}`}>
                    <Row className="h-100 d-flex align-items-center text-white">
                      <Col>
                        <p>{ slide.character }</p>
                        <h1>{ slide.heading }</h1>
                        { documentToReactComponents(slide.story.json, options) }

                      </Col>
                    </Row>
                  </Container>
                  
                </div>
              )}}
            </Scene>
          )
        })}
      </Controller>
    </Layout>
  )
}

export default NarrativeJoshPage

export const query = graphql`
  query {
    allContentfulNarrativePageBackground {
      edges {
        node {
          pageTitle
          backgroundImage {
            fluid(maxWidth: 1800) {
              ...GatsbyContentfulFluid
            }
          }
          slides {
            character
            heading
            slideNumber
            story {
              json
            }
            slideImage {
              fluid(maxWidth: 1200) {
                ...GatsbyContentfulFluid
              }
            }
          }
        }
      }
    }
  }
`