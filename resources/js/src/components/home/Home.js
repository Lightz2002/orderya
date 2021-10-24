import React from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import HomeNavbar from "./HomeNavbar";
import HomeIntro from "./HomeIntro";
import HomeAbout from "./HomeAbout";
import HomeTeams from "./HomeTeams";

/* 
Author: Nicholas & jensen
*/

function Home() {
    return (
        <Container fluid>
            <Row className="mb-3">
                <HomeNavbar />
            </Row>
            <Row className="min-vh-80 px-5">
                <HomeIntro />
            </Row>
            <Row className="w-75 mx-auto d-flex  align-items-center px-5">
                <HomeAbout />
            </Row>
            <Row className="d-flex align-items-center min-vh-100">
                <HomeTeams />
            </Row>
        </Container>
    );
}

export default Home;
