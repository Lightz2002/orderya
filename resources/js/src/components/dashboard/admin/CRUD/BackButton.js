import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function BackButton({ url }) {
    let trimmedUrl = url.replace("/", "");
    let capitalUrl = trimmedUrl[0].toUpperCase() + trimmedUrl.slice(1);
    //
    return (
        <Link to={url} className="text-decoration-none  mb-5 btn-back">
            <Button
                className="d-flex justify-content-evenly align-items-baseline fs-4 p-3 w-100"
                variant="outline-dark"
            >
                <i className="fas fa-arrow-left"></i>
                View {capitalUrl}
            </Button>
        </Link>
    );
}

export default BackButton;
