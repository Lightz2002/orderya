import React from "react";
import { Container, Navbar, Nav, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import HomeLink from "./HomeLink";
import logo from "../../../../../public/images/logo-horizontal-light.png";
import { v4 as uuidv4 } from "uuid";

function HomeNavbar() {
    const navLinks = ["home", "about", "teams"];

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
                    <Button className="fs-3  w-25" size="lg">
                        <Link
                            to="/login"
                            className="text-decoration-none d-flex align-items-center justify-content-evenly text-light"
                        >
                            <i className="fs-2 fas fa-user-circle"></i>
                            Login
                        </Link>
                    </Button>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default HomeNavbar;
