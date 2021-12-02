import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { upperLink, toLink } from "../../../helper";

function DashboardLink({ to, activeOnlyWhenExact, icon, isAdmin }) {
    const checkPath = (isAdmin) => {
        if (isAdmin) {
            if (to === "dashboard") {
                return ["/"];
            }
            return [`/${to}`, `/${to}/:slug`, `/${to}/:slug/:id`];
        } else {
            if (to === "dashboard") {
                return [
                    "/",
                    "/menu/:type/:category",
                    "/menu/:type/:category/:id",
                ];
            }
            return [`/${to}`, `/${to}/:slug`, `/${to}/:slug/:id`];
        }
    };

    let match = useRouteMatch({
        path: checkPath(isAdmin),
        exact: true,
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
