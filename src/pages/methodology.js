import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/layout"
import Head from '../components/head';
import DocumentCard from '../components/document-card';

import { graphql } from "gatsby"
import { Container, Row, Col } from "react-bootstrap"
import NoMobile from "../components/NoMobile";

const MethodologyPage = ({data}) => {

  console.log(data.documents);

  // scroller
  const timeline = useRef(null);

  const [state, setState] = useState({
    data: 0,
    steps: [10, 20, 30],
    progress: 0
  });

  const [documents, setDocuments] = useState({})
  const [filter, setFilter] = useState({})

  // define content 
  const years = [ ...data.allContentfulTimelineYear.edges].reverse();
  const categories = [...data.allContentfulTimelineCategory.edges];

  useEffect(() => {

    categories.forEach((category) => {
      const id = category.node.id;
      setFilter( prevState => {
        return {
          ...prevState,
          [id] : false
        }
      })
    })
    
    years.forEach((year) => {
      year.node.documents.forEach( (doc, index ) => {
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


  //Handle Scrollama
  const handleScrollStepEnter = ({element, index, direction}) => {
    const data = state.steps[index];
    element.classList.add('active');
    setState({data});
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
    const scrollOffset = 0.5;
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

  const updateActiveCategories = (id) => {

    setFilter(prevState => {
      return {
        ...prevState,
        [id] : !filter[id]
      }
    });

  }

  useEffect(()=> {
    const indicators = timeline.current.querySelectorAll('.timeline-card-indicator');
    let filterActive = false;

    Object.keys(filter).forEach( (key, index) => {
      if ( filter[key] ) {
        filterActive = true;
      }
    })

    if ( filterActive ) {
      for (const indicator of indicators) {
        indicator.classList.add('disabled');
      }
      Object.keys(filter).forEach( (key, index) => {
        for (const indicator of indicators) {
          if ( filter[key] && indicator.dataset.cat === key) {
            indicator.classList.remove('disabled');
          }
        }
      })
      
    }  else {
      for (const indicator of indicators) {
        indicator.classList.remove('disabled');
      }
    }

  }, [filter])

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
          <Col md="2" xl="2" className="">
            <div className="legend">
              <p className="text-uppercase mb-2">Legend</p>
              <ul className="list-unstyled">
              { categories.map((category, index) => {
                const bg = category.node.hexCode;
                // console.log(bg);
                return (
                  <li key={`category-${index}`}>

                  <div className="form-check">
                    <input 
                      onClick={ () => updateActiveCategories( category.node.id )}
                      className="form-check-input" 
                      type="checkbox" 
                      value="" 
                      id={`defaultCheck-${index}`}
                    />
                    <div className="square" style={{ backgroundColor: bg }}/>
                    <label className="form-check-label" htmlFor={`defaultCheck-${index}`}>
                      { category.node.title }
                    </label>
                  </div>
                    
                    {/* <button 
                      
                      className={`no-swag btn-category ${filter[ category.node.id ] ? 'active' : ''}`}
                      
                    </button> */}
                  </li>
                )
              }
              )}
              </ul>

              <p className="text-uppercase mb-2">Timeline</p>
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
            
            <div ref={timeline} className="timeline-wrapper mr-1 mr-md-5">
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
                 
                    <div className="timeline-year-header-meta mt-3 pr-2 pr-md-5 pb-3">
                      <p className="mb-0"><strong>{item.node.headline}</strong></p>
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
                            data-cat={doc.category ?  doc.category.id : ''}
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

export const query = graphql`
query {
  allContentfulTimelineCategory {
    edges {
      node {
        id
        title
        hexCode
      }
    }
  }
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
            id
            title
            hexCode
          }
        }

      }
    }
  }

  documents: allAirtable {
      nodes {
        data {
          Title
          Author
          Date
          Topic
          Description
        }
        recordId
      }
    }
}

`