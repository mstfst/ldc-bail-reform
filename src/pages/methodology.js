import React, { useState, useEffect } from "react";
import Layout from "../components/layout"
import Head from '../components/head';
import DocumentCard from '../components/document-card';

import { graphql, useStaticQuery } from "gatsby"
import { Container, Row, Col } from "react-bootstrap"
import NoMobile from "../components/NoMobile";

const MethodologyPage = () => {

  // scroller

  const [state, setState] = useState({
    data: 0,
    steps: [10, 20, 30],
    progress: 0
  });

  const [documents, setDocuments] = useState({})

  // console.log(state);

  const data = useStaticQuery(graphql`
    query {
      allContentfulTimelineYear {
        edges {
          node {
            year
            headline
            description {
              description
            }
            events {
              eventTitle
              eventDate
            }
            documents {
              title
              date
              author
              quote
              url
              category {
                title
                hexCode
              }
            }

          }
        }
      }
    }
  `)

  // console.log(data);

  const years = [ ...data.allContentfulTimelineYear.edges].reverse();

  useEffect(() => {
    
    years.map((year) => {
      year.node.documents.map( (doc, index ) => {
        const newKey = `${year.node.year}-card-${index}`;
        
        setDocuments(prevState => {
          return {
            ...prevState,
            [newKey]: index > 0 ? false : true
          }
        });
      });
    })
    
  }, []); 

  const handleScrollStepEnter = ({element, index, direction}) => {

    console.log(element.dataset.index);

    const data = state.steps[index];
    element.classList.add('active');
    setState({data});

    // this.updateActiveDocumentCard(`${element.dataset.index}-card-0`);
  }

  const handleScrollStepExit = ({element, index, direction}) => {
    element.classList.remove('active');
  }

  const handleProgress = ({progress}) => {
    setState({progress});
  }

  useEffect(()=> {
    if (typeof window === 'undefined') return;

    const scrollama = require('scrollama')
    const scrollThreshold = 0.5;
    const scrollOffset = 0.3;
    const scroller = scrollama()

    scroller.setup({
      step: '.timeline-year',
      threshold: scrollThreshold,
      progress: true,
      offset: scrollOffset,
      // debug: true
    })
    .onStepEnter(handleScrollStepEnter)
    .onStepExit(handleScrollStepExit)
    .onStepProgress(handleProgress)

    // setup resize event
    window.addEventListener("resize", scroller.resize);
    return () => {
      scroller.destroy();
      window.removeEventListener('resize', scroller.resize)
    };
  }, [])

  const indicatorClickHandler = (e) => {
   
    const id = e.target.dataset.id;
    updateActiveDocumentCard(id);
  }

  const updateActiveDocumentCard = (id) => {
    const year = id.split('-')[0];
    const newDocuments = { ...documents}

    Object.keys(newDocuments).forEach(v => {
      if ( v.includes(year) ) {
        newDocuments[v] = false
      }
    });

    newDocuments[id] = true;
    setDocuments({...newDocuments});
  }

  return (
    <Layout>
      <Head title="Methodology"/>

      <NoMobile>
      <Container className="my-5 pt-5">
        <Row className="justify-content-center text-center">
          <Col md="8">
            <h1 className="text-rust">LOREM IPSUM DOLOR SIT AMET</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem commodo at rhoncus, vitae. Consequat, condimentum convallis nisl hac. Et a, sed suscipit egestas fringilla. Eu non tristique facilisi fringilla facilisi arcu urna sociis nibh. Volutpat gravida tincidunt ut venenatis egestas in tellus. Ridiculus commodo vel arcu, facilisis velit, mattis fermentum pellentesque.</p>
          </Col>
        </Row>

        <Row className="">
          <Col md="2" xl="2" className="p-4 p-xl-5">
            <div className="legend">
              <p>Legend</p>
              <p>Timeline</p>
              <ul className="list-unstyled">
              { years.map(item => (
                <li key={`legend-${item.node.year}`}>
                  <a href={`#year-${item.node.year}`}>{ item.node.year }</a>
                </li>
              ))}
              </ul>
            </div>

          </Col>
          <Col md="9" xl="9" className="h-100 p-md-4 p-xl-5">
            
            <div className="timeline-wrapper mr-1 mr-md-5">
            { years.map(item => {

              const indicators = {};
              const sortedDocs = [ ...item.node.documents];
              sortedDocs.sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0));
              
              // console.log(documents);
              // console.log(item.node);
              return (
                
              <div key={item.node.year} className="timeline-year mb-5" data-index={item.node.year}>
                <div className="anchor" id={`year-${ item.node.year }`}></div>

                <div className="timeline-year-content position-relative">
                  <div className="timeline-year-content-header d-md-flex pb-2 mb-5">
                    <h1 className="pr-3 timeline-year-label"><strong>{item.node.year}</strong></h1>
                 
                    <div className="timeline-year-header-meta mt-4 pr-2 pr-md-5 pb-3">
                      <p className="mb-1"><strong>{item.node.headline}</strong></p>
                      <p className="mb-0">{item.node.description.description}</p>
                    </div>

                    <div className="timeline-year-indicators">          
                      { sortedDocs.map((doc, index) => {
                        const month = parseFloat(doc.date.split('-')[1]) - 1;

                        //set indicator counts
                        indicators[doc.date] = indicators[doc.date] || [];
                        indicators[doc.date].push([doc.date]);
                        
                        const offsetTop = (indicators[doc.date].length - 1) * 25;
                        const offsetLeft = (month / 12) * 100;

                        const bg = doc.category ? doc.category.hexCode : '#888';

                        return (
                          <div 
                            key={index} 
                            className="timeline-card-indicator" 
                            data-id={`${item.node.year}-card-${index}`} 
                            role="button" 
                            style={{ left: offsetLeft + '%', top: offsetTop + 'px', backgroundColor: bg}}
                            onClick={ indicatorClickHandler }
                          >
                            {item.node.year}-document-{index}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <div className="timeline-year-events">
                  { item.node.events.map((event, index) => {

                    const month = parseFloat(event.eventDate.split('-')[1]) - 1;
                    const offsetTop = (month / 12) * 100;

                    return (
                      <div key={index} className="timeline-event" style={{top: offsetTop + "%"}}>
                        <h6 className="timeline-event-title text-rust mb-0">{event.eventDate}</h6>
                        <p>{event.eventTitle}</p>
                      </div>
                    )
                  })}
                  </div>
                  <div className="timeline-year-docs mr-3 mr-md-5">
                    { sortedDocs.map((doc, index) => {
                      const bg = doc.category ? doc.category.hexCode : '#888';
                      let id = `${item.node.year}-card-${index}`;
                      // console.log(documents[id]);

                      return(
                        <DocumentCard 
                          key={index} 
                          bg={bg}
                          index={index} 
                          doc={doc} 
                          item={item.node} 
                          active={documents[id]}
                        />
                      )
                    })}
                  </div>
                </div>
              </div>
              
            )})
          }
            </div>  
          
          </Col>
        </Row>
      </Container>
      </NoMobile>
    </Layout>
  )
}

export default MethodologyPage