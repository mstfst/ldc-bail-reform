import React from "react"
import "intersection-observer";
import Layout from "../components/layout"
import Head from "../components/head"
import "./system-map.scss"

// import {Link, graphql, useStaticQuery} from "gatsby"
import { Container } from "react-bootstrap"

import * as D3 from "D3"

// D3.xml(systemMap, function(systemMap) {
//   console.log(systemMap)
//   console.log("test")
// })

D3.xml("svg/SM_mag16.svg").then(function (xml) {
  console.log(xml)

  const mw = 1400 // svg container width
  const mh = 600 // svg container height

  // Selecting the root node from the imported SVG
  let svgMap = D3.select(xml).select("svg").node()

  // Generate SVG wrapper and append imported SVG
  let mainSvg = D3.select("#svg-wrapper")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", "0 0 " + mw + " " + mh)
    .node()
    .appendChild(svgMap)

  D3.select("#zaps").style("opacity", 0);
  D3.select("#cogs").style("opacity", 0);
})

const getRandomData = () =>
  D3.range(20).map(() => ({
    x: Math.random(),
    y: Math.random(),
  }))

const SystemMapPage = () => {
  const data = getRandomData()
  const width = 400
  const height = 400

  const xScale = D3.scaleLinear().domain([0, 1]).range([0, width])
  const yScale = D3.scaleLinear().domain([0, 1]).range([0, height])

  return (
    <Layout>
      <Head title="System Map" />
      <Container className="mt-4">
        <h1>System Map</h1>
        <p>D3 will load here.</p>
        <svg width={width} height={height}>
          {data.map((d, i) => (
            <circle key={i} cx={xScale(d.x)} cy={yScale(d.y)} r={5} />
          ))}
        </svg>
        <div id="system-map">
          {/* <svg id="svg-wrapper" style={divStyle}></svg> */}
          <svg id="svg-wrapper"></svg>
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

export default SystemMapPage
