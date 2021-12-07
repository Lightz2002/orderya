import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import ReactLoading from "react-loading";
import { useHistory, useParams } from "react-router-dom";

import { OrderContext } from "../../context/OrderContext";
import DashboardTable from "../../../small-component/DashboardTable";
import { API_URL } from "../../../../../config";
import { convertNumToRp } from "../../../../../helper";
import FormGroup from "../../../small-component/FormGroup";
import BackButton from "../../../small-component/BackButton";
import Swal from "sweetalert2";

function OrderDetails() {
    let { id } = useParams();
    let history = useHistory();

    let totalPrice = 0;

    const orderItemsHeader = [
        "No",
        "Name",
        "Price",
        "Amount",
        "Serving Time",
        "Image",
    ];
    const paymentsHeader = [
        "Bank Name",
        "Payment Status",
        "Status",
        "Note For Order",
        "Payment Date",
        "Image",
    ];

    const { orderList, setOrderList } = useContext(OrderContext);
    const [data, setData] = useState({ status: "", transaction_status: "" });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`/api/viewSpecificOrder/${id}`).then((res) => {
            if (res.data.status === 200) {
                setOrderList(res.data.order);
                setData({
                    status: res.data.order.status,
                    transaction_status: res.data.order.payments.status,
                });
            } else if (res.data.status === 404) {
                Swal.fire("error", res.data.message, "error");
                history.push("/");
            }
            setLoading(false);
        });

        return () => {
            setLoading(false);
        };
    }, []);

    const updateOrderStatus = (order_id, data) => {
        axios.put(`/api/updateOrderStatus/${order_id}`, data).then((res) => {
            if (res.data.status === 200) {
                return;
            } else if (res.data.status === 404) {
                Swal.fire("Oops", res.data.message, "error");
            }
        });
    };

    useEffect(() => {
        if (data.status && data.transaction_status) {
            updateOrderStatus(id, data);
        }
    }, [data]);

    let orderItemRows = null;
    let paymentRows = null;

    const handleStatusChange = (e) => {
        e.preventDefault();

        setOrderList((order) => {
            return e.target.name === "transaction_status"
                ? {
                      ...order,
                      payments: { ...order.payments, status: e.target.value },
                  }
                : {
                      ...order,
                      [e.target.name]: e.target.value,
                  };
        });

        setData({ ...data, [e.target.name]: e.target.value });
    };

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
        const { order_items } = orderList;

        orderItemRows = order_items.map((item, index) => {
            const itemType = item.foods ? item.foods : item.drinks;
            totalPrice += item.quantity * item.price;

            return (
                <tr key={uuidv4()}>
                    <td className="align-middle p-4">{index + 1}</td>
                    <td className="align-middle p-4">{itemType.name}</td>
                    <td className="align-middle p-4">
                        {convertNumToRp(item.price)}
                    </td>
                    <td className="align-middle p-4">{item.quantity}</td>
                    <td className="align-middle p-4">
                        {item.foods
                            ? item.foods.serving_time
                            : item.drinks.serving_time}
                    </td>
                    <td className="align-middle p-4">
                        <Image
                            src={`${API_URL}/${itemType.image}`}
                            alt={item.name}
                            width={100}
                        />
                    </td>
                </tr>
            );
        });

        paymentRows = (
            <tr key={uuidv4()}>
                <td className="align-middle p-4">{`${orderList.payments.account_name} ${orderList.payments.account_number}`}</td>
                <td className="align-middle p-4">
                    <FormGroup
                        id="formBasicPaymentStatus"
                        name="transaction_status"
                        handleChange={handleStatusChange}
                        type="select"
                        value={orderList.payments.status}
                        selectOptions={[
                            "Waiting For Validation",
                            "Approved",
                            "Rejected",
                        ]}
                        selectDefault={"Select Payment Status"}
                        hideLabel={"hide"}
                        disabled={orderList.payments.status === "Approved"}
                    />
                </td>
                <td className="align-middle p-4">
                    <FormGroup
                        id="formBasicStatus"
                        name="status"
                        handleChange={handleStatusChange}
                        type="select"
                        value={orderList.status}
                        selectOptions={["Checkout", "Delivered", "Cancelled"]}
                        selectDefault={"Select Order Status"}
                        hideLabel={"hide"}
                    />
                </td>
                <td className="align-middle p-4">
                    {orderList.note_for_order || "No note for this order"}
                </td>
                <td className="align-middle p-4">
                    {orderList.payments.transaction_date}
                </td>
                <td className="align-middle p-4">
                    <a
                        href={`${API_URL}/${orderList.payments.transaction_receipt}`}
                        target="_blank"
                        className="text-decoration-none"
                    >
                        <Image
                            src={`${API_URL}/${orderList.payments.transaction_receipt}`}
                            alt={orderList.name}
                            width={100}
                            height={100}
                        />
                    </a>
                </td>
            </tr>
        );
    }

    return (
        <Container>
            <Row>
                <BackButton text="View All Orders" url="/order" />
                <h1 className="fw-bold">Payments</h1>
                <DashboardTable
                    header={paymentsHeader}
                    body={paymentRows}
                    tableControl={false}
                />
            </Row>
            <Row className="mt-5 w-50">
                <h2 className="mb-0">Order Items</h2>
                <DashboardTable
                    header={orderItemsHeader}
                    body={orderItemRows}
                    tableControl={false}
                />
                <h3 className="mt-3 text-end ">
                    <span className="fw-bold fs-3 me-3">Total:</span>
                    <span>{convertNumToRp(totalPrice)}</span>
                </h3>
            </Row>
        </Container>
    );
}

export default OrderDetails;
