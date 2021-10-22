import React from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import heroes from "../../../../../public/images/home-heroes.jpg";

function HomeIntro() {
    return (
        <Container id="home" className="py-5">
            <Row>
                <Col md={5} className="my-auto px-5 ">
                    <h1 className="home-intro-title mb-3">Introduction</h1>
                    <p className=" fs-4 ">
                        Our Restaurant Provide Full Service For Every Customers,
                        with 50 menus of foods and drinks, customers can order
                        it throught this website by logging in
                    </p>
                    <Button variant="primary" className="px-4 fs-4">
                        Login To Order
                    </Button>{" "}
                </Col>
                <Col md={7} className="home-heroes-container">
                    <Image className="img-fluid" src={heroes} />
                </Col>
            </Row>
        </Container>
    );
}

export default HomeIntro;
