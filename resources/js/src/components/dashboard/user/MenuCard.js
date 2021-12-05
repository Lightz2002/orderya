import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { Link, useRouteMatch } from "react-router-dom";
import { API_URL } from "../../../../config";
import { convertNumToRp } from "../../../../helper";
import { v4 as uuidv4 } from "uuid";
import { ProductContext } from "../context/ProductContext";

import FormGroup from "../../small-component/FormGroup";

function MenuCard({ item }) {
    let { path, url } = useRouteMatch();

    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (e, maxQuantity) => {
        if (e.target) {
            if (e.target.value == 0) {
                setQuantity("");
            } else if (e.target.value <= maxQuantity) {
                setQuantity(+e.target.value);
            }
        }
    };

    const handleIncrement = (maxQuantity) => {
        if (quantity < maxQuantity) {
            setQuantity((prevQuantity) => prevQuantity + 1);
        }
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };

    const { addToCart } = useContext(ProductContext);

    let link = `${url}/${item.id}`;
    const color = item.quantity === 0 ? "danger" : "success";

    return (
        <Card className="menu-card p-0 shadow rounded-3">
            <Link
                to={link}
                className="d-inline-block text-dark text-decoration-none"
            >
                <Card.Img
                    variant="top"
                    className="rounded-top"
                    src={`${API_URL}/${item.image}`}
                    alt={item.name}
                    height={200}
                    width={200}
                />
            </Link>

            <Card.Body className="py-4">
                <Container fluid className="p-0">
                    <Row className="align-items-baseline">
                        <Col>
                            <Card.Title className="fw-bolder fs-2">
                                {item.name}
                            </Card.Title>
                        </Col>
                        <Col className="text-center">
                            <Card.Text
                                className={`fs-4 d-inline fw-bold text-${color} bg-${color} bg-opacity-10 py-2 px-3 rounded-pill`}
                            >
                                {item.quantity === 0
                                    ? "Out Of Stock"
                                    : "Available"}
                            </Card.Text>
                        </Col>
                    </Row>
                    <Row>
                        <Card.Text className="fs-4 text-secondary ms-auto">
                            <span>Total:</span> {item.quantity}
                        </Card.Text>
                    </Row>
                    <Row className="ps-1 mt-3">
                        <Card.Text className="fs-4 fw-bold text-primary ms-auto">
                            {convertNumToRp(item.price)}
                        </Card.Text>
                    </Row>
                </Container>
                <Card.Text>
                    {item.description === "null" || item.description === null
                        ? ""
                        : item.description}
                </Card.Text>
                {item.quantity > 0 && (
                    <Container className="p-0 mt-5">
                        <Row className="align-items-center mt-3">
                            <Col xs={6} className="d-flex">
                                <Button
                                    variant="outline-secondary"
                                    className="fs-3 py-0 px-3 border border-none"
                                    onClick={() =>
                                        handleIncrement(item.quantity)
                                    }
                                >
                                    +
                                </Button>
                                <Form className="p-0">
                                    <FormGroup
                                        id={uuidv4()}
                                        label=""
                                        name="quantity"
                                        type="number"
                                        placeholder=""
                                        handleChange={(e) =>
                                            handleQuantityChange(
                                                e,
                                                item.quantity
                                            )
                                        }
                                        value={quantity}
                                        errors={[]}
                                        selectOptions={[]}
                                        fontSize="4"
                                        paddingXSize="3"
                                        paddingYSize="1"
                                        marginSize="0"
                                        display="flex"
                                    />
                                </Form>
                                <Button
                                    variant="outline-secondary"
                                    className="fs-3 py-0 px-3 border border-none"
                                    onClick={handleDecrement}
                                >
                                    -
                                </Button>
                            </Col>
                            <Col xs={6}>
                                <Button
                                    variant="primary"
                                    className="d-flex w-100 justify-content-evenly fs-4 align-items-baseline px-4 py-1"
                                    onClick={(e) =>
                                        addToCart(e, item, quantity)
                                    }
                                >
                                    Add
                                    <i className="fs-4 fa fa-shopping-cart py-1"></i>
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                )}
            </Card.Body>
        </Card>
    );
}

export default MenuCard;
