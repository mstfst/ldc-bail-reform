import React, { Component } from "react"
import { Row, Col, Container } from "react-bootstrap"
import * as D3 from "d3"
// import svgExplImport from "../../static/assets/explorable-explanations/EE_jul19.svg"
// import svgExplImport from "../../static/assets/explorable-explanations/SM_jun25.svg"
// import svgExplImport from "../../static/assets/system-map/SM_jun25.svg"
import svgExplImport from "../../static/assets/system-map/EE_jul19.svg"
import Layout from "../components/layout"
import Head from "../components/head"
import IssuesHero from "../components/issues-hero"
import MomentumTabs from "../components/issues-momentum"

class Issue1Page extends Component {
  scroller
  steps
  layerSteps
  index
  progress
  step0
  step1
  step2

  handleScrollStepEnter = ({ element, index, direction }) => {
    // Updating current step index
    this.index = index

    if (this.index === 0) {
      let bboxTest = D3.select("#s0-arrowP-1").node().getBBox()
      console.log(bboxTest)

      D3.select("#clip-rect")
        .attr("x", bboxTest.x)
        .attr("y", bboxTest.y + bboxTest.height)
        .attr("width", bboxTest.width)
        .attr("height", bboxTest.height)
        .transition()
        .duration(1000)
        .attr("y", bboxTest.y)

        D3.select("#s0-arrowP-1")
        // .style("fill", "red")
        .attr("clip-path", "url(#clipper)")
        .style("-webkit-clip-path", "url(#clipper)")
    }
  }

  handleScrollStepExit = ({ element, index, direction }) => {}

  handleProgress = ({ progress }) => {
    this.progress = progress

    // Handling visibility of explanation layer elements based on step number

    // Step 0
    if (this.index === 0) {
      this.step0.style("display", "block")
      this.step1.style("display", "none")
      this.step2.style("display", "none")

      if (progress < 0.25) {
        // console.log("0 0")
        this.step0.select("#titleBlock-1").style("opacity", "1")
        this.step0.select("#s0-arrow-1").style("opacity", "1")

      } else if (progress < 0.5) {
        // console.log("0 1")
      } else if (progress < 0.75) {
        this.step0.select("#s0-arrow-2").style("opacity", "1")
        // console.log("0 2")
      } else if (progress > 0.75) {
        this.step0.select("#s0-arrow-3").style("opacity", "1")
        // console.log("0 3")
      }


     
    }
    // Step 1
    else if (this.index === 1) {
      this.step0.style("display", "none")
      this.step1.style("display", "block")
      this.step2.style("display", "none")
      if (progress < 0.33) {
        // console.log("1 0")
        this.step1.select("#titleBlock-2").style("opacity", "1")
      } else if (progress < 0.66) {
        // console.log("1 1")
        this.step1.select("#s1-arrow-1").style("opacity", "1")

      } else if (progress > 0.66) {
        // console.log("1 2")
        this.step1.select("#s1-arrow-2").style("opacity", "1")

      }
    }
    // Step 2
    else if (this.index === 2) {
      this.step0.style("display", "none")
      this.step1.style("display", "none")
      this.step2.style("display", "block")
      if (progress < 0.33) {
        // console.log("2 0")
        this.step2.select("#titleBlock-3").style("opacity", "1")

      } else if (progress < 0.66) {
        // console.log("2 1")
        this.step2.select("#s2-arrow-1").style("opacity", "1")

      } else if (progress > 0.66) {
        // console.log("2 2")
        this.step2.select("#s2-arrow-2").style("opacity", "1")

      }
    }
  }

  handleResize = () => {
    this.layerSteps.style("height", window.innerHeight * 2.5 + "px")
    console.log(this.layerSteps)

    D3.select("#expl-sidebar-wrapper")
      .style("height", window.innerHeight * 0.8 + "px")
      .style("top", (window.innerHeight * 0.2) / 2 + "px")

    // Vertically centering the svg when it becomes sticky
    D3.select("#expl-svg-wrapper").style(
      "top",
      d => `${(window.innerHeight * 0.2) / 2}px`
    )

    this.scroller.resize()
  }

  componentDidMount() {
    const self = this

    // Storing a selection of the layer steps element
    this.layerSteps = D3.select("#expl-step-wrapper").selectAll(
      ".expl-step-layer"
    )

    // Creating the scroller
    const scrollama = require("scrollama")
    this.scroller = scrollama()

    // Firing resize function
    this.handleResize()

    // Setting up the Scroller
    const scrollThreshold = 0.9
    this.scroller
      .setup({
        step: ".expl-step",
        offset: 0.7,
        threshold: scrollThreshold,
        progress: true,
        debug: false,
      })
      .onStepEnter(this.handleScrollStepEnter)
      .onStepExit(this.handleScrollStepExit)
      .onStepProgress(this.handleProgress)

    // setup resize event
    window.addEventListener("resize", this.scroller.resize())

    // Loading the Systemp Map svg
    D3.xml(svgExplImport).then(function (explSvg) {
      const viewBoxWidth = 1400 // svg container width
      const viewBoxHeight = 1120 // svg container height. Needs to be the same as height for svg-wrapper specified in SCSS

      // Storing a selection of the root node for the imported SVG
      let explMap = D3.select(explSvg).select("svg").node()

      // Appending the layer title paragraph
      D3.select("#expl-svg-wrapper")
        .append("p")
        .classed("sm-layer__title", "true")
        .text("Explanation map - layer 1")

      // Appending the imported SVG to svg-wrapper
      D3.select("#expl-svg-wrapper").node().appendChild(explMap)

      D3.select(explMap)
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", "0 0 " + viewBoxWidth + " " + viewBoxHeight)
        .selectAll("title")
        .remove()

      // Initially hiding overlay elements
      // These will later be shown based on scrollama triggers
      self.step0 = D3.select("#slide-1")
      self.step1 = D3.select("#slide-2")
      self.step2 = D3.select("#slide-3")

      self.step0.style("display", "none")
      self.step1.style("display", "none")
      self.step2.style("display", "none")

      // Test clip path for arrows animations
      let mainSvg = D3.select("#expl-svg-wrapper").select("svg")
      mainSvg
        .append("clipPath")
        .attr("id", "clipper")
        .append("rect")
        .attr("id", "clip-rect")
    })
  }

  componentWillUnmount() {
    this.scroller.destroy()
  }

  render() {
    return (
      <Layout>
        <Head title="Issues" />
        <IssuesHero
          issueName="First Issue"
          link1="/issue1#momentum"
          link2="/issue1#opportunity"
          link3="/issue1#explanation"
        />

        <Row it="momentum" className="justify-content-center">
          <Col className="mb-2" md="9">
            <h2 className="text-center uppercase">Momentum</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              feugiat orci vel justo semper varius. Class aptent taciti sociosqu
              ad litora torquent per conubia nostra, per inceptos himenaeos. Nam
              fermentum, massa ut molestie venenatis, justo nibh laoreet risus,
              at imperdiet nisl purus sed augue.
            </p>
          </Col>
        </Row>

        <Row className="justify-content-center pb-5">
          <MomentumTabs />
        </Row>

        <Row
          id="opportunity"
          className="justify-content-center pt-5 pb-5 pl-4 pr-4 bg-rust"
        >
          <Col className="mb-2 pt-4 pb-4 crooked-box" md="9">
            <h2 className="text-center uppercase text-pink">Opportunity</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              feugiat orci vel justo semper varius. Class aptent taciti sociosqu
              ad litora torquent per conubia nostra, per inceptos himenaeos. Nam
              fermentum, massa ut molestie venenatis, justo nibh laoreet risus,
              at imperdiet nisl purus sed augue.
            </p>
          </Col>
        </Row>

        <Row id="explanation" className="justify-content-center">
          <Col className="mt-5 mb-5" md="10">
            <h2 className="text-center uppercase text-rust">
              Explorable Explanation
            </h2>
          </Col>
        </Row>
        {/* Explanation Map */}
        <Container>
          <Row id="explanation-1__row">
            <Col sm={11} md={9} id="main-col">
              <div id="explanation-map">
                <div id="expl-svg-wrapper"></div>
                <div id="expl-step-wrapper">
                  <div className="expl-step expl-step-layer"></div>
                  <div className="expl-step expl-step-layer"></div>
                  <div className="expl-step expl-step-layer"></div>
                </div>
              </div>
            </Col>
            <Col sm={1} md={3} id="expl-sidebar-col">
              <div id="expl-sidebar-wrapper" className="text-dark">
                <div className="explanation-text" id="explanation-1">
                  Explanation 1
                </div>
                <div className="explanation-text" id="explanation-2">
                  Explanation 2
                </div>
                <div className="explanation-text" id="explanation-3">
                  Explanation 3
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Layout>
    )
  }
}

export default Issue1Page
