import React from "react";
import LoginSection from "./LoginSection";

import { Container, Row } from "react-bootstrap";

function Login() {
    return (
        <Container className="min-vh-100">
            <Row className="p-5 login-container align-content-stretch">
                <LoginSection />
            </Row>
        </Container>
    );
}

export default Login;
