import React, { useState, useEffect } from "react";
import { Container, Row, Form, Button, Tabs, Tab } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import ReactLoading from "react-loading";
import Swal from "sweetalert2";

import FormTabContent from "./FormTabContent";
import BackButton from "../../../small-component/BackButton";

function UpdateDrink() {
    const history = useHistory();
    let { id } = useParams();

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

    const [drink, setDrink] = useState([]);
    const [errorList, setErrorList] = useState([]);
    const [picture, setPicture] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [key, setKey] = useState("main");

    useEffect(() => {
        axios.get(`/api/viewCategory/Drinks`).then((res) => {
            if (res.status === 200) {
                setCategoryList(res.data.category);
            }
        });

        axios.get(`/api/updateDrink/${id}`).then((res) => {
            if (res.data.status === 200) {
                for (let prop in res.data.drink) {
                    if (res.data.drink[prop] === "null") {
                        res.data.drink[prop] = "";
                    }
                }
                setDrink(res.data.drink);
                setPicture({ image: res.data.drink.image });
            } else if (res.data.status === 404) {
                Swal.fire("Oops", res.data.message, "error");
                history.push("/drinks");
            }
            setLoading(false);
        });

        return () => {
            setCategoryList([]);
        };
    }, []);

    const updateDrink = (e) => {
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

        axios.post(`/api/updateDrink/${id}`, formData).then((res) => {
            if (res.data.status === 200) {
                Swal.fire("Updated", res.data.message, "success");
                setErrorList([]);
            } else if (res.data.status === 422) {
                Swal.fire(
                    "Failed",
                    "Please fill in all the required fields",
                    "error"
                );
                setErrorList(res.data.errors);
            } else if (res.data.status === 404) {
                Swal.fire("Oops", res.data.message, "error");
                history.push("/drinks");
            }
        });
    };

    const handleInput = (e) => [
        setDrink({
            ...drink,
            [e.target.name]: e.target.value,
        }),
    ];

    const handleImage = (e) => {
        setPicture({ image: e.target.files[0] });
    };

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
        <Container>
            <Row>
                <BackButton text="View Drinks" url="/drinks" />
                <h1 className="fs-1 fw-bold mb-3">Update Drink</h1>

                <Container fluid>
                    <Row className="w-50 pb-4">
                        <Form
                            onSubmit={updateDrink}
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

export default UpdateDrink;
