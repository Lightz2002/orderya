import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ReactLoading from "react-loading";
import Swal from "sweetalert2";

import MenuCard from "./MenuCard";
import { upperLink } from "../../../../helper";
import { ProductContext } from "../context/ProductContext";

function ProductMenu() {
    const [loading, setLoading] = useState(true);
    const { productList, setProductList } = useContext(ProductContext);

    let history = useHistory();
    let { type } = useParams();
    let textColor = type === "foods" ? "primary" : "info";

    useEffect(() => {
        axios.get(`api/viewProduct/${type}`).then((res) => {
            if (res.data.status === 200) {
                setProductList(res.data.product);
            } else if (res.data.status === 404) {
                Swal.fire("Error", res.data.message, "error");
                history.push("/");
            }
            setLoading(false);
        });
        setLoading(true);

        return () => {
            setLoading(false);
            setProductList([]);
        };
    }, [type]);

    let menu = null;
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
    } else {
        if (productList.length > 0) {
            menu = productList.map((product) => {
                return (
                    <Col xs={6} lg={3} key={uuidv4()}>
                        <MenuCard item={product} />{" "}
                    </Col>
                );
            });
        } else {
            <h1 className="mt-5">There are no products with this type</h1>;
        }
    }

    return (
        <Container className="mt-5">
            <h3
                className={`product-type-title mb-5 ms-0 px-5 py-3 d-inline fw-bolder rounded-pill bg-${textColor} bg-opacity-10 text-center text-${textColor}`}
            >
                {upperLink(type)}
            </h3>
            <Row className="mt-5 ps-3">{menu}</Row>
        </Container>
    );
}

export default ProductMenu;
