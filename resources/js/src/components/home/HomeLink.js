import React from "react";
import { Nav } from "react-bootstrap";

import { upperLink, toLink } from "../../../helper";

function HomeLink({ to }) {
    const upperCaseLink = upperLink(to);

    return (
        <Nav.Link href={`#${to}`} className="fs-3 text-light">
            {upperCaseLink}
        </Nav.Link>
    );
}

export default HomeLink;
