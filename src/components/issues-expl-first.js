import React, { Component } from "react"
import { Row, Col, Container } from "react-bootstrap"
import { useStaticQuery, graphql } from "gatsby"
import "./issues-expl-first.scss"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import * as D3 from "d3"
import svgExplImport from "../../static/assets/system-map/EE_jul19.svg"

class ExplFirst extends Component {
  scroller
  steps
  layerSteps
  index
  progress
  step0
  step1
  step2
  s0Bbox1
  s0Bbox2
  s0Bbox3
  s1Bbox1
  s1Bbox2
  s2Bbox1
  s2Bbox2

  handleScrollStepEnter = ({ element, index, direction }) => {
    // Updating current step index
    this.index = index
    console.log(this.index)

    if (this.index === 0) {
      D3.select("#rect-s0-arrowP-1")
        .attr("x", this.s0Bbox1.x)
        .attr("y", this.s0Bbox1.y + this.s0Bbox1.height)
        .attr("width", this.s0Bbox1.width)
        .attr("height", this.s0Bbox1.height)

      D3.select("#s0-arrowP-1")
        .attr("clip-path", "url(#clip-s0-arrowP-1)")
        .style("-webkit-clip-path", "url(#clip-s0-arrowP-1)")

      D3.select("#rect-s0-arrowP-2")
        .attr("x", this.s0Bbox2.x)
        .attr("y", this.s0Bbox2.y + this.s0Bbox2.height)
        .attr("width", this.s0Bbox2.width)
        .attr("height", this.s0Bbox2.height)

      D3.select("#s0-arrowP-2")
        .attr("clip-path", "url(#clip-s0-arrowP-2)")
        .style("-webkit-clip-path", "url(#clip-s0-arrowP-2)")

      D3.select("#rect-s0-arrowP-3")
        .attr("x", this.s0Bbox3.x)
        .attr("y", this.s0Bbox3.y + this.s0Bbox3.height)
        .attr("width", this.s0Bbox3.width)
        .attr("height", this.s0Bbox3.height)

      D3.select("#s0-arrowP-3")
        .attr("clip-path", "url(#clip-s0-arrowP-3)")
        .style("-webkit-clip-path", "url(#clip-s0-arrowP-3)")
        
    }
  }

  handleScrollStepExit = ({ element, index, direction }) => {}

  handleProgress = ({ progress }) => {
    this.progress = progress
    console.log(this.progress)

    // Handling visibility of explanation layer elements based on step number

    // Step 0
    if (this.index === 0) {
      this.step0.style("display", "block")
      this.step1.style("display", "none")
      this.step2.style("display", "none")

      if (progress < 0.25) {
        // console.log("0 0")
        this.step0.select("#titleBlock-1").style("opacity", "1")

      } if (progress > 0.25) {
        D3.select("#rect-s0-arrowP-1")
        .transition()
        .duration(1000)
        .attr("y", this.s0Bbox1.y)
      } if (progress > 0.50) {
        D3.select("#rect-s0-arrowP-2")
        .transition()
        .duration(1000)
        .attr("y", this.s0Bbox2.y)
      } if (progress > 0.75) {
        D3.select("#rect-s0-arrowP-3")
        .transition()
        .duration(1000)
        .attr("y", this.s0Bbox3.y)
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

    D3.xml(svgExplImport).then(function (explSvg) {
      const viewBoxWidth = 1400 // svg container width
      const viewBoxHeight = 1120 // svg container height. Needs to be the same as height for svg-wrapper specified in SCSS

      // Storing a selection of the root node for the imported SVG
      let explMap = D3.select(explSvg).select("svg").node()

      // Appending the imported SVG to svg-wrapper
      D3.select("#expl-svg-wrapper").node().appendChild(explMap)

      D3.select(explMap)
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", "0 0 " + viewBoxWidth + " " + viewBoxHeight)
        .selectAll("title")
        .remove()

      // Calculating bounding boxes for arrows
      self.s0Bbox1 = D3.select("#s0-arrowP-1").node().getBBox()
      self.s0Bbox2 = D3.select("#s0-arrowP-2").node().getBBox()
      console.log(self.s0Bbox2)
      self.s0Bbox3 = D3.select("#s0-arrowP-3").node().getBBox()
      // self.s1Bbox1 = D3.select("#s1-arrowP-1").node().getBBox()
      // self.s1Bbox2 = D3.select("#s1-arrowP-2").node().getBBox()
      // self.s2Bbox1 = D3.select("#s2-arrowP-1").node().getBBox()
      // self.s2Bbox2 = D3.select("#s2-arrowP-2").node().getBBox()

      // Initially hiding overlay elements
      // These will later be shown based on scrollama triggers
      self.step0 = D3.select("#slide-1")
      self.step1 = D3.select("#slide-2")
      self.step2 = D3.select("#slide-3")

      self.step0.style("display", "none")
      self.step1.style("display", "none")
      self.step2.style("display", "none")

      ///////// CLIP PATHS /////////

      // List of ids for arrows to animate
      let nodeList = [
        "s0-arrowP-1",
        "s0-arrowP-2",
        "s0-arrowP-3",
        "s1-arrowP-1",
        "s1-arrowP-2",
        "s2-arrowP-1",
        "s2-arrowP-2",
      ]

      let mainSvg = D3.select("#expl-svg-wrapper").select("svg")

      // Appending clip paths for arrows (no dimensions yet)
      nodeList.forEach(d =>
        mainSvg
          .append("clipPath")
          .attr("id", `clip-${d}`)
          .append("rect")
          .attr("id", `rect-${d}`)
      )
      // Old clip path
      // mainSvg
      //   .append("clipPath")
      //   .attr("id", "clipper")
      //   .append("rect")
      //   .attr("id", "clip-rect")

      // Creating the scroller
      const scrollama = require("scrollama")
      self.scroller = scrollama()

      // Firing resize function
      self.handleResize()

      // Setting up the Scroller
      const scrollThreshold = 0.9
      self.scroller
        .setup({
          step: ".expl-step",
          offset: 0.7,
          threshold: scrollThreshold,
          progress: true,
          debug: true,
        })
        .onStepEnter(self.handleScrollStepEnter)
        .onStepExit(self.handleScrollStepExit)
        .onStepProgress(self.handleProgress)

      // setup resize event
      window.addEventListener("resize", self.scroller.resize())
    })
  }

  componentWillUnmount() {
    this.scroller.destroy()
  }

  // const data = useStaticQuery(
  //   graphql`
  //     query ZapModalQuery {
  //       allContentfulSystemMapZapDetail {
  //         edges {
  //           node {
  //             zapId
  //             zapImage {
  //               fluid(maxWidth: 50, maxHeight: 50) {
  //                 ...GatsbyContentfulFluid
  //               }
  //             }
  //             title
  //             zapText {
  //               json
  //             }
  //           }
  //         }
  //       }
  //     }
  //   `
  // )

  //based on the prop activeContent, let modalContent = the node with a matching id
  // let modalContent = data.allContentfulSystemMapZapDetail.edges.find(
  //   obj => obj.node.zapId === props.activeContent
  // )

  render() {
    // console.log(this.props)
    return (
      <Container>
        {/* <p>{this.props.text}</p> */}
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
    )
  }
}

export default ExplFirst
