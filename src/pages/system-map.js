import React, { Component } from "react"
import "intersection-observer"
import Layout from "../components/layout"
import Head from "../components/head"
// import "./system-map.scss"
import { graphql, StaticQuery } from "gatsby"
import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap"
import * as D3 from "d3"
import svgSystemMap from "../../static/assets/system-map/SM_jun25.svg"
import StaticModal from "../components/static-modal"
import CogModal from "../components/cog-modal"
import ZapModal from "../components/zap-modal"

// console.log(svgSystemMap);

class SystemMapPage extends Component {
  scroller
  steps
  systemMap
  modalX
  modalY
  modalMargin
  currentImage = ""

  state = {
    showStaticModal: false,
    showCogModal: false,
    showZapModal: false,
    staticModalActiveContent: "",
    cogModalActiveContent: "",
    zapModalActiveContent: "",
  }

  setShow = ({ isVisible }) => {
    let show = isVisible
    this.setState({ showCogModal: show })
  }

  // handleClose = () => this.setShow(false)
  // handleShow = () => this.setShow(true)
  handleCloseStatic = () => this.setState({ showStaticModal: false })
  handleCloseCog = () => this.setState({ showCogModal: false })
  handleCloseZap = () => this.setState({ showZapModal: false })

  handleScrollStepEnter = ({ element, index, direction }) => {
    console.log(index)

    // Handling visibility of "layer" elements based on step number
    // Step 0: initial state, Meet the Characters
    if (index === 0) {
      D3.select("#prompt-0").style("display", "block")
      D3.select("#prompt-1").style("display", "none")
      D3.select("#sm-legend").style("display", "none")
      D3.select(".sm-layer__title").text("System map - layer 1")
    }

    if (index === 1) {
      D3.select("#prompt-0").style("display", "none")
      D3.select("#prompt-1").style("display", "none")
      D3.select("#sm-legend").style("display", "none")
    }

    if (index === 2) {
      D3.select("#cogs").style("display", "none")
      D3.select("#zaps").style("display", "none")
      D3.select("#base").selectAll("image").style("pointer-events", "auto")
      D3.select("#prompt-1")
        .style("display", "block")
        .text(
          "Click on the pictures to get details on each stage. Once you’re done, keep scrolling!"
        )
      D3.select("#sm-legend").style("display", "block")
      D3.select(".sm-layer__title").text("System map - layer 1")
    }

    if (index === 3) {
      D3.select("#cogs").style("display", "block")
      D3.select("#zaps").style("display", "none")
      D3.select("#base").selectAll("image").style("pointer-events", "none")
      D3.select("#prompt-1").text(
        "Click on the icons to see what happens at each decision point. Keep scrolling!"
      )
      D3.select(".sm-layer__title").text("System map - layer 2")
    }

    if (index === 4) {
      D3.select("#cogs").style("display", "none")
      D3.select("#zaps").style("display", "block")
      D3.select("#base").selectAll("image").style("pointer-events", "none")
      D3.select("#prompt-1").text(
        "Click on the icons to know more about lorem ipsum dolor."
      )
      D3.select(".sm-layer__title").text("System map - layer 3")
    }
  }

  handleScrollStepExit = ({ element, index, direction }) => {
    if (index === 2 && direction === "up") {
      D3.select("#prompt-1").style("display", "none")
      D3.select("#sm-legend").style("display", "none")
    }
  }

  // handleProgress = ({ progress }) => {}

  handleResize = () => {
    // console.log("resize")
    // console.log(this.steps)
    // console.log(this.systemMap)

    // let stepH = Math.floor(window.innerHeight * 0.75)
    this.layerSteps.style("height", window.innerHeight * 1.5 + "px")

    D3.select("#sidebar-wrapper")
      .style("height", window.innerHeight * 0.85 + "px")
      .style("top", (window.innerHeight * 0.15) / 2 + "px")
    this.scroller.resize()
  }

  componentDidMount() {
    // TEMPORARY: overriding the Container styling to make it wider
    // Need to coordinate with rest of the styling
    D3.selectAll(".mt-4.container").style("max-width", "1300px")

    // Storing the global "this" object to later reference it in D3 event functions
    const self = this

    // Storing a selection of the steps element
    // this.systemMap = D3.select("#system-map")
    this.layerSteps = D3.select("#step-wrapper").selectAll(".step-layer")

    // Creating the scroller
    const scrollama = require("scrollama")
    this.scroller = scrollama()

    // Firing resize function
    this.handleResize()

    // Setting up the Scroller
    const scrollThreshold = 0.9
    this.scroller
      .setup({
        step: ".stepx",
        offset: 0.7,
        threshold: scrollThreshold,
        progress: true,
        debug: false,
      })
      .onStepEnter(this.handleScrollStepEnter)
      .onStepExit(this.handleScrollStepExit)
    // .onStepProgress(this.handleProgress)

    // setup resize event
    window.addEventListener("resize", this.scroller.resize)
    // Probably the way to resize, below
    // window.addEventListener("resize", this.handleResize);

    // Loading the Systemp Map svg
    D3.xml(svgSystemMap).then(function (smSvg) {
      const viewBoxWidth = 1400 // svg container width
      const viewBoxHeight = 600 // svg container height. Needs to be the same as height for svg-wrapper specified in SCSS

      // Vertically centering the svg when it becomes sticky
      D3.select("#svg-wrapper").style(
        "top",
        d => `${(window.innerHeight - 600) / 2}px`
      )

      // Storing a selection of the root node for the imported SVG
      let svgMap = D3.select(smSvg).select("svg").node()

      // Appending the layer title paragraph
      D3.select("#svg-wrapper")
        .append("p")
        .classed("sm-layer__title", "true")
        .text("System map - layer 1")

      // Appending the imported SVG to svg-wrapper
      D3.select("#svg-wrapper").node().appendChild(svgMap)

      D3.select(svgMap)
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", "0 0 " + viewBoxWidth + " " + viewBoxHeight)
        .selectAll("title")
        .remove()

      // Hiding elements that shouldn't appear right away
      // These will later be shown based on scrollama triggers
      D3.select("#cogs").style("display", "none")
      D3.select("#zaps").style("display", "none")

      // Making triggers for events invisible
      D3.selectAll("#cog-click").style("opacity", 0)
      D3.selectAll("#zap-click").style("opacity", 0)

      D3.select("#base")
        .selectAll("image")
        .on("click", function () {
          console.log(this.id)
          self.modalX = "0px"
          self.modalY = "0px"
          self.setState({ showStaticModal: true })
          self.setState({ showCogModal: false })
          self.setState({ showZapModal: false })
          self.setState({ staticModalActiveContent: this.id })
          self.currentImage = this.id
        })

      // Adding event listeners: layer 1 (cogs)
      D3.select("#cog-click")
        .selectAll("rect")
        .on("click", function (d) {
          console.log(this.id)
          self.modalX = D3.event.clientX + "px"
          self.modalY = D3.event.clientY + "px"
          self.setState({ showStaticModal: false })
          self.setState({ showCogModal: true })
          self.setState({ showZapModal: false })
          self.setState({ cogModalActiveContent: this.id })
        })

      // Adding event listeners: layer 2 (zaps)
      D3.select("#zap-click")
        .selectAll("rect")
        .on("click", function () {
          console.log(this)
          // console.log(self)
          self.modalX = D3.event.clientX + "px"
          self.modalY = D3.event.clientY + "px"
          self.setState({ showStaticModal: false })
          self.setState({ showCogModal: false })
          self.setState({ showZapModal: true })
          self.setState({ zapModalActiveContent: this.id })
        })
    })
  }

  componentWillUnmount() {
    this.scroller.destroy()
  }

  render() {
    return (
      <Layout>
        <Head title="System Map" />
        <Container className="mt-4">
          <Row>
            <Col sm={11} md={9} id="main-col">
              <div className="text-center col-md-10">
                <h1 className="display-1 mb-5">System Map</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
                  commodo at rhoncus, vitae. Consequat, condimentum convallis
                  nisl hac. Et a, sed suscipit egestas fringilla. Eu non
                  tristique facilisi fringilla facilisi arcu urna sociis nibh.
                  Volutpat gravida tincidunt ut venenatis egestas in tellus.
                  Ridiculus commodo vel arcu, facilisis velit, mattis fermentum
                  pellentesque.
                </p>
              </div>
              <div id="characters__title">
                <p>Meet the characters</p>
              </div>

              <StaticQuery
                query={graphql`
                  query {
                    allContentfulSystemMapCharacters {
                      edges {
                        node {
                          id
                          characterInitial
                          characterName
                          characterDescription {
                            characterDescription
                          }
                        }
                      }
                    }
                  }
                `}
                render={data => (
                  <Container id="characters__wrapper" className="stepx">
                    <Row>
                      {data.allContentfulSystemMapCharacters.edges.map(edge => {
                        console.log(edge.node.characterName)
                        return (
                        <Col
                          key={edge.node.id}
                          xs={10}
                          sm={10}
                          md={4}
                          className="mb-5"
                        >
                          <Card>
                            <Card.Body className="character-card__body">
                              <div id="character-card__id">
                                {edge.node.characterInitial}
                              </div>
                              <Card.Title>{edge.node.characterName}</Card.Title>

                              <Card.Text id="character-card__text">
                                { edge.node.characterDescription ? edge.node.characterDescription.characterDescription : '' }
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Col>
                        )
                      }
                        
                      )}
                    </Row>
                    <div id="arrow-down" className="stepx">
                      <svg
                        width="53"
                        height="33"
                        viewBox="0 0 53 33"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M26.5858 23.7187L0 0V9.28125L26.5858 33L53 9.28125V0L26.5858 23.7187Z"
                          fill="#E5521D"
                        />
                      </svg>
                    </div>
                  </Container>
                )}
              />

              <div id="system-map">
                {/* <div id="sm-layer__title">
                  <p></p>
                </div> */}
                <div id="svg-wrapper"></div>
                <div id="step-wrapper">
                  <div className="stepx step-layer"></div>
                  <div className="stepx step-layer"></div>
                  <div className="stepx step-layer"></div>
                </div>
              </div>
            </Col>
            <Col sm={1} md={3} id="sidebar-col">
              <div id="sidebar-wrapper">
                <p id="prompt-0" className="prompt">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Libero tortor sed erat elit. Nibh sapien ipsum nisi justo.
                </p>
                <p id="prompt-1" className="prompt"></p>
                <div id="sm-legend">
                  <p>Legend</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>

        <StaticModal
          show={this.state.showStaticModal}
          onHide={this.handleCloseStatic}
          activeContent={this.state.staticModalActiveContent}
        />

        <CogModal
          show={this.state.showCogModal}
          onHide={this.handleCloseCog}
          activeContent={this.state.cogModalActiveContent}
        />

        <ZapModal
          show={this.state.showZapModal}
          onHide={this.handleCloseZap}
          activeContent={this.state.zapModalActiveContent}
        />

        {/* <Modal
          show={this.state.showCogModal}
          onHide={this.handleClose}
          animation={false}
          style={{ left: this.modalX, top: this.modalY }}
          id="modalCog"
        >
          <Modal.Header closeButton>
            <Modal.Title>Cog Modal</Modal.Title>
          </Modal.Header>
          <Modal.Body>For layers 1 and 2</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal> */}
      </Layout>
    )
  }
}

export default SystemMapPage
