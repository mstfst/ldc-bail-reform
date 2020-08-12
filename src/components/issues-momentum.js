import React from "react"
import { Row, Col, Nav, Tab } from "react-bootstrap"
import "./issues-momentum.scss"

class MomentumTabs extends React.Component {
  render() {
    const documents = this.props.documents

    // Fetch a list of years from Airtable query
    const years = []
    documents.forEach(item => {
        let year = item.data.Date.slice(0,4);
          if (!(years.includes(year))) {
            years.push(year)
          }
      }
    )
    years.sort().reverse()
    console.log(years)
    
    return (
      <Row className="justify-content-center mt-2 momentum">
        <Col md="8" >
          <Tab.Container defaultActiveKey="2020">
            <Row>
              { years.map(function(year) {
                return (
                  <Nav key={ year } variant="link" className="flex momentum-tab-row">
                    <Nav.Item className="momentum-tab">
                      <Nav.Link eventKey={ year }>
                        <h4>{ year }</h4>
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                )
              })}
            </Row>
            <Row className="pl-2 pr-2">
              { years.map(function(year) {
                return (
                  <Tab.Content key={ year }>
                    <Tab.Pane eventKey={ year } className="momentum-pane">
                      <Row>
                        <Col sm="6" className="article-list">
                        {/* Repeat this per article item */}
                          <Row className="no-gutters article-item">
                            <img src="https://placehold.it/100x100" alt="{ year }"/>
                            <div className="article-heading display-4">
                              Legal Aid Ontario’s Bail Court Cuts Endanger Constitutional Rights, Expert Warns
                            </div>
                          </Row>
                        {/* End article item */}
                        </Col>
                        <Col sm="6" className="article-preview">
                          <div className="article-card">
                            <div className="article-header">
                              <div className="source">HuffPost</div>
                              <div className="date">03/21/2020</div>
                            </div>
                            <div className="article-body">
                              <b>{ year } Article Snippet</b>
                              <p>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Maecenas faucibus mollis interdum. Cras justo odio, dapibus ac facilisis in, egestas eget quam.</p>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Tab.Pane>
                  </Tab.Content>
                )
              })}
            </Row>
          </Tab.Container>
        </Col>
      </Row>
    )
  }
}

export default MomentumTabs