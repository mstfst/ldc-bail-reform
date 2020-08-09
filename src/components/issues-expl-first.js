import React, { Component } from "react"
import { Row, Col, Container } from "react-bootstrap"
import { useStaticQuery, graphql, StaticQuery } from "gatsby"
import "./issues-expl-first.scss"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import * as D3 from "d3"
import svgExplImport from "../../static/assets/system-map/EE_1.svg"

class ExplFirst extends Component {
  scroller
  steps
  layerSteps
  index
  progress
  layer0
  layer1
  layer2
  s0Bbox1
  s0Bbox2
  s0Bbox3
  s1Bbox1
  s1Bbox2
  s2Bbox1
  s2Bbox2

  // Options for displaying text in the sidebar
  options = {
    renderNode: {
      "embedded-asset-block": node => {
        const alt = node.data.target.fields.title["en-US"]
        const url = node.data.target.fields.file["en-US"].url
        console.log(node)
        return <img src={url} className="img-fluid mb-3" alt={alt} />
      },
    },
    renderText: text =>
      text.split("\n").flatMap((text, i) => [i > 0 && <br />, text]),
  }

  // List of ids for arrows to animate
  nodeList = [
    "s0-arrowP-1",
    "s0-arrowP-2",
    "s0-arrowP-3",
    "s1-arrowP-1",
    "s1-arrowP-2",
    "s2-arrowP-1",
    "s2-arrowP-2",
  ]

  state = {
    issue_id: 1,
    step_index: 0,
  }

  handleScrollStepEnter = ({ element, index, direction }) => {
    // Updating current step index
    this.setState({
      step_index: index,
    })

    // Animating main steps ("layers")

    if (
      this.state.step_index === 1 ||
      this.state.step_index === 2 ||
      this.state.step_index === 3
    ) {
      this.layer0.style("display", "block")
      this.layer1.style("display", "none")
      this.layer2.style("display", "none")

      D3.select("#layer-txt-1").style("display", "block")
      D3.select("#layer-txt-2").style("display", "none")
      D3.select("#layer-txt-3").style("display", "none")
    } else if (this.state.step_index === 4 || this.state.step_index === 5) {
      this.layer0.style("display", "none")
      this.layer1.style("display", "block")
      this.layer2.style("display", "none")

      D3.select("#layer-txt-1").style("display", "none")
      D3.select("#layer-txt-2").style("display", "block")
      D3.select("#layer-txt-3").style("display", "none")
    } else if (this.state.step_index === 6 || this.state.step_index === 7) {
      this.layer0.style("display", "none")
      this.layer1.style("display", "none")
      this.layer2.style("display", "block")

      D3.select("#layer-txt-1").style("display", "none")
      D3.select("#layer-txt-2").style("display", "none")
      D3.select("#layer-txt-3").style("display", "block")
    }

    // Animating arrows.
    if (this.state.step_index === 0) {
      // Reset arrow clip paths to original position
      // -> when back at step 0, arrows are hidden
      // so they can be animated again later
      D3.select("#rect-s0-arrowP-1")
        .attr("x", this.bbox1.x)
        .attr("y", this.bbox1.y + this.bbox1.height)
      D3.select("#rect-s0-arrowP-2")
        .attr("x", this.bbox2.x)
        .attr("y", this.bbox2.y + this.bbox2.height)
      D3.select("#rect-s0-arrowP-3")
        .attr("x", this.bbox3.x)
        .attr("y", this.bbox3.y + this.bbox3.height)
      D3.select("#rect-s1-arrowP-1")
        .attr("x", this.bbox4.x + this.bbox4.width)
        .attr("y", this.bbox4.y)
      D3.select("#rect-s1-arrowP-2")
        .attr("x", this.bbox5.x + this.bbox5.width)
        .attr("y", this.bbox5.y)
      D3.select("#rect-s2-arrowP-1")
        .attr("x", this.bbox6.x + this.bbox6.width)
        .attr("y", this.bbox6.y)
      D3.select("#rect-s2-arrowP-2")
        .attr("x", this.bbox7.x + this.bbox7.width)
        .attr("y", this.bbox7.y)

      // Reset main arrow groups as display: none
      D3.select("#s0-arrow-1").style("display", "none")
      D3.select("#s0-arrow-2").style("display", "none")
      D3.select("#s0-arrow-3").style("display", "none")

      // Reset explanation texts as display: none
      D3.selectAll(".explanation-text").style("display", "none")
    } else if (this.state.step_index === 1) {
      // Show main arrow group, to display overlay
      D3.select("#s0-arrow-1").style("display", "block")

      // Show corresponding explanation text in sidebar
      D3.select("#explanation-1").style("display", "block")

      // Animating arrows. First 3 arrows animate bottom to top
      // Other 4 arrows animate right to left
      D3.select("#rect-s0-arrowP-1")
        .transition()
        .duration(1000)
        .attr("y", this.bbox1.y)
    } else if (this.state.step_index === 2) {
      D3.select("#s0-arrow-2").style("display", "block")

      D3.select("#explanation-2").style("display", "block")

      D3.select("#rect-s0-arrowP-2")
        .transition()
        .duration(1000)
        .attr("y", this.bbox2.y)
    } else if (this.state.step_index === 3) {
      D3.select("#s0-arrow-3").style("display", "block")

      D3.select("#explanation-3").style("display", "block")

      D3.select("#rect-s0-arrowP-3")
        .transition()
        .duration(1000)
        .attr("y", this.bbox3.y)
    } else if (this.state.step_index === 4) {
      D3.select("#explanation-4").style("display", "block")

      D3.select("#rect-s1-arrowP-1")
        .transition()
        .duration(1000)
        .attr("x", this.bbox4.x)
    } else if (this.state.step_index === 5) {
      D3.select("#explanation-5").style("display", "block")

      D3.select("#rect-s1-arrowP-2")
        .transition()
        .duration(1000)
        .attr("x", this.bbox5.x)
    } else if (this.state.step_index === 6) {
      D3.select("#explanation-6").style("display", "block")

      D3.select("#rect-s2-arrowP-1")
        .transition()
        .duration(1000)
        .attr("x", this.bbox6.x)
    } else if (this.state.step_index === 7) {
      D3.select("#explanation-7").style("display", "block")

      D3.select("#rect-s2-arrowP-2")
        .transition()
        .duration(1000)
        .attr("x", this.bbox7.x)
    }
  }

  handleScrollStepExit = ({ element, index, direction }) => {}

  handleProgress = ({ progress }) => {}

  handleResize = () => {
    this.layerSteps.style("height", window.innerHeight * 0.75 + "px")

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

    D3.xml(svgExplImport)
      .then(function (explSvg) {
        const viewBoxWidth = 1500 // svg container width
        const viewBoxHeight = 1200 // svg container height. Needs to be the same as height for svg-wrapper specified in SCSS

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

        ///////// BOUNDING BOXES /////////

        // Looping through nodeList to calculate bounding boxes
        // Order of operations is important, this must happen before
        // setting the layers to display: none
        self.nodeList.forEach((d, i) => {
          self[`bbox${i + 1}`] = D3.select("#" + d)
            .node()
            .getBBox()
        })

        ///////// LAYERS /////////

        // Creating variables for layersƒ
        self.layer0 = D3.select("#slide-1")
        self.layer1 = D3.select("#slide-2")
        self.layer2 = D3.select("#slide-3")

        // Initially hide layers - will later be shown based on scrollama triggers
        self.layer0.style("display", "none")
        self.layer1.style("display", "none")
        self.layer2.style("display", "none")

        ///////// SCROLLAMA /////////

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
            debug: false,
          })
          .onStepEnter(self.handleScrollStepEnter)
          .onStepExit(self.handleScrollStepExit)
          .onStepProgress(self.handleProgress)

        // setup resize event
        window.addEventListener("resize", self.scroller.resize())
      })
      .then(d => {
        ///////// CLIP PATHS /////////

        // Appending clip paths to animate arrows
        // In a separate promise response, otherwise would throw error

        let mainSvg = D3.select("#expl-svg-wrapper").select("svg")

        // Looping through nodeList to append clippaths
        this.nodeList.forEach((d, i) => {
          let clipPath = mainSvg
            .append("clipPath")
            .attr("id", `clip-${d}`)
            .append("rect")
            .attr("id", `rect-${d}`)
            .attr("width", self[`bbox${i + 1}`].width)
            .attr("height", self[`bbox${i + 1}`].height)

          // Animating arrows. First 3 arrows animate bottom to top
          // Other 4 arrows animate right to left
          if (i < 3) {
            clipPath
              .attr("x", self[`bbox${i + 1}`].x)
              .attr("y", self[`bbox${i + 1}`].y + self[`bbox${i + 1}`].height)
          } else if (i >= 3) {
            clipPath
              .attr("x", self[`bbox${i + 1}`].x + self[`bbox${i + 1}`].width)
              .attr("y", self[`bbox${i + 1}`].y)
          }

          D3.select(`#${d}`)
            .attr("clip-path", `url(#clip-${d})`)
            .style("-webkit-clip-path", `url(#clip-${d})`)
        })
      })
  }

  componentWillUnmount() {
    this.scroller.destroy()
  }

  render() {
    return (
      <Container>
        <Row id="explanation-1__row">
          <Col sm={11} md={9} id="main-col">
            <div id="explanation-map" className="expl-step">
              <div id="expl-svg-wrapper"></div>
              <div id="expl-step-wrapper">
                <div className="expl-step expl-step-layer"></div>
                <div className="expl-step expl-step-layer"></div>
                <div className="expl-step expl-step-layer"></div>
                <div className="expl-step expl-step-layer"></div>
                <div className="expl-step expl-step-layer"></div>
                <div className="expl-step expl-step-layer"></div>
                <div className="expl-step expl-step-layer"></div>
              </div>
            </div>
          </Col>
          <Col sm={1} md={3} id="expl-sidebar-col">
            <div id="expl-sidebar-wrapper" className="text-dark">
              <StaticQuery
                query={graphql`
                  query {
                    allContentfulIssuesEeText {
                      edges {
                        node {
                          issueId
                          stepId
                          stepText {
                            json
                          }
                        }
                      }
                    }
                  }
                `}
                render={data =>
                  data.allContentfulIssuesEeText.edges.map(edge => {
                    if (edge.node.issueId === this.state.issue_id) {
                      return (
                        <div id={"ee-text-" + edge.node.stepId}>
                          <p>{edge.node.stepId}</p>
                          {documentToReactComponents(
                            edge.node.stepText.json,
                            this.options
                          )}
                        </div>
                      )
                    }
                  })
                }
              />
              <div id="layer-txt-1">
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
              <div id="layer-txt-2">
                <div className="explanation-text" id="explanation-4">
                  Explanation 4
                </div>
                <div className="explanation-text" id="explanation-5">
                  Explanation 5
                </div>
              </div>
              <div id="layer-txt-3">
                <div className="explanation-text" id="explanation-6">
                  Explanation 6
                </div>
                <div className="explanation-text" id="explanation-7">
                  Explanation 7
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default ExplFirst
