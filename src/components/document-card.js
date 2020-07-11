import React from "react";
import { Card, Button } from "react-bootstrap";

const DocumentCard = ({doc, item, index, active }) => {
  // console.log(active);
  return (
    <Card key={`card-${index}`} className={`w-100 ${active ? "active" : ""}`} id={`${item.year}-card-${index}`} style={{display: active ? 'block' : '' }}>
      <Card.Header className="text-right bg-primary py-1">
        <small>{doc.date}</small>
      </Card.Header>
      <Card.Body>
        <h5>{doc.title}</h5>
        <p>{doc.author}</p>
        <h6 className="mb-5">"{doc.quote}"</h6>
        <Button variant="rust">View Document</Button>
      </Card.Body>
    </Card>
  )
}

export default DocumentCard;