import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Row, Button, Form } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import ReactLoading from "react-loading";
import Swal from "sweetalert2";
import FormGroup from "./FormGroup";
import BackButton from "./BackButton";

function UpdateCategory() {
    const history = useHistory();
    const [category, setCategory] = useState([]);
    const [errorList, setErrorList] = useState([]);
    const [loading, setLoading] = useState(true);
    let { id } = useParams();
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
            selectOptions: [],
        },
        {
            id: "formBasicQuantity",
            label: "Description",
            name: "description",
            type: "textarea",
            placeholder: "Enter Description",
            selectOptions: [],
        },
    ];

    useEffect(() => {
        axios.get(`/api/updateCategory/${id}`).then((res) => {
            if (res.data.status === 200) {
                setCategory(res.data.category);
            } else if (res.data.status === 404) {
                Swal.fire("Error", res.data.message, "error");
                history.push("/category");
            }
            setLoading(false);
        });

        return () => {
            setCategory([]);
        };
    }, []);

    const updateCategory = (e) => {
        e.preventDefault();

        const data = category;

        axios.put(`/api/updateCategory/${id}`, data).then((res) => {
            if (res.data.status === 200) {
                Swal.fire("Updated", res.data.message, "success");
                setErrorList("");
            } else if (res.data.status === 422) {
                Swal.fire(
                    "Failed",
                    "All required fields must be filled",
                    "error"
                );
                setErrorList(res.data.errors);
            } else if (res.data.status === 404) {
                Swal.fire("Error", res.data.message, "error");
                history.push("/category");
            }
        });
    };

    const handleInput = (e) => {
        setCategory({ ...category, [e.target.name]: e.target.value });
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
                <BackButton url="/category" />
                <h1 className="fs-1 fw-bold mb-3">Update Category</h1>

                <Container fluid>
                    <Row className="w-50">
                        <Form onSubmit={updateCategory} className="fs-3">
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
                                    selectOptions={input.selectOptions}
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

export default UpdateCategory;
