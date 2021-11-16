import React, { useState, useEffect } from "react";
import { Container, Row, Form, Button, Tabs, Tab } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";

import BackButton from "./BackButton";
import FormTabContent from "./FormTabContent";

function AddDrink() {
    const mainInput = [
        {
            id: "formBasicCategory",
            label: "Category",
            name: "category_id",
            type: "select",
            placeholder: "Enter Category",
        },
        {
            id: "formBasicName",
            label: "Name",
            name: "name",
            type: "text",
            placeholder: "Enter Name",
        },
        {
            id: "formBasicQuantity",
            label: "Quantity",
            name: "quantity",
            type: "number",
            placeholder: "Enter Amount",
        },
        {
            id: "formBasicPrice",
            label: "Price",
            name: "price",
            type: "number",
            placeholder: "Enter Price",
        },
        {
            id: "formBasicServingTime",
            label: "Serving Time",
            name: "serving_time",
            type: "text",
            placeholder: "Enter Serving Time",
        },
        {
            id: "formBasicImage",
            label: "Image",
            name: "image",
            type: "file",
            placeholder: "Enter Image",
        },
    ];

    const recipeInput = [
        {
            id: "formBasicIngredient",
            label: "Ingredient",
            name: "ingredient",
            type: "textarea",
            placeholder: "Enter Ingredient",
        },
        {
            id: "formBasicRecipe",
            label: "Recipe",
            name: "recipe",
            type: "textarea",
            placeholder: "Enter Recipe",
        },
        {
            id: "formBasicDescription",
            label: "Description",
            name: "description",
            type: "textarea",
            placeholder: "Enter Description",
        },
    ];

    const tabs = [
        {
            id: "1",
            eventKey: "main",
            title: "Main",
        },
        {
            id: "2",
            eventKey: "recipe",
            title: "Recipe",
        },
    ];

    const [drink, setDrink] = useState({
        category_id: "",
        name: "",
        quantity: 0,
        price: 0,
        serving_time: "",
        description: "",
        recipe: "",
        ingredient: "",
    });

    const [categoryList, setCategoryList] = useState([]);
    const [errorList, setErrorList] = useState([]);
    const [picture, setPicture] = useState([]);
    const [key, setKey] = useState("main");

    useEffect(() => {
        axios.get(`/api/viewCategory/Drinks`).then((res) => {
            if (res.status === 200) {
                setCategoryList(res.data.category);
            }
        });
    }, []);

    const submitDrink = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("image", picture.image);
        formData.append("category_id", drink.category_id);
        formData.append("name", drink.name);
        formData.append("quantity", drink.quantity);
        formData.append("price", drink.price);
        formData.append("description", drink.description);
        formData.append("recipe", drink.recipe);
        formData.append("ingredient", drink.ingredient);
        formData.append("serving_time", drink.serving_time);

        axios.post("/api/addDrink", formData).then((res) => {
            if (res.data.status === 200) {
                Swal.fire("Added", res.data.message, "success");
                setErrorList([]);
                setDrink({
                    ...drink,
                    category_id: "",
                    name: "",
                    quantity: 0,
                    price: 0,
                    serving_time: "",
                    description: "",
                    ingredient: "",
                    recipe: "",
                });
                setPicture({ ...picture, image: "" });
            } else if (res.data.status === 422) {
                Swal.fire("Failed", "Fill in all the required fields", "error");
                setErrorList(res.data.errors);
            }
        });
    };

    const handleInput = (e) => {
        if (e.target.name === "price") {
            let isNumRegex = /[^0-9]/g;
            if (isNumRegex.test(e.target.value)) {
                e.preventDefault();
            }
        }
        setDrink({ ...drink, [e.target.name]: e.target.value });
    };

    const handleImage = (e) => {
        setPicture({ image: e.target.files[0] });
    };

    return (
        <Container>
            <Row>
                <BackButton url="/drinks" />
                <h1 className="fs-1 fw-bold mb-3">Add Drink</h1>
                <Container fluid>
                    <Row className="w-50 pb-4">
                        <Form
                            onSubmit={submitDrink}
                            encType="multipart/form-data"
                            className="fs-3"
                        >
                            <Tabs
                                id="controlled-tab-example"
                                activeKey={key}
                                onSelect={(k) => setKey(k)}
                                className="mt-3 mb-3 fs-3"
                            >
                                {tabs.map((tab) => (
                                    <Tab
                                        key={tab.id}
                                        eventKey={tab.eventKey}
                                        title={tab.title}
                                        className="fs-3 bg-light text-black"
                                    >
                                        <FormTabContent
                                            component={
                                                tab.eventKey === "main"
                                                    ? mainInput
                                                    : recipeInput
                                            }
                                            state={drink}
                                            secondState={picture}
                                            errors={errorList}
                                            handleInput={handleInput}
                                            handleImage={handleImage}
                                            selectOptions={categoryList}
                                        />
                                    </Tab>
                                ))}
                            </Tabs>

                            <Button
                                className="mt-3 fs-3 w-25 text-light"
                                variant="success"
                                size="lg"
                                type="submit"
                            >
                                Submit
                            </Button>
                        </Form>
                    </Row>
                </Container>
            </Row>
        </Container>
    );
}

export default AddDrink;
