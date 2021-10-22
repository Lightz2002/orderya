import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import jensen from "../../../../../public/images/teams/Jensen.jpeg";
import vinson from "../../../../../public/images/teams/Vinson.jpeg";
import ricky from "../../../../../public/images/teams/Ricky.jpeg";
import ryan from "../../../../../public/images/teams/ryan.jpeg";
import nicholas from "../../../../../public/images/teams/nicholas.jpeg";

import TeamsItem from "./TeamsItem";
function HomeTeams() {
    const teams = [
        {
            src: jensen,
            title: "Jensen Tanedy-20",
            text: "Jensen helps Vinson With the Cooking",
        },
        {
            src: ricky,
            title: "Ricky",
            text: "Ricky is the one who take care of customer service",
        },
        {
            src: nicholas,
            title: "Nicholas Jeonanto",
            text: "Nicholas manage the restaurant",
        },
        {
            src: vinson,
            title: "Vinson",
            text: "Vinson make sure customer have deliceous foods to eat",
        },
        {
            src: ryan,
            title: "Ryan Kenidy",
            text: "Ryan plays an important role in serving beverages",
        },
    ];
    return (
        <Container id="teams" className="mt-5">
            <h1 className="border-bottom border-5 border-primary home-about-title mx-auto mb-5">
                Teams
            </h1>
            <Row className="justify-content-center">
                {teams.map((team) => (
                    <Col xs={7} lg={2}>
                        <TeamsItem
                            key={uuidv4()}
                            src={team.src}
                            title={team.title}
                            text={team.text}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default HomeTeams;
