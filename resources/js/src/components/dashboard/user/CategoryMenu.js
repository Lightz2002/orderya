import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import ReactLoading from "react-loading";

import { upperLink } from "../../../../helper";
import BackButton from "../../small-component/BackButton";
import MenuCard from "./MenuCard";
import { v4 as uuidv4 } from "uuid";

function CategoryMenu() {
    let { category } = useParams();
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);
    let history = useHistory();

    useEffect(() => {
        let isMounted = true;

        axios.get(`/api/viewFoodByCategory/${category}`).then((res) => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setProductList(res.data.product);
                } else if (res.data.status === 404) {
                    Swal.fire("Error", res.data.message, "error");
                    history.push("/");
                }
            }
            setLoading(false);
        });

        return () => {
            isMounted = false;
        };
    }, [category]);

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

    let row = "";

    if (productList.length > 0) {
        row = productList.map((food) => {
            return (
                <Col xs={6} lg={3} key={uuidv4()}>
                    <MenuCard item={food} />
                </Col>
            );
        });
    } else {
        row = <h1 className="mt-5">There are no products for this category</h1>;
    }

    return (
        <Container className="category-menu ">
            <Row className="d-block mt-5">
                <BackButton text="View All Category" url="/" classname="tes" />
                <h3 className="mt-3 mb-5 d-inline bg-black rounded-pill p-3 px-5 text-black fw-bolder bg-opacity-10">
                    {upperLink(category)}
                </h3>
                <Container className="mt-5">
                    <Row>{row}</Row>
                </Container>
            </Row>
        </Container>
    );
}

export default CategoryMenu;
