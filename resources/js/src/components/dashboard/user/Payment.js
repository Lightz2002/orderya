import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import ReactLoading from "react-loading";
import Swal from "sweetalert2";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import { ProductContext } from "../context/ProductContext";
import FormGroup from "../../small-component/FormGroup";

function Payment() {
    const { cartList, setCartList } = useContext(ProductContext);
    const [loading, setLoading] = useState(true);
    let history = useHistory();

    useEffect(() => {
        axios.get("/api/viewCartItems").then((res) => {
            if (res.data.status === 200) {
                setCartList(res.data.cartItems);
            } else if (res.data.status === 404) {
                Swal.fire("Error", "You have nothing in cart", "error");
                history.push("/cart");
            }
            setLoading(false);
        });

        setLoading(false);

        return () => {
            setLoading(false);
        };
    }, []);

    const orderInputs = [
        {
            id: "1",
            label: "Bank Name",
            name: "bank_name",
            type: "text",
            placeholder: "BCA",
        },
        {
            id: "2",
            label: "Account Name",
            name: "account_name",
            type: "text",
            placeholder: "Bambang",
        },
        {
            id: "3",
            label: "Account Number",
            name: "account_number",
            type: "number",
            placeholder: "1231231231",
        },
        {
            id: "4",
            label: "Payment Date",
            name: "transaction_date",
            type: "date",
            placeholder: "",
        },
        {
            id: "5",
            label: "Payment Receipt",
            name: "transaction_receipt",
            type: "file",
            placeholder: "",
        },
        {
            id: "6",
            label: "Phone Number",
            name: "phone_number",
            type: "number",
            placeholder: "081278114121",
        },
        {
            id: "7",
            label: "City",
            name: "city",
            type: "text",
            placeholder: "Tanjungpinang",
        },
        {
            id: "8",
            label: "Zipcode",
            name: "zipcode",
            type: "number",
            placeholder: "29113",
        },
        {
            id: "9",
            label: "Address",
            name: "address",
            type: "textarea",
            placeholder: "Jl. terong no.13 RW 01 / RT 03",
        },
        {
            id: "10",
            label: "Note For Order",
            name: "note_for_order",
            type: "textarea",
            placeholder: "Add more sauce for the pizza",
        },
    ];

    const [order, setOrder] = useState({
        bank_name: "",
        account_name: "",
        account_number: "",
        address: "",
        zipcode: "",
        city: "",
        transaction_date: "",
        phone_number: "",
        note_for_order: "",
    });

    const [image, setImage] = useState([]);
    const [errorList, setErrorList] = useState([]);

    const submitPayment = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("transaction_receipt", image.image);
        formData.append("bank_name", order.bank_name);
        formData.append("account_name", order.account_name);
        formData.append("account_number", order.account_number);
        formData.append("transaction_date", order.transaction_date);
        formData.append("phone_number", order.phone_number);
        formData.append("city", order.city);
        formData.append("address", order.address);
        formData.append("zipcode", order.zipcode);
        formData.append("note_for_order", order.note_for_order);

        axios.post(`/api/placeOrder`, formData).then((res) => {
            if (res.data.status === 200) {
                Swal.fire(
                    "Success",
                    "Your payment has been added successfully,",
                    "success"
                );
                setCartList([]);
                history.push("/cart");
            } else if (res.data.status === 422) {
                Swal.fire("Failed", "Fill in all the required fields", "error");
                setErrorList(res.data.errors);
            }
        });
    };

    const handleChange = (e) => {
        setOrder({ ...order, [e.target.name]: e.target.value });
    };

    const handleImage = (e) => {
        setImage({ image: e.target.files[0] });
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
        <Container className="bg-white rounded-3 p-5 w-75 d-flex flex-column">
            <h1 className="fw-bolder mb-5">Input Payment Details</h1>
            <Row>
                {orderInputs.map((input) => {
                    return (
                        <Col key={input.id} xs={12} lg={6}>
                            <Form onSubmit={submitPayment}>
                                <FormGroup
                                    id={input.id}
                                    name={input.name}
                                    label={input.label}
                                    type={input.type}
                                    placeholder={input.placeholder}
                                    handleChange={
                                        input.type === "file"
                                            ? handleImage
                                            : handleChange
                                    }
                                    value={order[input.name]}
                                    marginSize="4"
                                    errors={errorList[input.name]}
                                />
                            </Form>
                        </Col>
                    );
                })}
            </Row>
            <Button
                variant="success"
                className="w-25 p-2 fs-4 text-white ms-auto"
                onClick={submitPayment}
            >
                Checkout
            </Button>
        </Container>
    );
}

export default Payment;
