import React from "react";
import { Card } from "react-bootstrap";
import { Link, useRouteMatch } from "react-router-dom";
import { API_URL } from "../../../../config";

function CategoryCard({ name, text, image, type }) {
    let { path, url } = useRouteMatch();

    return (
        <Link to={`${path}menu/${type.toLowerCase()}/${name.toLowerCase()}`}>
            <Card className="category-card shadow-lg text-white">
                <Card.Img
                    src={`${API_URL}/${image}`}
                    alt="Card image"
                    height="150"
                    width="200"
                />
                <Card.ImgOverlay className="d-flex justify-content-center align-items-center">
                    <Card.Title className="fs-3 align-middle text-center">
                        {name}
                    </Card.Title>
                </Card.ImgOverlay>
            </Card>
        </Link>
    );
}

export default CategoryCard;
