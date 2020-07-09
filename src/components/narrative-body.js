import React, { Component } from "react"
import "bootstrap/dist/css/bootstrap.min.css"

import { graphql, StaticQuery } from "gatsby"
import Img from "gatsby-image"

import NathanNarrative from "./narrative/nathan"
import KaraNarrative from "./narrative/kara"
import GeorgeNarrative from "./narrative/george"

import "./narrative-body.scss"

const background_images = [
  "./assets/nathan_bg.jpg",
  "./assets/kara_bg.jpg",
  "./assets/george_bg.jpg",
]

class NarrativeSection extends Component {
  scroller

  state = {
    story_stp: 0,
    progress: 0,
    overall_step: 0,
        kara_opacity: 0,
    george_opacity: 0,
  }

  handleScrollStepEnter = ({ element, index, direction }) => {
    // element.style.backgroundColor = 'lightgoldenrodyellow';
    this.setState({
      overall_step: index,
    })
    if (index <= 5) {
      this.setState({
        kara_opacity: 0,
        george_opacity: 0,
        story_stp: 1,
      })
    } else if (index >= 6 && index <= 13) {
      this.setState({
        kara_opacity: 1,
        george_opacity: 0,
        story_stp: 2,
      })
    } else if (index > 13) {
      this.setState({
        kara_opacity: 0,
        george_opacity: 1,
        story_stp: 3,
      })
    }
  }
  handleScrollStepExit = ({ element, index, direction }) => {
    // element.style.backgroundColor = 'white';
    // console.log("scroll step exit")
  }

  handleProgress = ({ progress }) => {
    this.setState({ progress })
  }

  componentDidMount() {
    const scrollama = require("scrollama")
    const scrollThreshold = 0.33
    this.scroller = scrollama()

    this.scroller
      .setup({
        container: "#narrative-scroll",
        step: ".narrative-step",
        threshold: scrollThreshold,
        progress: true,
        debug: false,
      })
      .onStepEnter(this.handleScrollStepEnter)
      .onStepExit(this.handleScrollStepExit)
      .onStepProgress(this.handleProgress)

    // setup resize event
    window.addEventListener("resize", this.scroller.resize)
  }

  componentWillUnmount() {
    this.scroller.destroy()
  }

  render() {
    const {
      story_stp,
      progress,
      overall_step,
      kara_opacity,
      george_opacity,
    } = this.state

    const narrativePgStyle = step => {
      return {
        opacity: progress > 0.5 ? 1.5 - progress * 2 : progress * 2,
      }
    }

    return (
      <div>
        <StaticQuery
          query={graphql`
            query {
              nathan_bg: file(relativePath: { eq: "images/nathan_bg.jpg" }) {
                childImageSharp {
                  fluid(maxWidth: 2000) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              kara_bg: file(relativePath: { eq: "images/kara_bg.jpg" }) {
                childImageSharp {
                  fluid(maxWidth: 2000) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              george_bg: file(relativePath: { eq: "images/george_bg.jpg" }) {
                childImageSharp {
                  fluid(maxWidth: 2000) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          `}
          render={data => {
            

            return (
              <div>
                <div className="narrative-background">
                  <Img fluid={data.nathan_bg.childImageSharp.fluid} />
                </div>
                <div
                  className="narrative-background"
                  style={{ opacity: kara_opacity }}
                >
                  <Img fluid={data.kara_bg.childImageSharp.fluid} />
                </div>
                <div
                  className="narrative-background"
                  style={{ opacity: george_opacity }}
                >
                  <Img fluid={data.george_bg.childImageSharp.fluid} />
                </div>
              </div>
            )

            // return story_stp === 1 ? (
            //   <Img fluid={data.nathan_bg.childImageSharp.fluid}/>
            // ) : story_stp === 2 ? (
            //   <Img fluid={data.kara_bg.childImageSharp.fluid} width="100%"/>
            // ) : (
            //   <Img fluid={data.george_bg.childImageSharp.fluid} width="100%"/>
            // )
          }}
        />

        <div id="narrative-scroll">
          {/* NATHAN */}
          <NathanNarrative className="narrative-step" progress={progress} />

          {/* KARA */}
          <KaraNarrative className="narrative-step" progress={progress} />

          {/* GEORGE */}
          <GeorgeNarrative className="narrative-step" progress={progress} />
        </div>
      </div>
    )
  }
}

export default NarrativeSection
