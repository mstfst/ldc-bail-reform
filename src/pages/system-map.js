import React from "react";
import Layout from "../components/layout"
import Head from '../components/head';

// import {Link, graphql, useStaticQuery} from "gatsby"
import { Container } from "react-bootstrap"

import * as D3 from 'd3';

const getRandomData = () =>
  D3.range(20).map(() => ({
    x: Math.random(), 
    y: Math.random()
  }));

const SystemMapPage = () => {
  const data = getRandomData();
  const width = 400;
  const height = 400;

  const xScale = D3.scaleLinear().domain([0,1]).range([0, width]);
  const yScale = D3.scaleLinear().domain([0,1]).range([0, height]);

  return (
    <Layout>
      <Head title="System Map"/>
      <Container className="mt-4">
        <h1>System Map</h1> 
        <p>d3 will load here.</p>
        <svg width={width} height={height}>
          {data.map((d,i) => (
            <circle key={i} cx={xScale(d.x)} cy={yScale(d.y)} r={5} />
          ))}
        </svg>
      </Container>
    </Layout>
  )
}

export default SystemMapPage