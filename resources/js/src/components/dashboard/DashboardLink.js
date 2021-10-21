import React from "react";
import { ListGroup } from "react-bootstrap";
import { Link, useRouteMatch } from "react-router-dom";

function DashboardLink({ to, icon }) {
    let match = useRouteMatch({
        path: to,
    });

    const upperLink = to[0].toUpperCase().concat(to.slice(1));
    const link = "/" + to;

    return (
        <ListGroup.Item
            className={`side-list-item fs-4 p-3 ${match ? "active" : ""}`}
        >
            <i className={`icon-link fas fa-${icon} me-3`}></i>
            <Link to={link} className="side-link text-decoration-none  ">
                {upperLink}
            </Link>
        </ListGroup.Item>
    );
}

export default DashboardLink;
