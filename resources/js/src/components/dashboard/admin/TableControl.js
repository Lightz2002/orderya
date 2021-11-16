import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function TableControl({ updateUrl, handleDelete, id }) {
    return (
        <td className="align-middle p-4">
            <Link
                to={updateUrl}
                className="table-control d-inline-block me-5 text-decoration-none"
            >
                <Button
                    variant="info text-light"
                    className="w-100  fs-4 d-flex justify-content-evenly align-items-baseline"
                >
                    <i className="fas fa-pen"></i>
                    Update
                </Button>
            </Link>

            <Button
                variant="danger text-light"
                className="table-control fs-4 d-inline-flex justify-content-evenly align-items-baseline"
                size="lg"
                onClick={(e) => handleDelete(e, id)}
            >
                <i className="fas fa-trash"></i>
                Delete
            </Button>
        </td>
    );
}

export default TableControl;
