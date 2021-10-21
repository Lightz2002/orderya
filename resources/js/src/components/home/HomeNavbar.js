import React from "react";
import { Container, Navbar, Nav, Dropdown, Form } from "react-bootstrap";

function HomeNavbar() {
    return (
        <Navbar bg="light" variant="light" className="p-0 mb-5">
            <Container fluid className="p-0">
                <Nav className="ms-auto w-100 d-flex align-items-center justify-content-end">
                    <Dropdown>
                        <Dropdown.Toggle
                            id="dropdown-basic"
                            className="p-3 fs-4  rounded-0 d-flex justify-content-between align-items-center"
                        >
                            <span className="me-3">Ryan</span>
                            <i className="fs-1 fas fa-user-circle text-light"></i>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className=" fs-4">
                            <Dropdown.Item className="py-3" href="#/action-1">
                                Action
                            </Dropdown.Item>
                            <Dropdown.Item className="py-3" href="#/action-2">
                                Another action
                            </Dropdown.Item>
                            <Dropdown.Item className="py-3" href="#/action-3">
                                Something else
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default HomeNavbar;
