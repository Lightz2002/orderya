import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { upperLink, toLink } from "../../../helper";

function DashboardLink({ to, activeOnlyWhenExact, icon }) {
    const checkPath = () => {
        if (to === "dashboard") {
            return "/";
        }

        return "/" + to;
    };

    let match = useRouteMatch({
        path: checkPath(),
        exact: activeOnlyWhenExact,
    });

    const upperCaseLink = upperLink(to);
    const link = toLink(to);

    return (
        <Link
            className={`fs-3  link text-decoration-none  d-flex align-items-baseline side-list-item ${
                match ? "active" : ""
            }`}
            to={link}
        >
            <i className={`icon-link  fas fa-${icon} me-4 fs-3 fa-fw `}></i>

            {upperCaseLink}
        </Link>
    );
}

export default DashboardLink;
