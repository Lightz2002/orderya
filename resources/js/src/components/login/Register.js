import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import Welcome from "./Welcome";
import FormSection from "./FormSection";

function Register() {
    return (
        <Container className="min-vh-100">
            <Row className="p-5 login-container align-content-stretch">
                <FormSection type="Register" />

                <Welcome />
            </Row>
        </Container>
    );
}

export default Register;
