import React, { useState } from "react";
import { Container, Row, Form, Button } from "react-bootstrap";
import FormGroup from "../../../small-component/FormGroup";
import Swal from "sweetalert2";
import axios from "axios";
import BackButton from "../../../small-component/BackButton";

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
        {
            id: "formBasicImage",
            label: "Image",
            name: "image",
            type: "file",
            placeholder: "",
        },
    ];

    const [category, setCategory] = useState({
        name: "",
        description: "",
        type: "",
    });

    const [errorList, setErrorList] = useState([]);
    const [picture, setPicture] = useState([]);

    const handleInput = (e) => {
        setCategory({ ...category, [e.target.name]: e.target.value });
    };

    const handleImage = (e) => {
        setPicture({ image: e.target.files[0] });
    };

    const submitCategory = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("image", picture.image);
        formData.append("name", category.name);
        formData.append("description", category.description);
        formData.append("type", category.type);

        axios.post(`/api/addCategory`, formData).then((res) => {
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
                <BackButton text="View Category" url="/category" />
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
                                    handleChange={
                                        input.type === "file"
                                            ? handleImage
                                            : handleInput
                                    }
                                    value={category[input.name]}
                                    errors={errorList[input.name]}
                                    selectOptions={input.selectOptions || []}
                                    marginSize={4}
                                    fontSize={4}
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
