import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import ReactLoading from "react-loading";
import axios from "axios";

import { convertNumToRp } from "../../../../helper";
import { API_URL } from "../../../../config";
import FormGroup from "../../small-component/FormGroup";
import { ProductContext } from "../context/ProductContext";

function MenuDetails() {
    let { category, type, id } = useParams();
    const history = useHistory();

    const [productItem, setProductItem] = useState([]);
    const [loading, setLoading] = useState(true);
    const color = productItem.quantity === 0 ? "danger" : "success";

    const {
        quantity,
        addToCart,
        handleQuantityChange,
        handleIncrement,
        handleDecrement,
    } = useContext(ProductContext);

    useEffect(() => {
        axios.get(`api/viewProduct/${type}/${id}`).then((res) => {
            if (res.data.status === 200) {
                setProductItem(res.data.product);
            } else if (res.data.status === 404) {
                Swal.fire("Error", res.data.message, "error");
                history.push(`/menu/${type}/${category}`);
            }
            setLoading(false);
        });
    }, []);

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
            <Card className="card-details border-0 shadow rounded-3 d-flex">
                <Container>
                    <Row className="p-5">
                        <Col xs={12} lg={5}>
                            <Card.Img
                                variant="left"
                                src={`${API_URL}/${productItem.image}`}
                                alt={productItem.name}
                                className="w-100"
                            />
                        </Col>
                        <Col xs={12} lg={7}>
                            <Card.Body>
                                <Row className="align-items-baseline">
                                    <Col>
                                        <Card.Title className="fw-bolder fs-1">
                                            {productItem.name}
                                        </Card.Title>
                                    </Col>
                                    <Col className="text-center">
                                        <Card.Text
                                            className={`fs-4 d-inline fw-bold text-${color} bg-${color} bg-opacity-10 py-2 px-3 rounded-pill`}
                                        >
                                            {productItem.quantity === 0
                                                ? "Out Of Stock"
                                                : "Available"}
                                        </Card.Text>
                                    </Col>
                                </Row>
                                <Row>
                                    <Card.Text className="fs-4 text-secondary ms-auto">
                                        <span>Total:</span>{" "}
                                        {productItem.quantity}
                                    </Card.Text>
                                </Row>
                                <Row className="my-5">
                                    <Col>
                                        <h3 className="fw-bold">Description</h3>
                                        <Card.Text className="fs-3 text-secondary ms-auto">
                                            {productItem.description ||
                                                "There is no description for this product yet"}
                                        </Card.Text>
                                    </Col>
                                    <Col>
                                        <h3 className="fw-bold ">Recipe</h3>
                                        <Card.Text className="fs-3 text-secondary ms-auto">
                                            {productItem.recipe ||
                                                "There is no recipe for this product yet"}
                                        </Card.Text>
                                    </Col>
                                    <Col>
                                        <h3 className="fw-bold">Ingredient</h3>
                                        <Card.Text className="fs-3 text-secondary ms-auto">
                                            {productItem.ingredient ||
                                                "There is no ingredient for this product yet"}
                                        </Card.Text>
                                    </Col>
                                </Row>

                                <Row className="mt-3 mb-5">
                                    <Card.Text className="fs-3 fw-bold text-primary ms-auto">
                                        {convertNumToRp(productItem.price)}
                                    </Card.Text>
                                    <Card.Text className="fs-4 text-secondary ms-auto">
                                        <span>Serving Time:</span>{" "}
                                        {productItem.serving_time}
                                    </Card.Text>
                                </Row>
                                {productItem.quantity > 0 && (
                                    <Row className="align-items-center mt-3">
                                        <Col xs={3} className="d-flex">
                                            <Button
                                                variant="outline-secondary"
                                                className="fs-3 py-0 px-3 border border-none"
                                                onClick={handleIncrement}
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
                                                            productItem.quantity
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
                                        <Col xs={3}>
                                            <Button
                                                variant="primary"
                                                className="d-flex w-100 justify-content-evenly align-items-baseline fs-4 px-4 py-1"
                                                onClick={(e) =>
                                                    addToCart(e, productItem)
                                                }
                                            >
                                                Add
                                                <i className="fs-4 fa fa-shopping-cart py-1"></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                )}
                            </Card.Body>
                        </Col>
                    </Row>
                </Container>
            </Card>
        </Container>
    );
}

export default MenuDetails;
