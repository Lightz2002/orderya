import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link, useRouteMatch } from "react-router-dom";

function DashboardAdminHeader({ title, button = true }) {
    let { url } = useRouteMatch();

    return (
        <Container fluid className="dashboard-header p-0">
            <Row>
                <Col>
                    <h1 className="fw-bold">{title}</h1>
                </Col>
                {button && (
                    <Col>
                        <Link
                            to={`${url}/add`}
                            className="ms-auto d-block w-25 text-decoration-none"
                        >
                            <Button
                                variant="success text-light"
                                className="w-100 fs-4 p-3  d-flex justify-content-evenly align-items-baseline"
                                size="lg"
                            >
                                <i className="fas fa-plus"></i>
                                Create
                            </Button>
                        </Link>
                    </Col>
                )}
            </Row>
        </Container>
    );
}

export default DashboardAdminHeader;
