import React from "react";
import { Container, Navbar, Nav, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import HomeLink from "./HomeLink";
import logo from "../../../../../public/images/logo-horizontal-light.png";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import Swal from "sweetalert2";

function HomeNavbar() {
    const navLinks = ["home", "about", "teams"];

    const handleLogout = (e) => {
        e.preventDefault();

        axios.post(`/api/logout`).then((res) => {
            if (res.data.status === 200) {
                localStorage.removeItem("auth_token");
                localStorage.removeItem("auth_name");
                Swal.fire("Success", res.data.message, "success").then(() => {
                    window.location.reload();
                });
            }
        });
    };
    let userButtons = "";

    if (!localStorage.getItem("auth_token")) {
        userButtons = (
            <Button className="fs-3 login-button" size="lg">
                <Link
                    to="/login"
                    className="text-decoration-none d-flex align-items-center justify-content-evenly text-light"
                >
                    <i className="fs-2 fas fa-user-circle"></i>
                    Login
                </Link>
            </Button>
        );
    } else {
        userButtons = (
            <Button
                onClick={handleLogout}
                className="fs-3 logout-button"
                size="lg"
            >
                <i className="fas fa-sign-out-alt me-3 text-light"></i>
                Logout
            </Button>
        );
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand className=" w-25">
                    <Image className="img-fluid" src={logo} />
                </Navbar.Brand>
                <Nav className="home-navbar p-3 d-flex align-items-center justify-content-evenly ms-auto ">
                    {navLinks.map((link) => (
                        <HomeLink key={uuidv4()} to={link} />
                    ))}
                </Nav>
                {userButtons}
            </Container>
        </Navbar>
    );
}

export default HomeNavbar;
