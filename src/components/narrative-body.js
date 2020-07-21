import React, { Component } from "react"
import "intersection-observer"
import { graphql, StaticQuery } from "gatsby"
import Img from "gatsby-image"

import NathanNarrative from "./narrative/nathan"
import KaraNarrative from "./narrative/kara"
import GeorgeNarrative from "./narrative/george"

import ProgressBar from "./progress-bar"

import "./narrative-body.scss"

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
    // this.setState({
    //   contentPosition: {
    //     position: "relative",
    //     top: 0
    //   }
    // })
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
        offset: 0.8,
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
      contentPosition
    } = this.state
    console.log("PROGRESS: " + progress)

    return (

      <div>
        <ProgressBar />
        <div className="gradient-background" ></div>

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
          }}
        />

        <div id="narrative-scroll">
          {/* NATHAN */}
          <NathanNarrative progress={progress} step={overall_step} contentPosition={contentPosition} />

          {/* KARA */}
          <KaraNarrative progress={progress} step={overall_step} contentPosition={contentPosition}/>

          {/* GEORGE */}
          <GeorgeNarrative progress={progress} step={overall_step} contentPosition={contentPosition}/>
        </div>
      </div>
    )
  }
}

export default NarrativeSection
