import React from "react"
import { Container, Row, Col } from "react-bootstrap"

const NoMobile = ({ children, hasMobile }) => {
  if ( hasMobile ) {
    return (
      { children }
    )
  }
  else {
    return (
      <>
        <div className='d-sm-none'>
          <Container className="py-4">
            <Row>
              <Col>
                <h2>Please visit this page from a desktop for the best experience.</h2>
              </Col>
            </Row>
          </Container>
        </div>
        <div className='d-none d-sm-block'>
          { children }
        </div>
      </>
    )
  }
}

export default NoMobile;