import React, { Component } from "react";
import Layout from "../components/layout"
import Head from '../components/head';
import DocumentCard from '../components/document-card';

import { graphql, StaticQuery } from "gatsby"
import { Row, Col } from "react-bootstrap"

class MethodologyPage extends Component {

  state = {
    documents: {}
  }

  indicatorClickHandler = (e) => {
    const id = e.target.dataset.id;
    const documents = this.state.documents;
    Object.keys(documents).forEach(v => documents[v] = false);
    documents[id] = true;
    this.setState({documents});
  }

  render () {

  return (
    <Layout>
      <Head title="Methodology"/>
      <div className="container">
        <Row className="">
          <Col md="4" xl="3" className="p-4 p-xl-5">
            <h2>interaction</h2>
          </Col>
          <Col md="8" xl="9" className="h-100 p-4 p-xl-5">
            
            <StaticQuery
              query = {graphql`
                query {
                  site {
                    siteMetadata {
                      methodology {
                        year
                        headline
                        copy
                        docs {
                          date
                          author
                          title
                          quote
                        }
                      }
                    }
                  }
                }
              `}
              render = { data => (
                <div className="timeline-wrapper mr-5">
                { data.site.siteMetadata.methodology.map(item => (
                  <div key={item.year} className="timeline-year mb-5">
                    <div className="timeline-year-content">
                      <div className="timeline-year-content-header d-flex pb-2 mb-4">
                        <h1 className="display-3 pr-3"><strong>{item.year}</strong></h1>
                        <div className="timeline-year-header-meta mt-2 pr-5 pb-3">
                          <p className="mb-1"><strong>{item.headline}</strong></p>
                          <p className="mb-0">{item.copy}</p>
                        </div>
                        { item.docs.map((doc, index) => {
                          
                          return (
                            <div 
                              key={index} 
                              className="timeline-card-indicator bg-primary" 
                              data-id={`${item.year}-card-${index}`} 
                              role="button" 
                              style={{ left: index*20 + '%'}} 
                          
                              onKeyDown={ this.indicatorClickHandler } 
                              onClick={ this.indicatorClickHandler }>{index}
                            </div>
                          )
                        })}
                      </div>

                      { item.docs.map((doc, index) => {
                        return(
                          <DocumentCard key={index} index={index} doc={doc} item={item} active={this.state.documents[`${item.year}-card-${index}`]}  />
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          />
            
          </Col>
        </Row>
      </div>
    </Layout>
    // <Layout>
    //   <Head title="Methodology"/>
    //   <Container className="mt-4">
    //   <h1>Methodology</h1> 
    //   <p>Posts will show up heree.</p>
    //   { data.allContentfulBlogPost.edges.map(edge => (
    //     <Link key={edge.node.slug} to={ `/blog/${edge.node.slug}`}>
    //       <Card className="mb-2">
    //         <Card.Body>
    //           <h2>{edge.node.title}</h2>
    //           <p className="mb-0">{edge.node.publishedDate}</p>
    //         </Card.Body>
    //       </Card>
    //     </Link>
    //   ))}
    //   </Container>
    // </Layout>
  )
}
}

export default MethodologyPage