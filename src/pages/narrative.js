import React, { Component } from "react"
import "intersection-observer";
// import { Step } from 'react-scrollama';
import Layout from "../components/layout"
import Head from '../components/head';
import { Container } from 'react-bootstrap';

class NarrativePage extends Component {
  scroller;

  state = {
    data: 0,
    steps: [10, 20, 30],
    progress: 0,
  };

  handleScrollStepEnter = ({element, index, direction}) => {
    const data = this.state.steps[index];
    element.style.backgroundColor = 'lightgoldenrodyellow';
    this.setState({data});
  
  }
  handleScrollStepExit = ({element, index, direction}) => {
    element.style.backgroundColor = 'white';
  }

  handleProgress = ({progress}) => {
    this.setState({progress});
  }

  componentDidMount(){
    const scrollama = require('scrollama')
    const scrollThreshold = 0.33
    this.scroller = scrollama()
    this.scroller.setup({
      // debug: true,
      step: '.step',
      threshold: scrollThreshold,
      progress: true,
      // debug: true
    })
    .onStepEnter(this.handleScrollStepEnter)
    .onStepExit(this.handleScrollStepExit)
    .onStepProgress(this.handleProgress)

    // setup resize event
    window.addEventListener("resize", this.scroller.resize);
  }

  componentWillUnmount(){
    this.scroller.destroy();
  }

  render() {
    const { data, steps, progress } = this.state;
    
    return (
      <Layout>
        <Head title="Narrative"/>
        <Container>
        <div className="graphicContainer">
          <div>
          {steps.map(value => (
            <div data={value} key={value} className="step">
              <p>step value: {value}</p>
              <p>step data: {data}</p>
              { value === data && <p>{ Math.round(progress*100) }%</p> }
            </div>
          ))}
          </div>
          <div className="graphic">
            <p>{data}</p>
          </div>
        </div>
        </Container>
      </Layout>
    )
  }
}

export default NarrativePage;