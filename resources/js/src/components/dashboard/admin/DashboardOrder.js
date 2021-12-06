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
import FormGroup from "../../small-component/FormGroup";
import generatePDF from "../../../services/ReportGenerator";

import moment from "moment";
import Swal from "sweetalert2";

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
    const [salesTime, setSalesTime] = useState("Day");
    const [loading, setLoading] = useState(true);

    const handleTimeChange = (e) => {
        setSalesTime(e.target.value);
    };

    useEffect(() => {
        axios.get("/api/viewAllOrder").then((res) => {
            if (res.status === 200) {
                setOrderList(res.data.order);
            }
            setLoading(false);
        });

        return () => {
            setLoading(false);
        };
    }, []);

    useEffect(() => {
        const getOrder = (time) => {
            let sales = [];
            switch (time) {
                case "Day":
                    sales = orderList
                        .filter(
                            (order) =>
                                order.status === "Delivered" &&
                                moment(order.payments.transaction_date) ===
                                    moment().format("YYYY-MM-DD")
                        )
                        .map((order) =>
                            order.order_items.foods
                                ? order.order_items.foods
                                : order.order_items.drinks
                        )
                        .reduce(
                            (allObject, currentObject) =>
                                allObject.concat(currentObject),
                            []
                        )
                        .map((order) =>
                            order.foods ? order.foods : order.drinks
                        );
                    return sales;
                case "Week":
                    const weekValue = moment().week();
                    const startOfThisWeek = moment()
                        .week(weekValue)
                        .format("YYYY-MM-DD");
                    const endOfThisWeek = moment(startOfThisWeek)
                        .add(6, "days")
                        .format("YYYY-MM-DD");
                    sales = orderList
                        .filter(
                            (order) =>
                                order.status === "Delivered" &&
                                moment(
                                    order.payments.transaction_date
                                ).isBetween(startOfThisWeek, endOfThisWeek)
                        )
                        .map((order) =>
                            order.order_items.foods
                                ? order.order_items.foods
                                : order.order_items.drinks
                        )
                        .reduce(
                            (allObject, currentObject) =>
                                allObject.concat(currentObject),
                            []
                        )
                        .map((order) =>
                            order.foods ? order.foods : order.drinks
                        );
                    return sales;

                case "Month":
                    sales = orderList
                        .filter(
                            (order) =>
                                order.status === "Delivered" &&
                                moment(order.payments.transaction_date).format(
                                    "M"
                                ) === moment().format("M")
                        )
                        .map((order) => order.order_items)
                        .reduce(
                            (allObject, currentObject) =>
                                allObject.concat(currentObject),
                            []
                        )
                        .map((order) =>
                            order.foods ? order.foods : order.drinks
                        );
                    return sales;
            }
        };
    }, [orderList]);

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

    const getAllOrderByTime = (time) => {
        let sales = [];
        switch (time) {
            case "Day":
                sales = orderList
                    .filter(
                        (order) =>
                            order.status === "Delivered" &&
                            moment(order.payments.transaction_date) ===
                                moment().format("YYYY-MM-DD")
                    )
                    .map((order) => order.order_items)
                    .reduce(
                        (allObject, currentObject) =>
                            allObject.concat(currentObject),
                        []
                    )
                    .map((order) => (order.foods ? order.foods : order.drinks));
                return sales;

            case "Week":
                const weekValue = moment().week();
                const startOfThisWeek = moment()
                    .week(weekValue)
                    .format("YYYY-MM-DD");
                const endOfThisWeek = moment(startOfThisWeek)
                    .add(6, "days")
                    .format("YYYY-MM-DD");

                sales = orderList
                    .filter(
                        (order) =>
                            order.status === "Delivered" &&
                            moment(order.payments.transaction_date).isBetween(
                                startOfThisWeek,
                                endOfThisWeek
                            )
                    )
                    .map((order) => order.order_items)
                    .reduce(
                        (allObject, currentObject) =>
                            allObject.concat(currentObject),
                        []
                    )
                    .map((order) => (order.foods ? order.foods : order.drinks));
                return sales;

            case "Month":
                sales = orderList
                    .filter(
                        (order) =>
                            order.status === "Delivered" &&
                            moment(order.payments.transaction_date).format(
                                "M"
                            ) === moment().format("M")
                    )
                    .map((order) => order.order_items)
                    .reduce(
                        (allObject, currentObject) =>
                            allObject.concat(currentObject),
                        []
                    )
                    .map((order) => (order.foods ? order.foods : order.drinks));
                return sales;
        }
    };

    return (
        <Container fluid>
            <Row>
                <Container>
                    <Row className="align-items-center">
                        <Col>
                            <DashboardAdminHeader
                                title="Order"
                                button={false}
                            />
                        </Col>
                        <Col
                            lg={4}
                            className="d-flex justify-content-center align-items-center"
                        >
                            <FormGroup
                                type="select"
                                name="time"
                                selectOptions={["Day", "Week", "Month"]}
                                value={salesTime}
                                fontSize={5}
                                marginSize={0}
                                paddingXSize={4}
                                handleChange={handleTimeChange}
                                selectDefault="Select Print Time"
                                moreStyle="d-flex align-items-center"
                            />
                            <Button
                                variant="outline-secondary"
                                className="ms-5 fs-5 p-3"
                                onClick={() =>
                                    generatePDF(
                                        `All Sales By ${salesTime}`,
                                        ["Name", "Price", "Amount"],
                                        getAllOrderByTime(salesTime),
                                        ["name", "price", "quantity"]
                                    )
                                }
                            >
                                Print Sales By Time
                            </Button>
                        </Col>
                    </Row>
                </Container>
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
