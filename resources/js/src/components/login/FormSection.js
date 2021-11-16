import React, { useState } from "react";
import FormGroup from "./FormGroup";
import FormLink from "./FormLink";
import { Container, Col, Button, Form } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router";

function FormSection({ type }) {
    const [errorList, setErrorList] = useState([]);

    const [input, setInput] = useState({
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const handleInput = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const history = useHistory();

    const loginInputs = [
        {
            id: "formBasicEmail",
            type: "email",
            label: "Email",
        },
        {
            id: "formBasicPassword",
            type: "password",
            label: "Password",
        },
    ];

    const registerInputs = [
        {
            id: "formBasicUsername",
            type: "text",
            label: "Username",
        },
        {
            id: "formBasicEmail",
            type: "email",
            label: "Email",
        },
        {
            id: "formBasicPassword",
            type: "password",
            label: "Password",
        },
        {
            id: "formBasicConfirmPassword",
            type: "password",
            label: "Confirm Password",
        },
    ];

    const register = (e) => {
        e.preventDefault();

        const data = {
            username: input.username,
            email: input.email,
            password: input.password,
            password_confirmation: input.password_confirmation,
        };

        axios.get("/sanctum/csrf-cookie").then((response) => {
            axios.post("/api/register", data).then((res) => {
                if (res.data.status === 200) {
                    localStorage.setItem("auth_token", res.data.token);
                    localStorage.setItem("auth_name", res.data.username);
                    Swal.fire("Success", res.data.message, "success");

                    history.push("/dashboard");
                } else {
                    setErrorList(res.data.validation_errors);
                }
            });
        });
    };

    const login = (e) => {
        e.preventDefault();

        const data = {
            email: input.email,
            password: input.password,
        };

        axios.get("/sanctum/csrf-cookie").then((response) => {
            axios.post("/api/login", data).then((res) => {
                if (res.data.status === 200) {
                    localStorage.setItem("auth_token", res.data.token);
                    localStorage.setItem("auth_name", res.data.username);

                    Swal.fire("Success", res.data.message, "success");
                    history.push("/dashboard");
                } else if (res.data.status === 401) {
                    Swal.fire("Warning", res.data.message, "warning");
                } else {
                    setErrorList(res.data.validation_errors);
                }
            });
        });
    };

    return (
        <Col className="login-col-2 shadow bg-light p-5">
            <Container className=" mt-4 ">
                <h1 className="fs-1 fw-bold text-primary mb-5">{type}</h1>
                {type === "Login" ? (
                    <>
                        <Form method="post" onSubmit={login}>
                            {loginInputs.map((loginInput) => (
                                <FormGroup
                                    key={loginInput.id}
                                    id={loginInput.id}
                                    type={loginInput.type}
                                    label={loginInput.label}
                                    handleChange={handleInput}
                                    errors={
                                        errorList[
                                            loginInput.label.toLowerCase()
                                        ]
                                    }
                                    value={
                                        input[loginInput.label.toLowerCase()]
                                    }
                                />
                            ))}

                            <Button
                                variant="primary"
                                type="submit"
                                className="w-100 mb-3 fs-4 p-3"
                            >
                                Login
                            </Button>
                        </Form>

                        <Container className="d-flex mt-5 text-center justify-content-center align-items-center">
                            <span className="d-inline-block fs-5 me-3">
                                Don't Have an Account?
                            </span>

                            <FormLink to="/register" label="Create One" />
                        </Container>
                    </>
                ) : (
                    <>
                        <Form method="post" onSubmit={register}>
                            {registerInputs.map((registerInput) => (
                                <FormGroup
                                    key={registerInput.id}
                                    id={registerInput.id}
                                    type={registerInput.type}
                                    label={registerInput.label}
                                    handleChange={handleInput}
                                    errors={
                                        errorList[
                                            registerInput.label ===
                                            "Confirm Password"
                                                ? "password_confirmation"
                                                : registerInput.label.toLowerCase()
                                        ]
                                    }
                                    value={
                                        input[registerInput.label.toLowerCase()]
                                    }
                                />
                            ))}
                            <Button
                                variant="primary"
                                type="submit"
                                className="w-100 mb-3 fs-4 p-3"
                                onClick={register}
                            >
                                Register
                            </Button>
                        </Form>

                        <Container className="d-flex mt-5 text-center justify-content-center align-items-center">
                            <span className="d-inline-block fs-5 me-3">
                                Already Have an Account?
                            </span>

                            <FormLink to="/login" label="Login" />
                        </Container>
                    </>
                )}
            </Container>
        </Col>
    );
}

export default FormSection;
