import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Modal, Row, Col } from "react-bootstrap"
import Img from "gatsby-image"
import "./zap-modal.scss"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

const ZapModal = props => {
  // Change!
  const data = useStaticQuery(
    graphql`
      query ZapModalQuery {
        allContentfulSystemMapZapDetail {
          edges {
            node {
              zapId
              zapImage {
                fluid(maxWidth: 50, maxHeight: 50) {
                  ...GatsbyContentfulFluid
                }
              }
              title
              zapText {
                json
              }
            }
          }
        }
      }
    `
  )

  const options = {
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

  //based on the prop activeContent, let modalContent = the node with a matching id
  let modalContent = data.allContentfulSystemMapZapDetail.edges.find(
    obj => obj.node.zapId === props.activeContent
  )

//   let modalPosition = `${(window.innerHeight - 450) / 2}px`

  if (modalContent) {
    return (
      <Modal
        show={props.show}
        onHide={props.onHide}
        id="modal-zap"
        size="lg"
        // style={{ top: modalPosition }}
      >
        <Modal.Header>
          <Row>
            <Col md="1">
              <div
                style={{  }}
              >
                  <Img fluid={modalContent.node.zapImage.fluid} />
              </div>
            </Col>
            <Col md="11">
              <Modal.Title>{modalContent.node.title}</Modal.Title>
            </Col>
          </Row>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col className="text-container">
              {documentToReactComponents(
                modalContent.node.zapText.json,
                options
              )}
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    )
  } else {
    return <div></div>
  }
}

export default ZapModal
