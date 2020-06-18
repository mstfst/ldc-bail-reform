import React, { Component } from "react";
import Layout from "./layout"
import Head from './head';
import DocumentCard from './document-card';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css';

import { graphql, StaticQuery } from "gatsby"
import { Row, Col } from "react-bootstrap"
import "./narrative-body.scss"

const background_images = ["./assets/nathan_bg.jpg", "./assets/kara_bg.jpg", "./assets/george_bg.jpg"]

const modal_content = [
  ""
]

class NarrativeSection extends Component {
  scroller;

  state = {
    stp: 0,
    progress: 0,
    bg_image: "./assets/nathan_bg.jpg",
    nathanModal2: false,
    nathanModal1: false,
    karaModal1: false,
    karaModal2: false,
  };

  handleScrollStepEnter = ({ element, index, direction }) => {
    // element.style.backgroundColor = 'lightgoldenrodyellow';
    console.log(index)

    if (index <= 5) {
      this.setState({
        bg_image: background_images[0]
      })
    } else if (index >= 6 && index <= 13) {
      this.setState({
        bg_image: background_images[1]
      })
    } else if (index > 13) {
      this.setState({
        bg_image: background_images[2]
      })
    }
  }
  handleScrollStepExit = ({ element, index, direction }) => {
    // element.style.backgroundColor = 'white';
    // console.log("scroll step exit")
  }

  handleKaraModal1Show = () => {
    this.setState({
      karaModal1: true
    })
  }

  handleKaraModal2Show = () => {
    this.setState({
      karaModal2: true
    })
  }

  handleNathanModal1Show = () => {
    this.setState({
      nathanModal1: true,
    })
  }

  handleNathanModal2Show = () => {
    this.setState({
      nathanModal2: true,
    })
  }

  handleModalClose = () => {
    this.setState({
      nathanModal2: false,
      nathanModal1: false,
      karaModal1: false,
      karaModal2: false,
    })
  }

  handleProgress = ({ progress }) => {
    this.setState({ progress });

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

  componentDidMount() {
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

  componentWillUnmount() {
    this.scroller.destroy();
  }

  render() {
    const { stp, steps, progress, images, bg_image, nathanModal1, nathanModal2, karaModal1, karaModal2 } = this.state;

    const narrativePgStyle = (step) => {
      return {
        opacity: progress > 0.5 ? 1.5 - progress * 2 : progress * 2
      }
    }

    return (
      <div>
        <div className="narrative-background" style={{ backgroundImage: "url(" + bg_image + ")" }}>
        </div>
        <div id="narrative-scroll">
          {/* NATHAN */}
          <div className="narrative-step">
            <Row className="justify-content-md-center">
              <Col md={5}>
                <img src="./assets/nathan.png" width="100%" />
              </Col>
              <Col md={5} className="narrative-text-container">
                <span>
                  <h1>Meet Nathan</h1>
                  <p>Nathan is a 26 year old Indigenous man with a loving family and lots of friends. He struggled in his early twenties with finding his footing, but things were looking up - he was hoping to start taking courses at a local community college. </p>
                  <p>Nathan’s encounter with the bail system began when he was arrested for petty theft. </p>
                </span>
              </Col>
            </Row>
          </div>
          <div className="narrative-step">
            <Row>
              <Col md={{ span: 6, offset: 1 }}>
                <img src="assets/car_white.png" width="100%" />
              </Col>

            </Row>
            <Row className="justify-content-md-center">
              <Col md={9}>
                <h1>Arrest</h1>
                <p>Nathan was on his way home from the grocery store when he was arrested by three police officers. Seeing a few people watching him get arrested, instinctively, he tried to turn away, but was instantly pulled back and swung to the ground, landing on his arm. He groaned. </p>
                <p>As the officers forced him into the back of a police cruiser, Nathan began worrying. What would happen if he didn’t show up for his shift tomorrow? If his boss learned of his arrest, would he lose his job? How would he contact his family to let them know where he was?</p>
                <p>Nathan tried to get answers, calling out his questions, but the officers stayed silent.</p>
              </Col>
            </Row>
          </div>
          <div className="narrative-step">
            <Row className="justify-content-md-center">
              <Col md={4}>
                <img src="assets/payphone_w.png" width="100%" />
              </Col>
              <Col md={6} style={{ position: "relative" }}>
                <span>
                  <h1>The Police Station</h1>
                  <p>Once at the police station, Nathan’s phone and wallet were taken away. He asked to call his family because he knows that they’d be worried sick, but the officers said no. He’d only be allowed to call a lawyer.</p>
                  <p>Nathan didn’t know any lawyers, so the police gave him an option to call duty counsel. The duty counsel told him curtly to not answer any question from the police. Nathan had a lot more questions, but the duty counsel said he had to go. Nathan gripped the phone tightly.</p>
                </span>
              </Col>
            </Row>
          </div>
          <div className="narrative-step">
            <Row className="justify-content-md-center">
              <Col md={8}>
                <h1>The Police Station</h1>
                <p>After the phone call, Nathan found himself in a bare cell. It was bare, with no furniture or even a blanket. He sat down, and the cold floor gave him shivers. As the shock of his arrest faded away, he felt hungry, and realized that he hadn’t had anything to eat or drink in hours. </p>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button size="lg" style={{ margin: "10px" }} onClick={this.handleNathanModal1Show}>Speak Up</Button>
                  <Button size="lg" style={{ margin: "10px" }} onClick={this.handleNathanModal2Show}>Wait</Button>
                </div>
              </Col>
            </Row>

          </div>

          <Modal show={nathanModal1} onHide={this.handleModalClose} animation={false} >
            <Modal.Header closeButton>
              <Modal.Title className="narrative-modal-title">Speak up about being hungry</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col md={9}>
                  <p className="quote">“Hello? Can I get something to eat here? I’m freezing and hungry!”</p>
                  <p>He called this out repeatedly.</p>
                  <p>Eventually a police officer came by. <span className="quote">“We can’t give you anything”</span> he said.</p>
                </Col>
                <Col md={2}>
                  <img src="./assets/cutlery.png" height="200px" />
                </Col>
              </Row>
            </Modal.Body>
          </Modal>

          <Modal show={nathanModal2} onHide={this.handleModalClose} animation={false}>
            <Modal.Header closeButton>
              <Modal.Title className="narrative-modal-title">Wait until someone comes and speak to them</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col md={8}>
                  <p>Nathan decided that there’s no point in speaking up when no one is listening. He curled up in the corner of the cell, trying to preserve what little warmth he has.</p>
                  <p>In the 15 or so hours he was at the station, no one came to give him anything. </p>
                </Col>
                <Col>
                  <img src="./assets/clock_orange.png" width="200px" />
                </Col>
              </Row>
            </Modal.Body>
          </Modal>

          <div className="narrative-step">
            <Row className="justify-content-md-center" >
              <Col md={4}>
                <img src="assets/calendar_p.png" width="100%" />
              </Col>
              <Col md={4} style={{ position: "relative" }}>
                <span>
                  <h1>The Court</h1>
                  <p>The next day Nathan was shoved into a police car and taken to the courthouse, with no idea as to what might happen there. After getting pat-down searched at a screening area, he was taken into a filthy holding cell. There were stains on the floor, and the air stank. No toilet paper - no dry ones, anyway. At one point, an officer dropped off two cereal bars and a juice box. Nathan wolfed them down. Those were the first things he had eaten in more than a day. </p>
                  <p>Nathan didn’t end up seeing a judge - his bail hearing was delayed until further notice.</p>
                </span>
              </Col>
            </Row>
          </div>

          <div className="narrative-step">
            <Row className="justify-content-md-center">
              <Col md={8}>
                <h1>What Happened Next</h1>
                <p>In the end, Nathan spent 8 days in pretrial detention before charges against him were withdrawn by the crown.</p>
                <p>The consequences of Nathan’s time in detention were severe. He lost his job because he couldn’t communicate with his boss while detained. He started experiencing trauma from the harsh conditions at police and court holding cells. </p>
                <p>Going to college suddenly looked impossible. </p>
              </Col>
            </Row>

          </div>

          {/* KARA */}
          <div className="narrative-step">
            <Row className="justify-content-md-center">
              <Col md={5} className="narrative-text-container">
                <span>
                  <h1>Meet Kara</h1>
                  <p>Kara is an unemployed single mother on disability. Before she got arrested for possession of drugs, she was trying to enroll her 6 year-old daughter Olivia in elementary school.</p>
                  <p>Kara has been in remand for several weeks after her arrest.</p>
                </span>
              </Col>
              <Col md={4}>
                <img src="./assets/kara.png" width="100%" />
              </Col>
            </Row>
          </div>

          <div className="narrative-step">
            <Row className="justify-content-md-center" md={4}>
              <Col>
                <Card>
                  <Card.Body className="phone-card">
                    This is some text within a card body.
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card>
                  <Card.Body className="phone-card">
                    This is some text within a card body.
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card>
                  <Card.Body className="phone-card">
                    This is some text within a card body.
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col md={9}>
                <h1>Contacting family</h1>
                <p>Once a week, Kara got on the telephone system at her jail to call her mom and Olivia. Olivia often refused to talk, insisting that Kara abandoned her. But with the call costing a dollar per minute, Kara often didn’t have the time to cheer Olivia up. </p>
                <p>Getting in contact with her family after her arrest was tough. The jail only allowed calls to landlines.</p>
              </Col>
            </Row>
          </div>

          <div className="narrative-step">
            <Row className="justify-content-md-center">
              <Col md={8}>
                <h1>Family or money?</h1>
                <p>Amy was a friend with a landline and an easy-to-remember number. Through her, Kara got in touch with her mom, but not before a full week had gone by. She considered purchasing her mom landline so that she could talk without relying  on Amy. But her bills were piling up. </p>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button size="lg" style={{ margin: "10px" }} onClick={this.handleKaraModal1Show}>Buy Landline</Button>
                  <Button size="lg" style={{ margin: "10px" }} onClick={this.handleKaraModal2Show}>Call Amy</Button>
                </div>
              </Col>
            </Row>

          </div>

          <Modal show={karaModal1} onHide={this.handleModalClose} animation={false}>
            <Modal.Header closeButton>
              <Modal.Title className="narrative-modal-title">Buy a landline duty</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col md={9}>
                  <p>Kara could now call her family as long as the phone system is available, but in doing so, she took on more debt.</p>
                </Col>
                <Col md={2}>
                  <img src="./assets/phone.png" height="200px" />
                </Col>
              </Row>
            </Modal.Body>
          </Modal>

          <Modal show={karaModal2} onHide={this.handleModalClose} animation={false}>
            <Modal.Header closeButton>
              <Modal.Title className="narrative-modal-title">Stick with calling Amy</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col md={9}>
                  <p>Amy is unavailable on some weekends, so sometimes Kara had to wait for two weeks to call her family. </p>
                </Col>
                <Col>
                  <img src="./assets/hourglass.png" width="125px" />
                </Col>
              </Row>
            </Modal.Body>
          </Modal>

          <div className="narrative-step">
            <Row className="justify-content-md-center">
              <Col md={8}>
                <h1>Life in jail</h1>
                <p>
                  Outside of the weekly call, Kara didn’t talk much. Her cellmate Nicole sometimes snapped at her. She could never get a good night’s sleep because the light was always on.
                </p>
                <p>
                  For 18 hours a day, Kara was locked inside her cell. Once every few days the whole facility went into a lockdown that could last for days. No one could leave their cell for any purpose when that happened.
                </p>
              </Col>
            </Row>
          </div>

          <div className="narrative-step">
            <Row className="justify-content-md-center">
              <Col md={8}>
                <h1>Opportunity for bail</h1>
                <p>
                  After shuttling back and forth between the bail court and jail, finally, during her tenth trip to bail court, she heard from duty counsel about possibly getting released before her trial. </p>
                <p>
                  She would need a surety: a person who would put up money and promise that Kara’d obey her bail conditions - likely a curfew and some restrictions on where she could go - and showing up to her trial. The surety would only lose the money if Kara didn’t show up. Getting a surety would make a huge difference for Kara and her family - her mom was struggling to care for herself, and looking after Olivia was a huge strain.
                </p>
              </Col>
            </Row>
          </div>

          <div className="narrative-step">
            <Row className="justify-content-md-center" md={3}>
              <Col>
                <Card className="kara-card">
                  <Card.Body className="kara-card-content">
                    <h1>Monique</h1>
                    <ul>
                      <li>Recently lost her job as a bank teller</li>
                      <li>Instacart worker</li>
                    </ul>
                  </Card.Body>
                </Card>
                <Card className="kara-card">
                  <Card.Body className="kara-card-content">
                    <h1>Lisa</h1>
                    <ul>
                      <li>Home-care worker</li>
                      <li>Lives with employer</li>
                    </ul>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className="kara-card">
                  <Card.Body className="kara-card-content">
                    <h1>Alex</h1>
                    <ul>
                      <li>Uber driver</li>
                    </ul>
                  </Card.Body>
                </Card>
                <Card className="kara-card">
                  <Card.Body className="kara-card-content">
                    <h1>Mike</h1>
                    <ul>
                      <li>Starbucks barista</li>
                      <li>Night shift janitor</li>
                      <li>Has a kid entering university</li>
                    </ul>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <h1>None fits the requirements</h1>
            </Row>
          </div>

          <div className="narrative-step">
            <Row className="justify-content-md-center">
              <Col md={3}>
                <img src="./assets/mobile.png" width="80%" />
              </Col>
              <Col md={5}>
                <h1>Phone call</h1>
                <p>
                  On Sunday, Kara got on the phone. She got right to the point and asked her mom for help finding a surety.
                </p>
                <p>
                  “Are you sure that’s the only way?” Kara’s mom said. “I’m gonna try to find you a surety - but what if I can’t find anyone? Nobody has any savings these days. And people have been avoiding me since they heard about what happened to you!”
                </p>
              </Col>
            </Row>
          </div>

          <div className="narrative-step">
            <Row className="justify-content-md-center">
              <Col md={7}>
                <h1>What happened next</h1>
                <p>
                  In the end Kara couldn’t find a surety. No surety, no bail. Kara was to be detained until her trial, scheduled for several months later.
                </p>
              </Col>
            </Row>
          </div>

          {/* GEORGE */}
          <div className="narrative-step">
            <Row className="justify-content-md-center">
              <Col md={4}>
                <img src="./assets/george.png" width="100%" />
              </Col>
              <Col md={5}>
                <h1>Meet George</h1>
                <p>
                  George is a 31 years old who enjoys gaming and playing with his cat. He has schizophrenia and anxiety. Before his arrest, he worked in technology support and was managing his condition well with the medications he took. But then came the charges: uttering verbal threats. </p>
                <p>
                  After three days in remand, George learned of the conditions for getting bail.
                </p>
              </Col>
            </Row>
          </div>

          <div className="narrative-step">
            <Row className="justify-content-md-center">
              <Col md={8}>
                <div id="george-conditions">
                  <h1>Conditions</h1>
                  <ol>
                    <li>
                      Reside with surety at said address and be amenable to the routine and discipline of the household
                    </li>
                    <li>
                      Remain in your residence at all times
                  <h2>EXCEPT</h2>
                      <ul>
                        <li class="x">
                          for purposes of traveling directly to, from and while at work or school and only with the approval, either in writing or by email or text from your surety for each shift or schedule
                        </li>
                        <li class="x">
                          unless you are in the direct and continuous presence of your surety
                        </li>
                      </ul>
                    </li>
                    <li>
                      Do not possess or consume any unlawful drugs or substances (refer to the Controlled Drugs and Substances Act) except valid prescription in your name
                    </li>
                  </ol>
                </div>
              </Col>
            </Row>
          </div>

          <div className="narrative-step">
            <Row>
              <Col>
                <h1>Out on bail</h1>
                <p>
                  George thought the bail conditions were quite unreasonable considering his circumstances and what he was charged for. For the sake of being released from remand, however, duty counsel accepted the conditions. His hearing was scheduled, and five days later, he was released on the conditions he had agreed to: recognizance with residential surety, curfew and drug treatment.
                </p>
              </Col>
              <Col>
                <img src="./assets/keys.png" />
              </Col>
            </Row>
          </div>

          <div className="narrative-step">
            <Row>
              <Col>
                <h1>Working while on bail</h1>
                <p>A few weeks after George was released, on a steamy Friday afternoon at the end of his shift, a worker didn’t show up for her shift. George’s boss then threatened that he’d fire George unless George worked an extra three hours after his shift to cover for the worker. </p>
                <p>If George lost his job, it would be extremely hard for him to get hired somewhere else due to his involvement with the justice system. But he also knew that he would get in trouble if Anita didn’t know about or agreed to him working extra.</p>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Button size="lg" style={{ margin: "10px" }} onClick={this.handleKaraModal1Show}>Buy Landline</Button>
              <Button size="lg" style={{ margin: "10px" }} onClick={this.handleKaraModal2Show}>Call Amy</Button>
            </Row>
          </div>

          <div className="narrative-step">
            <Row className="justify-content-md-center" id="george-police-check">
              <Col md={2}>
                <img src="./assets/buzzer.png" width="100%" />
              </Col>
              <Col md={5}>
                <h1>Police check</h1>
                <p>
                  Having agreed to stay at work, George tried to reach his surety, but he couldn’t get an internet connection. The customers were waiting. He put his phone away.
                </p>
                <p>
                  When the police did their check knock on George’s door to make sure he was at home, there was no answer.
                </p>
              </Col>
            </Row>
          </div>

          <div className="narrative-step">
            <Row>
              <Col>
                <h1>What happened next</h1>
                <p>
                George was stunned when he came home to a police car and two police officers waiting at his door. He was arrested again for breaking bail conditions and now had more charges than before.</p> 
<p>Breaking bail conditions is an Administration of Justice offense extremely difficult to get bail for. As a result, George planned to plead guilty for failing to comply just so he could have better access to mental health care programs as a sentenced prisoner.
                </p>
              </Col>
            </Row>
          </div>

        </div>
      </div>
    )
  }
}

export default NarrativeSection