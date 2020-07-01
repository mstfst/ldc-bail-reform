import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Modal, Row, Col } from "react-bootstrap"
import Img from "gatsby-image"
import "./moving-modal.scss"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

const MovingModal = props => {
  // Change!
  const data = useStaticQuery(
    graphql`
      query MovingModalQuery {
        allContentfulSystemMapCogDetail {
          edges {
            node {
              cogId
              cogImage {
                fluid(maxWidth: 50, maxHeight: 50) {
                  ...GatsbyContentfulFluid
                }
              }
              title
              characters {
                characterInitial
              }
              cogHow {
                json
              }
              cogWhat {
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
  let modalContent = data.allContentfulSystemMapCogDetail.edges.find(
    obj => obj.node.cogId === props.activeContent
  )

//   let modalPosition = `${(window.innerHeight - 450) / 2}px`

  if (modalContent) {
    return (
      <Modal
        show={props.show}
        onHide={props.onHide}
        id="modal-moving"
        size="lg"
        // style={{ top: modalPosition }}
      >
        <Modal.Header>
          <Row>
            <Col md="1">
              <div
                style={{  }}
              >
                  <Img fluid={modalContent.node.cogImage.fluid} />
              </div>
              {/* <Col md="4">
              <Img fluid={modalContent.node.cogSvg.fluid} />
            </Col> */}
            </Col>
            <Col md="9">
              <Modal.Title>{modalContent.node.title}</Modal.Title>
            </Col>
            {modalContent.node.characters.map(character => (
              <Col md="1">
                <div className="moving-modal__id">
                  {character.characterInitial}
                </div>
              </Col>
            ))}
          </Row>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <p className="moving-modal__subtitle">What’s being decided:</p>
              {documentToReactComponents(
                modalContent.node.cogWhat.json,
                options
              )}
            </Col>
            <Col>
              <p className="moving-modal__subtitle">How’s it being decided?</p>
              {documentToReactComponents(
                modalContent.node.cogHow.json,
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

export default MovingModal
