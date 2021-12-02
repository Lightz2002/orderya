import React, { useState } from "react";
import { Card } from "react-bootstrap";
import SearchBar from "../../small-component/SearchBar";
import Hero from "../../../../../../public/images/category-hero.jpg";

function CategoryJumbotron({ search, handleSubmit, handleChange }) {
    return (
        <Card className="shadow rounded p-0">
            <Card.Header className="p-relative p-0">
                <Card.Img variant="top" src={Hero} width="400" height="300" />
                <Card.Title className="h1 fw-bolder jumbotron-card-title">
                    Find Your Desired Foods
                    <br />
                    <span className="text-primary">Based On Category</span>
                </Card.Title>
            </Card.Header>
            <Card.Body className="p-5">
                <SearchBar
                    value={search}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                />
            </Card.Body>
        </Card>
    );
}

export default CategoryJumbotron;
