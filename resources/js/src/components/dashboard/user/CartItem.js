import React, { useContext } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

import { API_URL } from "../../../../config";
import { convertNumToRp } from "../../../../helper";
import { ProductContext } from "../context/ProductContext";

function CartItem({ item }) {
    const { increaseQuantity, decreaseQuantity, deleteCartItem } =
        useContext(ProductContext);

    let product = item.product_type === "Foods" ? item.foods : item.drinks;

    return (
        <Card className="d-flex cart-item">
            <Container>
                <Row className="p-3">
                    <Col xs={4} lg={5}>
                        <Card.Img
                            variant="top"
                            src={`${API_URL}/${product.image}`}
                            alt={product.name}
                            width={200}
                            height={200}
                        />
                    </Col>
                    <Col>
                        <Card.Body className="position-relative">
                            <i
                                onClick={(e) => deleteCartItem(e, item.id)}
                                className="position-absolute top-0 end-0 fs-1 px-5 py-3 text-primary fa fa-trash"
                            ></i>
                            <Card.Title className="fs-1 fw-bolder mb-3">
                                {product.name}
                            </Card.Title>
                            <Card.Text className="fs-4 text-secondary ms-auto">
                                <span>Total:</span> {product.quantity}
                            </Card.Text>

                            <Card.Text className="fs-3 fw-bold text-primary ms-auto">
                                {convertNumToRp(product.price)}
                            </Card.Text>
                            <Card.Text className="fs-4 text-secondary ms-auto">
                                <span>Serving Time:</span>{" "}
                                {product.serving_time}
                            </Card.Text>
                            <Container className="p-0 mt-5">
                                <Row className="align-items-center flex-row mt-3">
                                    <Col xs={2} className="p-0">
                                        <Button
                                            variant="outline-secondary"
                                            className="fs-3 w-100 py-0 px-3 border border-none"
                                            onClick={(e) =>
                                                increaseQuantity(e, item.id)
                                            }
                                        >
                                            +
                                        </Button>
                                    </Col>
                                    <Col
                                        xs={2}
                                        className="p-1 fs-4 bg-secondary bg-opacity-10 text-center "
                                    >
                                        {item.product_qty}
                                    </Col>
                                    <Col xs={2} className="p-0">
                                        <Button
                                            variant="outline-secondary"
                                            className="fs-3 w-100 py-0 px-3 border border-none"
                                            onClick={(e) =>
                                                decreaseQuantity(e, item.id)
                                            }
                                        >
                                            -
                                        </Button>
                                    </Col>
                                </Row>
                            </Container>
                        </Card.Body>
                    </Col>
                </Row>
            </Container>
        </Card>
    );
}

export default CartItem;
