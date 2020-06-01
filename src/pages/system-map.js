import React, { Component } from "react"
import "intersection-observer"
import Layout from "../components/layout"
import Head from "../components/head"
import "./system-map.scss"
// import {Link, graphql, useStaticQuery} from "gatsby"
import { Container } from "react-bootstrap"
import * as D3 from "d3"

class SystemMapPage extends Component {
  scroller
  steps
  systemMap

  handleScrollStepEnter = ({ element, index, direction }) => {
    console.log("enter")
    if (index === 0) {
      D3.select("#cogs").style("opacity", 0)
      D3.select("#zaps").style("opacity", 0)
    }

    if (index === 1) {
      D3.select("#cogs").style("opacity", 1)
      D3.select("#zaps").style("opacity", 0)
    }

    if (index === 2) {
      D3.select("#cogs").style("opacity", 0)
      D3.select("#zaps").style("opacity", 1)
    }
  }

  handleScrollStepExit = ({ element, index, direction }) => {
    console.log("exit")
  }

  handleProgress = ({ progress }) => {}

  handleResize = () => {
    console.log("resize")
    console.log(this.steps)
    console.log(this.systemMap)

    let stepH = Math.floor(window.innerHeight * 0.75)
    this.steps.style("height", window.innerHeight * 1.5 + "px")

    this.scroller.resize()
  }

  componentDidMount() {
    // Storing handy d3 selections
    this.systemMap = D3.select("#system-map")
    this.steps = D3.select("#step-wrapper").selectAll(".step")

    // Creating the scroller
    const scrollama = require("scrollama")
    this.scroller = scrollama()

    // Firing resize function
    this.handleResize()

    // Setting up the Scroller
    const scrollThreshold = 0.9
    this.scroller
      .setup({
        step: "#step-wrapper .step",
        threshold: scrollThreshold,
        progress: true,
        debug: true,
      })
      .onStepEnter(this.handleScrollStepEnter)
      .onStepExit(this.handleScrollStepExit)
      .onStepProgress(this.handleProgress)

    // setup resize event
    window.addEventListener("resize", this.scroller.resize)
    // Probably the way to resize, below
    // window.addEventListener("resize", this.handleResize);

    // Loading the Systemp Map svg
    D3.xml("assets/svg/SM_mag31.svg").then(function (smSvg) {
      const viewBoxWidth = 1400 // svg container width
      const viewBoxHeight = 700 // svg container height. Needs to be the same as height for svg-wrapper specified in SCSS

      // Storing a selection of the root node for the imported SVG
      let svgMap = D3.select(smSvg).select("svg").node()

      // Appending the imported SVG to svg-wrapper
      let mainSvg = D3.select("#svg-wrapper").node().appendChild(svgMap)

      D3.select(svgMap)
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", "0 0 " + viewBoxWidth + " " + viewBoxHeight)

      // Hiding elements that shouldn't appear right away
      // These will later be shown based on scrollama triggers
      D3.select("#zaps").style("opacity", 0)
      D3.select("#cogs").style("opacity", 0)

      let style = window.getComputedStyle(D3.select(".mt-4.container").node()).marginLeft
      console.log(style)

      // console.log(D3.select(".mt-4.container").node())
      D3.select("#zaps")
        .selectAll("rect")
        .on("click", function (d, i, n) {
          console.log(d)
          console.log(i)
          console.log(n)
          console.log(D3.event.pageX)
          console.log(D3.event.pageY)
          D3.select("#tooltip-div")
            .style("left", D3.event.pageX -150 + "px")
            .style("top", D3.event.pageY - 28 + "px")
            .style("opacity", "1")
            .style("pointer-events", "auto")

          // D3.select("body").style("overflow", "hidden")
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
          <h1>System Map</h1>
          <p>D3 will load here.</p>

          <div id="system-map">
          <div id="tooltip-wrapper">
              <div id="tooltip-div">
                <p>Tooltip</p>
                <button id="closeTooltip">X</button>
              </div>
            </div>
            <div id="svg-wrapper"></div>
            <div id="step-wrapper">
              <div className="step"></div>
              <div className="step"></div>
              <div className="step"></div>
              <div className="step"></div>
            </div>
            
          </div>
        </Container>
      </Layout>
    )
  }
}

export default SystemMapPage
