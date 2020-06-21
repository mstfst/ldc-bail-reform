import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Modal, Button, Row, Col } from 'react-bootstrap'
import Img from "gatsby-image"

// const StaticModal = ({data}) => {
const StaticModal = (props) => {

  // https://www.gatsbyjs.org/docs/use-static-query/

  const data = useStaticQuery(
    graphql`
      query StaticModalQuery{
        allContentfulSystemMapStageDetail {
          edges {
            node {
              stageId
              title
              stageContent {
                json
              }
              stageImage {
                title
                fluid(maxHeight: 400, maxWidth: 400) {
                  ...GatsbyContentfulFluid
                }
              }
              stageFootnote
            }
          }
        }
      }
    `
  )

  //based on the prop activeContent, let modalContent = the node with a matching id
  let modalContent = data.allContentfulSystemMapStageDetail.edges.find(obj => obj.node.stageId === props.activeContent);
  
  if (modalContent) {
    return (
      <Modal
        show={props.show}
        onHide={props.onHide}
        id="modalFixed"
      >
        <Modal.Header closeButton>
          <Modal.Title>{ modalContent.node.title }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md="4">
              <Img fluid={modalContent.node.stageImage.fluid} />
            </Col>
            <Col>
            </Col>
          </Row>
        </Modal.Body> 
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )
  } else {
    return (
      <div></div>
    )
  }
}

export default StaticModal;