import React, { Component } from "react"
import "intersection-observer"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import { StaticQuery } from "gatsby"
import { BLOCKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

const Text = ({ children }) => <p>{children}</p>
const ListItem = ({ children }) => <li>{children}</li>
const UnorderedList = ({ children }) => <ul className="x">{children}</ul>
const OrderedList = ({ children }) => <ol>{children}</ol>

const RichTextOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    [BLOCKS.LIST_ITEM]: (node, children) => <ListItem>{children}</ListItem>,
    [BLOCKS.UL_LIST]: (node, children) => (
      <UnorderedList>{children}</UnorderedList>
    ),
    [BLOCKS.OL_LIST]: (node, children) => <OrderedList>{children}</OrderedList>,
  },
}

class GeorgeNarrative extends Component {
  state = {
    georgeModal1: false,
    georgeModal2: false,
  }

  handleGeorgeModal1Show = () => {
    this.setState({
      georgeModal1: true,
    })
  }

  handleGeorgeModal2Show = () => {
    this.setState({
      georgeModal2: true,
    })
  }

  handleModalClose = () => {
    this.setState({
      georgeModal1: false,
      georgeModal2: false,
    })
  }

  querySlideContent = (query, slideNumber, queryType) => {
    switch (queryType) {
      case "heading":
        return query.filter(edge => edge.node.slideNumber === slideNumber)[0]
          .node.heading
      case "body":
        return documentToReactComponents(
          query.filter(edge => edge.node.slideNumber === slideNumber)[0].node
            .story.json,
          RichTextOptions
        )
      case "image":
        return query.filter(edge => edge.node.slideNumber === slideNumber)[0]
          .node.slideImage.fluid.src
    }
  }

  queryModalContent = (query, id, queryType) => {
    switch (queryType) {
      case "heading":
        return query.filter(edge => edge.node.modalId === id)[0].node.heading
      case "body":
        return documentToReactComponents(
          query.filter(edge => edge.node.modalId === id)[0].node.content.json,
          RichTextOptions
        )
      case "image":
        return query.filter(edge => edge.node.modalId === id)[0].node.image.fluid
          .src
    }
  }

  render() {
    const { georgeModal1, georgeModal2 } = this.state
    return (
      <StaticQuery
        query={graphql`
          query GeorgeQuery {
            allContentfulNarrativePageTemplate(
              filter: { character: { regex: "/george/" } }
            ) {
              edges {
                node {
                  slideNumber
                  heading
                  story {
                    json
                  }
                  slideImage {
                    fluid(maxWidth: 500) {
                      src
                    }
                  }
                }
              }
            }
            allContentfulNarrativeModalTemplate(
              filter: { character: { regex: "/george/" } }
            ) {
              edges {
                node {
                  modalId
                  heading
                  content {
                    json
                  }
                  image {
                    fluid(maxWidth: 500) {
                      src
                    }
                  }
                  slide
                }
              }
            }
          }
        `}
        render={data => {
          const narrativeContent = data.allContentfulNarrativePageTemplate.edges
          const modalContent = data.allContentfulNarrativeModalTemplate.edges
          return (
            <div>
              <div className="narrative-step">
                <div className="sticky">
                  <div className="narrative-content">
                    <Row className="justify-content-md-center">
                      <Col md={4}>
                        <img src="./assets/george.png" width="100%" />
                      </Col>
                      <Col md={5}>
                        <h1>
                          {this.querySlideContent(narrativeContent, 1, "heading")}
                        </h1>
                        {this.querySlideContent(narrativeContent, 1, "body")}
                      </Col>
                    </Row>
                  </div>
                </div>
                <div className="scroll-height"></div>
              </div>

              <div className="narrative-step">
                <div className="sticky">
                  <div className="narrative-content">
                    <Row className="justify-content-md-center">
                      <Col md={8}>
                        <div id="george-conditions">
                          <h1>
                            {this.querySlideContent(narrativeContent, 2, "heading")}
                          </h1>
                          {this.querySlideContent(narrativeContent, 2, "body")}
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div className="scroll-height"></div>
              </div>

              <div className="narrative-step">
                <div className="sticky">
                  <div className="narrative-content">
                    <Row className="justify-content-md-center">
                      <Col md={5}>
                        <h1>
                          {this.querySlideContent(narrativeContent, 3, "heading")}
                        </h1>
                        {this.querySlideContent(narrativeContent, 3, "body")}
                      </Col>
                      <Col md={5}>
                        <img
                          src={this.querySlideContent(narrativeContent, 3, "image")}
                          width="100%"
                        />
                      </Col>
                    </Row>
                  </div>
                </div>
                <div className="scroll-height"></div>
              </div>

              <div className="narrative-step">
                <div className="sticky" id="george-choice-slide">
                  <div className="narrative-content">
                    <Row className="justify-content-md-center">
                      <Col md={6}>
                        <h1>
                          {this.querySlideContent(narrativeContent, 4, "heading")}
                        </h1>
                        {this.querySlideContent(narrativeContent, 4, "body")}
                      </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                      <Button
                        size="lg"
                        onClick={this.handleGeorgeModal1Show}
                        className="narrative-button-left"
                      >
                        Work
                  </Button>
                      <Button
                        size="lg"
                        onClick={this.handleGeorgeModal2Show}
                        className="narrative-button-right"
                      >
                        Go Home
                  </Button>
                    </Row>
                  </div>
                </div>
                <div className="scroll-height"></div>
              </div>

              <Modal
                show={georgeModal1}
                onHide={this.handleModalClose}
                animation={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title className="narrative-modal-title">
                    <h1>
                      {this.queryModalContent(modalContent, 5, "heading")}
                    </h1>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Row>
                    <Col md={9}>
                      {this.queryModalContent(modalContent, 5, "body")}
                    </Col>
                    <Col md={2}>
                      <img
                        src={this.queryModalContent(modalContent, 5, "image")}
                        height="200px"
                      />
                    </Col>
                  </Row>
                </Modal.Body>
              </Modal>

              <Modal
                show={georgeModal2}
                onHide={this.handleModalClose}
                animation={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title className="narrative-modal-title">
                    <h1>
                      {this.queryModalContent(modalContent, 6, "heading")}
                    </h1>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {this.queryModalContent(modalContent, 6, "body")}
                </Modal.Body>
              </Modal>

              <div className="narrative-step">
                <div className="sticky">
                  <div className="narrative-content">
                    <Row
                      className="justify-content-md-center"
                      id="george-police-check"
                    >
                      <Col md={2}>
                        <img
                          src={this.querySlideContent(narrativeContent, 5, "image")}
                          width="100%"
                        />
                      </Col>
                      <Col md={5}>
                        <h1>
                          {this.querySlideContent(narrativeContent, 5, "heading")}
                        </h1>
                        {this.querySlideContent(narrativeContent, 5, "body")}
                      </Col>
                    </Row>
                  </div>
                </div>
                <div className="scroll-height"></div>
              </div>

              <div className="narrative-step">
                <div className="sticky">
                  <div className="narrative-content">
                    <Row className="justify-content-md-center">
                      <Col md={7}>
                        <h1>
                          {this.querySlideContent(narrativeContent, 6, "heading")}
                        </h1>
                        {this.querySlideContent(narrativeContent, 6, "body")}
                      </Col>
                    </Row>
                  </div>
                </div>
                <div className="scroll-height"></div>
              </div>
            </div>
          )
        }}
      />
    )
  }
}

export default GeorgeNarrative
