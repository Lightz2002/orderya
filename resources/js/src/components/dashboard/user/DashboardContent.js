import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import axios from "axios";
import ReactLoading from "react-loading";

import CategoryJumbotron from "./CategoryJumbotron";
import Category from "./Category";

function DashboardContent() {
    const [foodCategoryList, setFoodCategoryList] = useState([]);
    const [drinkCategoryList, setDrinkCategoryList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const handleChange = (e) => {
        setSearch(e.target.value);
        console.log(
            foodCategoryList.filter((item) => item.name.indexOf(search) >= 0)
        );
    };

    const handleSearch = (e) => {
        e.preventDefault();
    };

    useEffect(() => {
        axios.get("/api/viewCategory").then((res) => {
            if (res.status === 200) {
                const foodCategories = res.data.category.filter(
                    (category) => category.type === "Foods"
                );
                const drinkCategories = res.data.category.filter(
                    (category) => category.type === "Drinks"
                );

                setDrinkCategoryList(drinkCategories);
                setFoodCategoryList(foodCategories);
            }

            setLoading(false);
        });

        return () => {
            setLoading(false);
        };
    }, []);

    if (loading) {
        return (
            <Container className="mt-5 d-flex align-content-center align-items-center justify-content-center">
                <ReactLoading
                    type="spin"
                    color="blue"
                    height={200}
                    width={200}
                />
            </Container>
        );
    }

    return (
        <Container className="category-container mt-5 pb-5">
            <Row>
                <CategoryJumbotron
                    handleChange={handleChange}
                    handleSubmit={handleSearch}
                    search={search}
                />
                <Category
                    search={search}
                    categories={[foodCategoryList, drinkCategoryList]}
                />
            </Row>
        </Container>
    );
}

export default DashboardContent;
