import React from "react";
import { ListGroup, Image, Container, Row } from "react-bootstrap";
import DashboardLink from "./DashboardLink";
import { v4 as uuidv4 } from "uuid";
import logo from "../../../../../public/images/logo-horizontal.png";

function DashboardSidebar() {
    const navLink = [
        {
            name: "foods",
            icon: "hamburger",
        },
        {
            name: "drinks",
            icon: "mug-hot",
        },
        {
            name: "cart",
            icon: "shopping-cart",
        },
        {
            name: "order",
            icon: "mug-hot",
        },
    ];

    return (
        <ListGroup className=" p-2">
            <ListGroup.Item className="p-0 py-5">
                <Container>
                    <Row className=" justify-content-center mb-5">
                        <Image className="img-fluid  mb-3" src={logo} />
                    </Row>
                    <Row>
                        {navLink.map((link) => (
                            <DashboardLink
                                key={uuidv4()}
                                icon={link.icon}
                                to={link.name}
                            />
                        ))}
                    </Row>
                </Container>
            </ListGroup.Item>
        </ListGroup>
    );
}

export default DashboardSidebar;
