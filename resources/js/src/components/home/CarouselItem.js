import React from "react";
import { Carousel } from "react-bootstrap";

function CarouselItem({ url, title, description }) {
    return (
        <Carousel.Item>
            <img className="d-block w-100" src={url} alt="First slide" />
            <Carousel.Caption>
                <h3>{title}</h3>
                <p>{description}</p>
            </Carousel.Caption>
        </Carousel.Item>
    );
}

export default CarouselItem;
