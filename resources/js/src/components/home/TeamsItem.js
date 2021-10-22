import React from "react";
import { Card, Button } from "react-bootstrap";

function TeamsItem({ src, title, text }) {
    return (
        <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={src} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{text}</Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    );
}

export default TeamsItem;
