import React from "react";
import { Image } from "react-bootstrap";

import construction from "../../../../../public/images/under construction.jpg";

function DashboardLinkContent() {
    return (
        <Image
            className="mx-auto"
            width="600"
            height="450"
            src={construction}
        />
    );
}

export default DashboardLinkContent;
