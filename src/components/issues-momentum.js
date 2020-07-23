import React from "react"
import { Row, Col, Tabs, Tab } from "react-bootstrap"
// import { Link } from "gatsby"
import "./issues-momentum.scss"

class MomentumTabs extends React.Component {
  render() {
    return (
      <Row>
        <Col md="12">
          <Tabs defaultActiveKey="2017" id="uncontrolled-tab-example">
            <Tab eventKey="2017" title="2017">
              <p>Content for the children here.</p>
            </Tab>
            <Tab eventKey="2018" title="2018">
              <p>Content for the children here.</p>
            </Tab>
            <Tab eventKey="2019" title="2019">
              <p>Content for the children here.</p>
            </Tab>
            <Tab eventKey="2020" title="2020">
              <p>Content for the children here.</p>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    )
  }
}

export default MomentumTabs