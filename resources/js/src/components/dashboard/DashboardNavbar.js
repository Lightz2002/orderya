import React from "react";
import { Container, Navbar, Nav, Dropdown, Form } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router";

function DashboardNavbar() {
    const history = useHistory();

    const handleLogout = (e) => {
        e.preventDefault();

        axios.post(`/api/logout`).then((res) => {
            if (res.data.status === 200) {
                localStorage.removeItem("auth_token");
                localStorage.removeItem("auth_name");
                localStorage.removeItem("authorized");
                Swal.fire("Success", res.data.message, "success").then(() => {
                    setTimeout(() => {
                        window.location.reload(false);
                    }, 1000);
                });
                history.push("/");
            }
        });
    };

    return (
        <Navbar bg="light" variant="light" className=" p-0 mb-5">
            <Container className="p-0 ">
                <Nav className="w-100 d-flex align-items-center justify-content-end">
                    <Dropdown>
                        <Dropdown.Toggle
                            id="dropdown-basic"
                            className="p-4 px-5 w-100 fs-4 rounded-0 d-flex justify-content-between align-items-center"
                        >
                            <i className="fs-1 me-3 fas fa-user-circle text-light"></i>
                            <span className="me-3">
                                {localStorage.getItem("auth_name")}
                            </span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="w-100 fs-4">
                            <Dropdown.Item
                                className="d-flex justify-content-center align-items-center py-3  text-primary"
                                onClick={handleLogout}
                            >
                                <i className="fas fa-sign-out-alt me-3 text-primary"></i>
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
