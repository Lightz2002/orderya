import React from "react";
import { Container } from "react-bootstrap";
import CategoryRow from "./CategoryRow";

function Category({ search, categories }) {
    let filteredFoods = categories[0].filter(
        (item) => item.name.toLowerCase().indexOf(search.toLowerCase()) >= 0
    );
    let filteredDrinks = categories[1].filter(
        (item) => item.name.toLowerCase().indexOf(search.toLowerCase()) >= 0
    );

    return (
        <Container>
            <CategoryRow title="Foods" categories={filteredFoods} />
            <CategoryRow title="Drinks" categories={filteredDrinks} />
        </Container>
    );
}

export default Category;
