import React, { useState, useEffect } from "react";
import { ListGroup, Image, Container, Row } from "react-bootstrap";

import { v4 as uuidv4 } from "uuid";
import DashboardLink from "./DashboardLink";
import logo from "../../../../../public/images/logo-horizontal.png";

function DashboardSidebar({ isAdmin }) {
    const userLink = [
        {
            name: "dashboard",
            icon: "tachometer-alt",
        },
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
            icon: "user-clock",
        },
    ];

    const adminLink = [
        {
            name: "dashboard",
            icon: "tachometer-alt",
        },
        {
            name: "category",
            icon: "cubes",
        },
        {
            name: "foods",
            icon: "hamburger",
        },
        {
            name: "drinks",
            icon: "mug-hot",
        },
        {
            name: "order",
            icon: "user-clock",
        },
    ];

    const navLink = isAdmin ? adminLink : userLink;

    return (
        <ListGroup className="bg-white  p-2">
            <ListGroup.Item className="border-0 bg-transparent p-0 py-5">
                <Container className="bg-transparent border-0 p-0">
                    <Row className=" justify-content-center mb-5">
                        <Image className="w-50 mb-3" src={logo} />
                    </Row>
                    <Row>
                        {navLink.map((link) => (
                            <DashboardLink
                                key={uuidv4()}
                                icon={link.icon}
                                to={link.name}
                                isAdmin={isAdmin}
                            />
                        ))}
                    </Row>
                </Container>
            </ListGroup.Item>
        </ListGroup>
    );
}

export default DashboardSidebar;
