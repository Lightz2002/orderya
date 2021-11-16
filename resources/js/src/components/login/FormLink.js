import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

function FormLink({ label, to }) {
    let match = useRouteMatch({
        path: to,
    });

    return (
        <div className={`link-primary fs-5 ${match ? "active" : ""}`}>
            <Link to={to} className="link">
                {label}
            </Link>
        </div>
    );
}

export default FormLink;
