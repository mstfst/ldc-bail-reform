import React, { Component } from "react";
import Layout from "./layout"
import Head from './head';
import DocumentCard from './document-card';
import { Container, Button, Modal } from 'react-bootstrap';
import * as d3 from 'd3';

import { graphql, StaticQuery } from "gatsby"
import { Row, Col } from "react-bootstrap"
import "./narrative-body.scss"


const narration = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec risus urna, tincidunt vitae lacus ut, aliquet pellentesque justo. Duis vel ante tincidunt, tincidunt ipsum et, placerat dui. Fusce at sem at ipsum faucibus auctor. Nam sapien nisi, auctor imperdiet suscipit sit amet, dignissim at libero. In in lorem facilisis, egestas enim a, vestibulum lorem. Aenean facilisis leo id justo pharetra volutpat. Vivamus consequat iaculis ultricies. Suspendisse eu tincidunt odio, vitae aliquam velit. Integer tristique metus mi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rutrum molestie metus vel sodales. Cras a massa non justo bibendum egestas a nec lectus. Fusce faucibus sapien vel nulla dapibus ornare. Nulla fringilla felis non venenatis feugiat. Nam ultricies ornare sapien eu luctus.",
  " \n  ",
  "Nullam vehicula libero vel augue fermentum, ut ultrices felis mollis. Duis a arcu lacus. Donec a urna non metus posuere luctus eget et risus. Praesent diam turpis, finibus eu dolor eu, cursus scelerisque est. Morbi fringilla feugiat urna malesuada ultrices. Cras vitae placerat erat, non finibus diam. Curabitur vitae mi ex. Donec in convallis mauris."
]

class NarrativeSection extends Component {
  scroller;
  
  state = {
    stp: 0,
    steps: [0,1,2],
    backgroundImages: ["assets/cell-window.jpg", "assets/convict-direction.jpg", "assets/jail-cell.jpg"],
    progress: 0,
    narrativeBgImg: "assets/cell-window.jpg",
    modal1State: false,
    modal2state: false
  };

  handleScrollStepEnter = ({element, index, direction}) => {
    // element.style.backgroundColor = 'lightgoldenrodyellow';
    this.setState({
      stp: this.state.steps[index]
    }) 
  }
  handleScrollStepExit = ({element, index, direction}) => {
    // element.style.backgroundColor = 'white';
    // console.log("scroll step exit")
  }

  handleProgress = ({progress}) => {
    this.setState({progress});

    if (progress < 0.3) {
      this.setState({
        narrativeBgImg: "assets/cell-window.jpg"
      })
    } else if (progress < 0.6) {
      this.setState({
        narrativeBgImg: "assets/convict-direction.jpg"
      })
    } else {
      this.setState({
        narrativeBgImg: "assets/jail-cell.jpg"
      })
    }
  }

  componentDidMount(){
    const scrollama = require('scrollama')
    const scrollThreshold = 0.33
    this.scroller = scrollama()

    this.scroller.setup({
      container: '#narrative-scroll',
      step: '.narrative-step',
      threshold: scrollThreshold,
      progress: true,
      debug: false
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

  render () {
  const { stp, steps, progress, images, narrativeBgImg } = this.state;


  const narrativePgStyle = (step) => {
    console.log(step)
    return {
      paddingTop: "30vh",
      paddingLeft: "10vw",
      paddingRight: "10vw",
      paddingBottom: "50vh",
      fontSize: "1.3em",
      color: "white",
      opacity: progress > 0.5? 1.5-progress*2 : progress*2
    }
  }

  return (
    <div>
      <div style={{
        top: "0",
        left: "0",
        margin: "0",
        width: "99vw",
        height: "100vh",
        backgroundImage: `url("assets/arrest-handcuffs-adobestock.jpg")`,
        backgroundSize: "cover",
        position: "fixed",
        zIndex: "-1",
        opacity: 1
      }}>
      </div>
      <div id="narrative-scroll">
        <div className="narrative-step" style={narrativePgStyle(1)}>
          <Row>
            <Col sm={4}>
              <img src="assets/avatar.png" width="100%"/>
            </Col>
            <Col sm={8} style={{position: "relative"}}>
              <span style={{position: "absolute", bottom: 0, right: 0}}>
                <h1>Meet Nathan</h1> 
                <p>Nathan is a 26 year old Indigenous man with a loving family and lots of friends. He struggled in his early twenties with finding his footing, but things were looking up - he was hoping to start taking courses at a local community college. </p>
                <p>Nathan’s encounter with the bail system began when he was arrested for petty theft. </p>
              </span>
            </Col>
          </Row>
        </div>
        <div className="narrative-step" style={narrativePgStyle(1)}>
          <img src="assets/car_small.png" width="60%" style={{marginLeft: "-5vw"}}/>
          <h1>Arrest</h1>
          <p>Nathan was on his way home from the grocery store when he was arrested by three police officers. Seeing a few people watching him get arrested, instinctively, he tried to turn away, but was instantly pulled back and swung to the ground, landing on his arm. He groaned. </p>
          <p>As the officers forced him into the back of a police cruiser, Nathan began worrying. What would happen if he didn’t show up for his shift tomorrow? If his boss learned of his arrest, would he lose his job? How would he contact his family to let them know where he was?</p>
          <p>Nathan tried to get answers, calling out his questions, but the officers stayed silent.</p>
        </div>
        <div className="narrative-step" style={narrativePgStyle(1)}>
          <Row>
            <Col sm={4}>
              <img src="assets/payphone.png" width="100%"/>
            </Col>
            <Col sm={8} style={{position: "relative"}}>
              <span style={{position: "absolute", bottom: "10vh", right: 0}}>
                <h1>The Police Station</h1> 
                <p>Once at the police station, Nathan’s phone and wallet were taken away. He asked to call his family because he knows that they’d be worried sick, but the officers said no. He’d only be allowed to call a lawyer.</p>
                <p>Nathan didn’t know any lawyers, so the police gave him an option to call duty counsel. The duty counsel told him curtly to not answer any question from the police. Nathan had a lot more questions, but the duty counsel said he had to go. Nathan gripped the phone tightly.</p>
              </span>
            </Col>
          </Row>
        </div>
        <div className="narrative-step" style={narrativePgStyle(1)}>    
          <h1>The Police Station</h1> 
          <p>After the phone call, Nathan found himself in a bare cell. It was bare, with no furniture or even a blanket. He sat down, and the cold floor gave him shivers. As the shock of his arrest faded away, he felt hungry, and realized that he hadn’t had anything to eat or drink in hours. </p>
          <div style={{display:"flex", justifyContent:"center"}}>
            <Button size="lg" style={{margin:"10px"}}>Speak Up</Button>
            <Button size="lg" style={{margin:"10px"}}>Wait</Button>
          </div>
        </div>

        <Modal>
          <Modal.Header closeButton>
            <Modal.Title>Speak up about being</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>“Hello? Can I get something to eat here? I’m freezing and hungry!” He called this out repeatedly.</p>
            <p>Eventually a police officer came by. “We can’t give you anything” he said.</p>
          </Modal.Body>
        </Modal>

        <Modal>
          <Modal.Header closeButton>
            <Modal.Title>Wait until someone comes and speak to them</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Nathan decided that there’s no point in speaking up when no one is listening. He curled up in the corner of the cell, trying to preserve what little warmth he has.</p>
            <p>In the 15 or so hours he was at the station, no one came to give him anything. </p>
          </Modal.Body>
        </Modal>

        <div className="narrative-step" style={narrativePgStyle(1)}>    
          <Row>
            <Col sm={4}>
              <img src="assets/calendar.png" width="100%"/>
            </Col>
            <Col sm={8} style={{position: "relative"}}>
              <span style={{position: "absolute", bottom: "10vh", right: 0}}>
                <h1>The Court</h1> 
                <p>The next day Nathan was shoved into a police car and taken to the courthouse, with no idea as to what might happen there. After getting pat-down searched at a screening area, he was taken into a filthy holding cell. There were stains on the floor, and the air stank. No toilet paper - no dry ones, anyway. At one point, an officer dropped off two cereal bars and a juice box. Nathan wolfed them down. Those were the first things he had eaten in more than a day. </p>
                <p>Nathan didn’t end up seeing a judge - his bail hearing was delayed until further notice.</p>
              </span>
            </Col>
          </Row>
        </div>
        <div className="narrative-step" style={narrativePgStyle(1)}>    
          <h1>Conclusion</h1> 
          <p>In the end, Nathan spent 8 days in pretrial detention before charges against him were withdrawn by the crown.</p>
          <p>The consequences of Nathan’s time in detention were severe. He lost his job because he couldn’t communicate with his boss while detained. He started experiencing trauma from the harsh conditions at police and court holding cells. </p>
          <p>Going to college suddenly looked impossible. </p>
        </div>
      </div>
    </div>
  )
}
}

export default NarrativeSection