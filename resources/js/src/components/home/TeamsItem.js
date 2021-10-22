import React from "react";
import { Card, Button } from "react-bootstrap";

function TeamsItem({ src, title, text }) {
    return (
        <Card className="mb-3">
            <Card.Img variant="top" src={src} />
            <Card.Body>
                <Card.Title className="mt-2 fs-2">{title}</Card.Title>
                <Card.Text className="fs-4">{text}</Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    );
}

export default TeamsItem;
