import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import logo from "../../../../../public/images/restaurant.png";
function Welcome() {
    return (
        <Col className=" login-col-1 shadow bg-primary d-none d-lg-block  p-5">
            <Container className="d-flex align-items-center h-100">
                <Row>
                    <h1 className="text-light text-center welcome-title">
                        Welcome!
                    </h1>
                </Row>
                <Row>
                    <img src={logo} className="img-fluid " />
                </Row>
            </Container>
        </Col>
    );
}

export default Welcome;
