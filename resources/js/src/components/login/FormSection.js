import React, { useState } from "react";
import FormGroup from "./FormGroup";
import FormLink from "./FormLink";
import { Container, Col, Button, Form } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router";

function FormSection({ type }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPasswordConfirmation] = useState("");
    const [errorList, setErrorList] = useState([]);

    const history = useHistory();

    const register = (e) => {
        e.preventDefault();

        const data = {
            username,
            email,
            password,
            password_confirmation,
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
            email,
            password,
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
                            <FormGroup
                                id="formBasicEmail"
                                type="email"
                                label="Email"
                                name="email"
                                value={email}
                                setType={setEmail}
                                errors={errorList.email}
                            />
                            <FormGroup
                                id="formBasicPassword"
                                type="password"
                                label="Password"
                                name="password"
                                value={password}
                                setType={setPassword}
                                errors={errorList.password}
                            />
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
                            <FormGroup
                                id="formBasicEmail"
                                type="email"
                                label="Email"
                                name="text"
                                value={email}
                                setType={setEmail}
                                errors={errorList.email}
                            />
                            <FormGroup
                                id="formBasicUsername"
                                type="text"
                                label="Username"
                                name="username"
                                value={username}
                                setType={setUsername}
                                errors={errorList.username}
                            />
                            <FormGroup
                                id="formBasicPassword"
                                type="password"
                                label="Password"
                                name="password"
                                value={password}
                                setType={setPassword}
                                errors={errorList.password}
                            />
                            <FormGroup
                                id="formBasicConfirmPassword"
                                type="password"
                                label="Confirm Password"
                                name="password_confirmation"
                                value={password_confirmation}
                                setType={setPasswordConfirmation}
                                errors={errorList.password_confirmation}
                            />
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
