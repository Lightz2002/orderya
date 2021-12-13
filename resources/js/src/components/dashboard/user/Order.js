import React, { useState, useEffect } from "react";
import { Container, Row, Button } from "react-bootstrap";
import DashboardTable from "../../small-component/DashboardTable";
import axios from "axios";
import ReactLoading from "react-loading";
import Swal from "sweetalert2";

import { Link, useRouteMatch } from "react-router-dom";
import moment from "moment";

import { v4 as uuidv4 } from "uuid";

import { truncateString, convertNumToRp } from "../../../../helper";

function Order() {
    const [loading, setLoading] = useState(true);
    const [orderList, setOrderList] = useState([]);
    let { path, url } = useRouteMatch();

    const orderHeader = [
        "Order Id",
        "Account",
        "Date",
        "Serving Time",
        "Total",
        "Payment Status",
        "Order Status",
    ];

    useEffect(() => {
        axios.get("/api/viewSpecificUserOrder").then((res) => {
            if (res.data.status === 200) {
                setOrderList(res.data.order);
            } else if (res.data.status === 404) {
                Swal.fire("Info", res.data.message, "info");
            }
            setLoading(false);
        });
        return () => {
            setLoading(false);
        };
    }, []);

    let row = null;

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
    } else if (orderList.length > 0) {
        row = orderList
            .sort((a, b) =>
                moment(b.payments.transaction_date).diff(
                    a.payments.transaction_date
                )
            )
            .map((order) => {
                let paymentStatusColor = (paymentStatus) => {
                    switch (paymentStatus) {
                        case "Rejected":
                            return "danger";
                        case "Waiting For Validation":
                            return "info";
                        case "Approved":
                            return "success";
                    }
                };

                let orderStatusColor = (orderStatus) => {
                    switch (orderStatus) {
                        case "Cancelled":
                            return "danger";
                        case "Checkout":
                            return "info";
                        case "Delivered":
                            return "success";
                    }
                };

                return (
                    <tr key={uuidv4()}>
                        <td className="align-middle p-4">
                            {truncateString(order.id, 7)}
                        </td>
                        <td className="align-middle p-4">{`${order.payments.bank_name} ${order.payments.account_number}`}</td>
                        <td className="align-middle p-4">
                            {order.payments.transaction_date}
                        </td>
                        <td className="align-middle p-4">
                            {order.order_items
                                .map((item) =>
                                    item.foods
                                        ? item.foods.serving_time
                                        : item.drinks.serving_time
                                )
                                .reduce((total, current) => {
                                    return (
                                        total + parseInt(current.split(" ")[0])
                                    );
                                }, 0)
                                .toString()
                                .concat(" mins")}
                        </td>
                        <td className="align-middle p-4">
                            {convertNumToRp(
                                order.order_items.reduce(
                                    (total, current) =>
                                        (total +=
                                            current.price * current.quantity),
                                    0
                                )
                            )}
                        </td>
                        <td className="align-middle p-4">
                            <p
                                className={`m-0 d-inline-block text text-${paymentStatusColor(
                                    order.payments.status
                                )}  bg-${paymentStatusColor(
                                    order.payments.status
                                )} bg-opacity-10 rounded-pill fw-bolder px-4 py-2`}
                            >
                                {order.payments.status}
                            </p>
                        </td>
                        <td className="align-middle p-4">
                            <p
                                className={`m-0 d-inline-block text text-${orderStatusColor(
                                    order.status
                                )}  bg-${orderStatusColor(
                                    order.status
                                )} bg-opacity-10 rounded-pill fw-bolder px-4 py-2`}
                            >
                                {order.status}
                            </p>
                        </td>
                        <td className="align-middle p-4">
                            <Link
                                className="text-decoration-none"
                                to={`${url}/details/${order.id}`}
                            >
                                <Button
                                    variant="info"
                                    size="lg"
                                    className="fs-4 text-white"
                                >
                                    Details
                                </Button>
                            </Link>
                        </td>
                    </tr>
                );
            });
    }

    return (
        <Container className="mt-5">
            <h3 className="product-type-title mb-5 ms-0 px-5 py-3 d-inline fw-bolder rounded-pill bg-dark bg-opacity-10 text-center text-dark">
                Order
            </h3>
            <Row className="p-3">
                <DashboardTable
                    header={orderHeader}
                    body={row}
                    tableControl={true}
                />
                <p className="text-secondary fs-3">
                    <span className="fw-bolder">Note: </span> View the order
                    menus by clicking details button
                </p>
            </Row>
        </Container>
    );
}

export default Order;
