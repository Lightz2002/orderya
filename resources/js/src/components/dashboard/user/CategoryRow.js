import React from "react";
import { Row, Col } from "react-bootstrap";
import CategoryCard from "./CategoryCard";

function CategoryRow({ categories, title }) {
    let textColor = title === "Foods" ? "primary" : "info";

    let row = "";
    if (categories.length > 0) {
        row = categories.map((category, i) => {
            return (
                <Col key={i}>
                    <CategoryCard
                        name={category.name}
                        image={category.image}
                        text={category.description}
                        type={category.type}
                    />
                </Col>
            );
        });
    } else {
        row = (
            <h2 className="text-center mt-4 text-secondary">
                There are no categories with this type
            </h2>
        );
    }

    return (
        <Row className="mt-5 d-flex">
            <h2
                className={`mb-4  px-5 py-3 d-inline fw-bolder rounded-pill bg-${textColor} bg-opacity-10 text-center text-${textColor}`}
            >
                {title}
            </h2>
            {row}
        </Row>
    );
}

export default CategoryRow;
