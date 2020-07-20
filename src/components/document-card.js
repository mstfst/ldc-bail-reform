import React from "react";
import { Card, Button } from "react-bootstrap";

const DocumentCard = ({doc, bg, item, index, active, category = 1 }) => {
  let colour = '',
      headerTextColour = ''

  if (category == 1) {
    colour = 'purple'
    headerTextColour = 'white'
  }
  // console.log(active);
  return (
    <Card key={`card-${index}`} className={`w-100 ${active ? "active" : ""}`} id={`${item.year}-card-${index}`} style={{display: active ? 'block' : '' }}>
      <Card.Header className={`text-right text-${headerTextColour} py-1`} style={{ backgroundColor: bg }}>
        <small>{doc.date}</small>
      </Card.Header>
      <Card.Body>
        <p>{doc.author}</p>
        <h5>{doc.title}</h5>
        <p className={`lead `} style={{ color: bg }}><em>"{doc.quote}"</em></p>
        <a className="btn btn-rust" target="_blank" href={doc.url} style={{ backgroundColor: bg }}> View Document</a>
      </Card.Body>
    </Card>
  )
}

export default DocumentCard;