import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function BackButton({ text, url }) {
    return (
        <Link to={url} className="text-decoration-none d-block mb-5 btn-back">
            <Button
                className="d-flex justify-content-evenly align-items-baseline fs-4 p-3 w-100"
                variant="outline-dark"
            >
                <i className="fas fa-arrow-left"></i>
                {text}
            </Button>
        </Link>
    );
}

export default BackButton;
