import React from "react";
import { Container, Row, Carousel } from "react-bootstrap";
import food from "../../../../../public/images/carousel/food.jpg";
import drink from "../../../../../public/images/carousel/drink.jpg";
import wifi from "../../../../../public/images/carousel/wifi.jpg";

function HomeAbout() {
    return (
        <Container id="about" className="mh-100 ">
            <Row>
                <Carousel>
                    <Carousel.Item>
                        <Container className="p-0 position-relative">
                            <img
                                className="d-block w-100"
                                src={food}
                                alt="First slide"
                            />
                            <div className="overlay"></div>
                        </Container>
                        <Carousel.Caption>
                            <h3 className="fs-2">Foods</h3>
                            <p className="fs-4">
                                There are over 30 variants of food menu to
                                choose
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Container className="p-0 position-relative">
                            <img
                                className="d-block w-100"
                                src={drink}
                                alt="First slide"
                            />
                            <div className="overlay"></div>
                        </Container>
                        <Carousel.Caption>
                            <h3 className="fs-2">Drinks</h3>
                            <p className="fs-4">
                                Customer can enjoy drinks at a premium quality
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Container className="p-0 position-relative">
                            <img
                                className="d-block w-100"
                                src={wifi}
                                alt="First slide"
                            />
                            <div className="overlay"></div>
                        </Container>
                        <Carousel.Caption>
                            <h3 className="fs-2">Facilities</h3>
                            <p className="fs-4">
                                We provide you the best environment and
                                facilities as we want you to have the best
                                experience
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </Row>
        </Container>
    );
}

export default HomeAbout;
