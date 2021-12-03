import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import ReactLoading from "react-loading";
import { Link, useRouteMatch } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import DashboardAdminHeader from "./DashboardAdminHeader";
import { truncateString, convertNumToRp } from "../../../../helper";
import DashboardTable from "../../small-component/DashboardTable";
import { OrderContext } from "../context/OrderContext";

function DashboardOrder() {
    let { path, url } = useRouteMatch();

    const tableHeader = [
        "Order",
        "User",
        "Account",
        "Date",
        "Serving Time",
        "Total",
        "Payment Status",
        "Order Status",
    ];

    const { orderList, setOrderList } = useContext(OrderContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("/api/viewAllOrder").then((res) => {
            if (res.status === 200) {
                setOrderList(res.data.order);
                console.log(res.data.order);
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
        row = orderList.map((order) => {
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
                    <td className="align-middle p-4">{order.user.username}</td>
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
                                return total + parseInt(current.split(" ")[0]);
                            }, 0)
                            .toString()
                            .concat(" mins")}
                    </td>
                    <td className="align-middle p-4">
                        {convertNumToRp(
                            order.order_items.reduce(
                                (total, current) =>
                                    (total += current.price * current.quantity),
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
        <Container fluid>
            <Row>
                <DashboardAdminHeader title="Order" button={false} />
            </Row>
            <Row>
                <Col className="p-0">
                    <DashboardTable
                        header={tableHeader}
                        body={row}
                        tableControl={true}
                    />
                </Col>
                <p className="text-secondary fs-3">
                    <span className="fw-bolder">Note: </span> change the payment
                    and order status by clicking details button
                </p>
            </Row>
        </Container>
    );
}

export default DashboardOrder;
