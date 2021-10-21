import React from "react";
import { Container, Navbar, Nav, Dropdown, Form } from "react-bootstrap";

function DashboardNavbar() {
    return (
        <Navbar bg="light" variant="light" className=" p-0 mb-5">
            <Container className="p-0">
                <Nav className="w-100 d-flex align-items-center justify-content-end">
                    <Form className="align-self-center p-0 rounded-0">
                        <Form.Group controlId="formBasicSearch ">
                            <Form.Control
                                type="text"
                                placeholder="Search for something"
                                className="rounded-0 p-4 fs-4"
                            />
                        </Form.Group>
                    </Form>
                    <Dropdown>
                        <Dropdown.Toggle
                            id="dropdown-basic"
                            className="p-4 px-5 w-100 fs-4 rounded-0 d-flex justify-content-between align-items-center"
                        >
                            <i className="fs-1 me-3 fas fa-user-circle text-light"></i>
                            <span className="me-3">Ryan</span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="w-100 fs-4">
                            <Dropdown.Item className=" py-3" href="#/action-1">
                                Action
                            </Dropdown.Item>
                            <Dropdown.Item className="py-3" href="#/action-2">
                                Another action
                            </Dropdown.Item>
                            <Dropdown.Item
                                className="d-flex align-items-center py-3  text-primary"
                                href="#/action-3"
                            >
                                <i class="fas fa-sign-out-alt me-3 text-primary"></i>
                                Logout
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default DashboardNavbar;
