import React from "react"
import { Row, Col, Nav, Tab } from "react-bootstrap"
import "./issues-momentum.scss"

class MomentumTabs extends React.Component {
  render() {
    // Rename data to make it more legible
    const airtable = this.props.documents

    // Temp storage of keys
    const docsByYear = {};
    // Check that data was fetched
    if (airtable && Object.keys(airtable)) {
      // Group docs from same year
      Object.keys(airtable).forEach(function(i) {
        // Create key for grouping
        var tempKey = airtable[i].data.Publish__or_Start_Date_.slice(0,4);
        if (!docsByYear.hasOwnProperty(tempKey)) {
          docsByYear[tempKey] = {
            "year": tempKey,
            "docs": [] // new nested array of docs
          }
        }
        // push docs into the nested array under the year
        docsByYear[tempKey].docs.push(airtable[i].data);
      });
    }
    // Map objects to final results array
    const docsByYearArray = Object.keys(docsByYear).map(function(key) {
      return docsByYear[key];
    })

    // Reverse order of years
    const docsByYearReverse = docsByYearArray.sort().reverse();

    console.log(docsByYearReverse)
    
    return (
      <Row className="justify-content-center mt-2 momentum">
        <Col md="12" xl="8">
          <Tab.Container defaultActiveKey="2020">
            <Row className="pl-1">
                { docsByYearReverse.map(item => (
                  <Nav key={ item.year } variant="link" className="flex momentum-tab-wrap px-1">
                    <Nav.Item className="momentum-tab">
                      <Nav.Link eventKey={ item.year } className="px-3 py-1">
                        <h4>{ item.year }</h4>
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                ))}
            </Row>

            <Row className="pl-2 pr-2">
              { docsByYearReverse.map(item => (
                <Tab.Content key={ item.year }>
                  <Tab.Pane eventKey={ item.year } className="momentum-pane">
                    <Row>
                      <Tab.Container defaultActiveKey="0">
                        <Col sm="6" className="article-list">
                            <Nav variant="link">
                            {item.docs.map(function(doc, index) {
                              return (
                              <Nav.Item key={ index } className="article-item">
                                <Nav.Link eventKey={ index } className="article-heading display-4 align-items-center">
                                  { doc.Title }
                                </Nav.Link>
                              </Nav.Item>
                              )})}
                            </Nav>
                        </Col>
                        <Col sm="6" className="article-preview">
                          {item.docs.map(function(doc, index) {
                            return (
                            <Tab.Content key={ index }>
                              <Tab.Pane eventKey={ index } className="article-card bg-light">
                                <div className="article-header">
                                  <div className="source">{ doc.Author_s_ }</div>
                                  <div className="date">{ doc.Publish__or_Start_Date_ }</div>
                                </div>
                                <div className="article-body">
                                  <b>{ doc.Title }</b>
                                  <p>{ doc.Momentum_Annotation }</p>
                                  <a href="{ doc.URL }">Read More &raquo;</a>
                                </div>
                              </Tab.Pane>
                            </Tab.Content>
                          )})}
                        </Col>
                      </Tab.Container>
                    </Row>
                  </Tab.Pane>
                </Tab.Content>
              ))}
            </Row>
          </Tab.Container>
        </Col>
      </Row>
    )
  }
}

export default MomentumTabs