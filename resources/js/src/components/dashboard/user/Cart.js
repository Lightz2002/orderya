import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useRouteMatch, useHistory, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import ReactLoading from "react-loading";

import { ProductContext } from "../context/ProductContext";
import CartItem from "./CartItem";
import { convertNumToRp } from "../../../../helper";

function Cart() {
    const { cartList, setCartList } = useContext(ProductContext);
    const [loading, setLoading] = useState(true);
    let history = useHistory();

    let { path, url } = useRouteMatch();
    let totalPrice = 0;

    useEffect(() => {
        let isMounted = true;

        axios.get("/api/viewCartItems").then((res) => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setCartList(res.data.cartItems);
                }
            }
            setLoading(false);
        });

        return () => {
            isMounted = false;
        };
    }, [history]);

    let row = "";

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

    if (cartList.length > 0) {
        row = (
            <>
                {cartList.map((cartItem) => {
                    let itemPrice =
                        cartItem.product_type === "Foods"
                            ? cartItem.foods.price
                            : cartItem.drinks.price;

                    totalPrice += itemPrice * cartItem.product_qty;
                    return (
                        <Col
                            xs={12}
                            lg={8}
                            className="cart-column"
                            key={uuidv4()}
                        >
                            <CartItem item={cartItem} totalPrice={totalPrice} />
                        </Col>
                    );
                })}
            </>
        );
    } else {
        row = <h1 className="mt-5">Your shopping cart is empty</h1>;
    }

    return (
        <Container className="mt-5">
            <h3 className="product-type-title mb-5 ms-0 px-5 py-3 d-inline fw-bolder rounded-pill bg-dark bg-opacity-10 text-center text-dark">
                Cart
            </h3>
            <Container className="mt-5 ps-0 ms-0">
                <Row className="flex-column w-100">
                    {row}
                    <Row className="mt-5  ">
                        <Col
                            sm={12}
                            lg={8}
                            className="d-flex justify-content-end align-items-center"
                        >
                            <h3 className="me-5">
                                <span className="fw-bold fs-3 me-3">
                                    Total:
                                </span>
                                <span>{convertNumToRp(totalPrice)}</span>
                            </h3>
                            <Link
                                className="d-inline-block"
                                to={`${url}/payment`}
                                style={{ width: "10rem" }}
                            >
                                <Button
                                    variant="success"
                                    className="fs-4 p-2  w-100 text-white"
                                >
                                    Checkout
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                </Row>
            </Container>
        </Container>
    );
}

export default Cart;
