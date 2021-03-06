import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import moment from "moment";
import ReactLoading from "react-loading";
import Chart from "../../small-component/Chart";

import HorizontalCard from "../../small-component/HorizontalCard";
import { convertNumToRp } from "../../../../helper";

function DashboardMain() {
    const [orderList, setOrderList] = useState([]);
    const [orderDelivered, setOrderDelivered] = useState(0);
    const [orderToday, setOrderToday] = useState(0);
    const [orderCancelled, setOrderCancelled] = useState(0);
    const [totalProfit, setTotalProfit] = useState(0);
    const [todayProfit, setTodayProfit] = useState(0);
    const [orderChartData, setOrderChartData] = useState({});
    const [profitChartData, setProfitChartData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("/api/viewAllOrder")
            .then((res) => {
                if (res.status === 200) {
                    setOrderList(res.data.order);
                }
            })
            .then(() => {
                setLoading(false);
            });
        return () => {
            setLoading(false);
        };
    }, []);

    useEffect(() => {
        const months = moment.months();

        if (orderList.length > 0) {
            setOrderToday(
                orderList.filter(
                    (order) => order.payments.transaction_date === moment()
                ).length
            );
            setOrderDelivered(
                orderList.filter((order) => order.status === "Delivered").length
            );
            setOrderCancelled(
                orderList.filter((order) => order.status === "Cancelled").length
            );

            setTotalProfit(
                orderList
                    .filter((order) => order.status === "Delivered")
                    .map((order) =>
                        order.order_items.reduce(
                            (total, currentItem) =>
                                (total +=
                                    currentItem.price * currentItem.quantity),
                            0
                        )
                    )
                    .reduce((total, subTotal) => (total += subTotal), 0)
            );

            setTodayProfit(
                orderList
                    .filter(
                        (order) =>
                            order.payments.transaction_date === moment() &&
                            order.status === "Delivered"
                    )
                    .map((order) =>
                        order.order_items.reduce(
                            (total, currentItem) =>
                                (total +=
                                    currentItem.price * currentItem.quantity),
                            0
                        )
                    )
                    .reduce((total, subTotal) => (total += subTotal), 0)
            );

            setOrderChartData({
                labels: months,
                datasets: [
                    {
                        label: "Order Delivered",
                        data: months.map((month) => {
                            const filterByMonth = orderList.filter(
                                (order) =>
                                    moment(
                                        order.payments.transaction_date
                                    ).format("MMMM") === month &&
                                    order.status === "Delivered" &&
                                    moment(
                                        order.payments.transaction_date
                                    ).format("Y") === moment().format("Y")
                            );

                            return filterByMonth.length;
                        }),
                        backgroundColor: ["#000"],
                        borderColor: ["rgb(75, 192, 192)"],
                    },
                ],
            });

            setProfitChartData({
                labels: months,
                datasets: [
                    {
                        label: "Profit Per Month",
                        data: months
                            .map((month) => {
                                const filterByMonth = orderList
                                    .filter(
                                        (order) =>
                                            moment(
                                                order.payments.transaction_date
                                            ).format("MMMM") === month &&
                                            order.status === "Delivered" &&
                                            moment(
                                                order.payments.transaction_date
                                            ).format("Y") ===
                                                moment().format("Y")
                                    )
                                    .map((order) =>
                                        order.order_items.reduce(
                                            (total, current) =>
                                                (total +=
                                                    current.price *
                                                    current.quantity),
                                            0
                                        )
                                    );

                                return filterByMonth;
                            })
                            .map((profit) =>
                                profit.reduce(
                                    (total, current) => (total += current),
                                    0
                                )
                            ),
                        backgroundColor: ["#000"],
                        borderColor: ["#6CB2EB"],
                    },
                ],
            });
        } else {
            setOrderChartData({
                labels: months,
                datasets: [
                    {
                        label: "Order Delivered ",
                        data: [].fill(0, 0, 11),
                        backgroundColor: ["#000"],

                        borderColor: ["rgb(75, 192, 192)"],
                    },
                ],
            });

            setProfitChartData({
                labels: months,
                datasets: [
                    {
                        label: "Profit",
                        data: [].fill(0, 0, 11),
                        backgroundColor: ["#000"],
                        borderColor: ["#6CB2EB"],
                    },
                ],
            });
        }
    }, [orderList]);

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
        <Container fluid>
            <h1 className="fw-bolder">Dashboard</h1>
            <Row className="mt-5 mb-5 ms-0">
                <Col lg={3}>
                    <Row className="mb-3 flex-column justify-content-evenly pt-4">
                        <Col className="mb-3">
                            <HorizontalCard
                                title={"Today Order"}
                                text={orderToday}
                                img="clipboard-check"
                                bgColor="info"
                                textColor="info"
                            />
                        </Col>
                        <Col className="mb-3">
                            <HorizontalCard
                                title={"Order Delivered"}
                                text={orderDelivered}
                                img="shipping-fast"
                                bgColor="success"
                                textColor="success"
                            />
                        </Col>
                        <Col className="mb-3">
                            <HorizontalCard
                                title={"Order Cancelled"}
                                text={orderCancelled}
                                img="ban"
                                bgColor="danger"
                                textColor="danger"
                            />
                        </Col>
                    </Row>
                </Col>
                <Col lg={9} className="px-5">
                    <Container className="p-0">
                        <Row className="bg-white p-3 shadow">
                            <Chart
                                chartData={orderChartData}
                                text="Total Order Per Month"
                                titleColor="#000"
                            />
                        </Row>
                    </Container>
                </Col>
            </Row>
            <Row>
                <Col lg={9} className="px-5">
                    <Row className="my-3 bg-white p-3 shadow">
                        <Chart
                            chartData={profitChartData}
                            text="Total Profit Per Month"
                            titleColor="#6CB2EB"
                        />
                    </Row>
                </Col>
                <Col lg={3} className="d-flex align-items-center">
                    <Container className="h-50">
                        <Row className="flex-column">
                            <Col className="bg-white shadow mb-3">
                                <HorizontalCard
                                    title={"Total Profit"}
                                    text={convertNumToRp(totalProfit)}
                                    bgColor="white"
                                    textColor="black"
                                    opacity="100"
                                />
                            </Col>
                            <Col className="bg-white shadow">
                                <HorizontalCard
                                    title={"Today Profit"}
                                    text={convertNumToRp(todayProfit)}
                                    bgColor="white"
                                    textColor="black"
                                    opacity="100"
                                />
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}

export default DashboardMain;
