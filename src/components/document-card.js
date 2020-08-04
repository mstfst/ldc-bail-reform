import React from "react";
import { Card } from "react-bootstrap";

const DocumentCard = ({doc, bg, item, index, active, category = 1 }) => {
  let colour = '',
      headerTextColour = ''

  if (category == 1) {
    colour = 'purple'
    headerTextColour = 'white'
  }
  // console.log(active);
  return (
    <Card key={`card-${index}`} className={`timeline-card w-100 ${active ? "active" : ""}`} id={`${item.year}-card-${index}`} style={{display: active ? 'block' : '' }}>
      <Card.Header className={`text-right text-${headerTextColour} py-1`} style={{ backgroundColor: bg }}>
        <h5 className="text-uppercase my-1">{doc.date}</h5>
      </Card.Header>
      <Card.Body>
        <p className="mb-2">{doc.author}</p>
        <p className="lead" style={{ color: bg }}>{doc.title}</p>
        <p className={`lead `}><em>"{doc.quote}"</em></p>
        <a className="btn btn-rust" target="_blank" href={doc.url}> View Document</a>
      </Card.Body>
    </Card>
  )
}

export default DocumentCard;