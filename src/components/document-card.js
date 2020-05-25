import React from "react";
import { Card, Button } from "react-bootstrap";

const DocumentCard = ({doc, item, index, active }) => {
  console.log(active);
  return (
    <Card key={`card-${index}`} className="w-75" id={`${item.year}-card-${index}`} style={{display: active ? 'block' : 'none' }}>
      <Card.Header className="text-right bg-primary text-white">
        <small>{doc.date}</small>
      </Card.Header>
      <Card.Body>
        <p>{doc.author}</p>
        <p>{doc.title}</p>
        <p>{doc.quote}</p>
        <Button className="btn-dark">View Document</Button>
      </Card.Body>
    </Card>
  )
}

export default DocumentCard;