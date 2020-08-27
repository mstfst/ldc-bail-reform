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
    
    return (
      <Row className="justify-content-center mt-2 momentum">
        <Col md="11" >
          <Tab.Container defaultActiveKey="2020">
            <Row>
              { docsByYearReverse.map(function(item) {
                return (
                  <Nav key={ item.year } variant="link" className="flex momentum-tab-row">
                    <Nav.Item className="momentum-tab">
                      <Nav.Link eventKey={ item.year }>
                        <h4>{ item.year }</h4>
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                )
              })}
            </Row>
            <Row className="pl-2 pr-2">
              { docsByYearReverse.map(function(item) {
                return (
                  <Tab.Content key={ item.year }>
                    <Tab.Pane eventKey={ item.year } className="momentum-pane">
                      <Row>
                        <Col sm="6" className="article-list">
                          {item.docs.map(doc => (
                            <Row key={ doc.key } className="no-gutters article-item">
                              <div className="article-item-bg" style={{backgroundImage: `url(http://placekitten.com/g/400/100)`}} alt="{ item.year }"/>
                              <div className="article-heading display-3">
                                { doc.Title }
                              </div>
                            </Row>
                          ))}
                        </Col>
                        <Col sm="6" className="article-preview">
                          <div className="article-card">
                            <div className="article-header">
                              <div className="source">HuffPost</div>
                              <div className="date">03/21/2020</div>
                            </div>
                            <div className="article-body">
                              <b>Article Snippet</b>
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