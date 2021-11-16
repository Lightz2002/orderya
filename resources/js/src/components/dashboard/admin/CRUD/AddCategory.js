import React, { useState } from "react";
import { Container, Row, Form, Button } from "react-bootstrap";
import FormGroup from "./FormGroup";
import Swal from "sweetalert2";
import axios from "axios";
import BackButton from "./BackButton";

function AddCategory() {
    const categoryInput = [
        {
            id: "formBasicCategory",
            label: "Type",
            name: "type",
            type: "select",
            placeholder: "Enter Category Type",
            selectOptions: ["Foods", "Drinks"],
        },
        {
            id: "formBasicName",
            label: "Name",
            name: "name",
            type: "text",
            placeholder: "Enter Category Name",
        },
        {
            id: "formBasicQuantity",
            label: "Description",
            name: "description",
            type: "textarea",
            placeholder: "Enter Description",
        },
    ];

    const [category, setCategory] = useState({
        name: "",
        description: "",
        type: "",
    });

    const [errorList, setErrorList] = useState([]);

    const handleInput = (e) => {
        setCategory({ ...category, [e.target.name]: e.target.value });
    };

    const submitCategory = (e) => {
        e.preventDefault();

        const data = {
            name: category.name,
            description: category.description,
            type: category.type,
        };

        axios.post(`/api/addCategory`, data).then((res) => {
            if (res.data.status === 200) {
                Swal.fire("Added", res.data.message, "success");
                setCategory({
                    ...category,
                    name: "",
                    description: "",
                    type: "",
                });
                setErrorList("");
            } else if (res.data.status === 400) {
                setErrorList(res.data.errors);
            }
        });
    };

    return (
        <Container>
            <Row>
                <BackButton url="/category" />
                <h1 className="fs-1 fw-bold mb-3">Add Category</h1>

                <Container fluid>
                    <Row className="w-50">
                        <Form
                            method="post"
                            onSubmit={submitCategory}
                            className="fs-3"
                        >
                            {categoryInput.map((input) => (
                                <FormGroup
                                    key={input.id}
                                    id={input.id}
                                    label={input.label}
                                    name={input.name}
                                    type={input.type}
                                    placeholder={input.placeholder}
                                    handleChange={handleInput}
                                    value={category[input.name]}
                                    errors={errorList[input.name]}
                                    selectOptions={input.selectOptions || []}
                                />
                            ))}
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

export default AddCategory;
