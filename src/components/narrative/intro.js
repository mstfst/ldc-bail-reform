import React, { Component } from "react"
import "intersection-observer"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import { StaticQuery, graphql } from "gatsby"
import { BLOCKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

const RichTextOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>,
  },
}

class NathanNarrative extends Component {
  state = {
    nathanModal2: false,
    nathanModal1: false,
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
        return query.filter(edge => edge.node.modalId === id)[0].node.image
          .fluid.src
    }
  }

  scrollHeight = () => {
    return {
      height: "100vh",
    }
  }

  render() {
    const { nathanModal1, nathanModal2 } = this.state

    var nathan1Style = () => {
      console.log(this.props.allContentfulNarrativePageTemplatestep)
      if (this.props.step <= 1) {
        return {
          position: "sticky",
          top: 0,
        }
      } else {
        return {
          position: "relative",
        }
      }
    }

    return (
      <div className="narrative-step">
        <div className="sticky" id="narrative-intro">
          <div className="narrative-content" >
            <Row className="justify-content-md-center">
              <Col md={7} className="narrative-text-container">
                <h1 id="narrative-intro-header">LOREM IPSUM DOLOR SIT AMET</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
                  commodo at rhoncus, vitae. Consequat, condimentum convallis
                  nisl hac. Et a, sed suscipit egestas fringilla. Eu non
                  tristique facilisi fringilla facilisi arcu urna sociis nibh.
                </p>
              </Col>
            </Row>
            <Row>
              <div id="narrative-scroll-indicator">
                <p>Start Scrolling</p>
                <img src="./assets/down_arrow.svg" />
              </div>
            </Row>
          </div>
        </div>
        <div className="scroll-height"></div>
      </div>
    )
  }
}

export default NathanNarrative
