import React from "react";
import { ListGroup } from "react-bootstrap";
import { Link, useRouteMatch } from "react-router-dom";
import { upperLink, toLink } from "../../../helper";

function DashboardLink({ to, icon }) {
    let match = useRouteMatch({
        path: to,
    });

    const upperCaseLink = upperLink(to);
    const link = toLink(to);

    return (
        <ListGroup.Item
            className={`border-0 bg-transparent side-list-item fs-4 p-3 ${
                match ? "active" : ""
            }`}
        >
            <i className={`icon-link fas fa-${icon} me-3 fa-fw `}></i>
            <Link to={link} className="side-link text-decoration-none  ">
                {upperCaseLink}
            </Link>
        </ListGroup.Item>
    );
}

export default DashboardLink;
