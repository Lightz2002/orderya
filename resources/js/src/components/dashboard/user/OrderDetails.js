import React, { useState, useEffect } from "react";
import { Container, Row, Image } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import ReactLoading from "react-loading";
import { v4 as uuidv4 } from "uuid";

import { convertNumToRp } from "../../../../helper";
import { API_URL } from "../../../../config";
import BackButton from "../../small-component/BackButton";
import DashboardTable from "../../small-component/DashboardTable";

function OrderDetails() {
    const [loading, setLoading] = useState(true);
    const [orderList, setOrderList] = useState([]);

    let totalPrice = 0;

    const orderItemsHeader = [
        "No",
        "Name",
        "Price",
        "Amount",
        "Serving Time",
        "Image",
    ];
    let { id } = useParams();
    let history = useHistory();

    useEffect(() => {
        axios.get(`/api/viewSpecificOrder/${id}`).then((res) => {
            if (res.data.status === 200) {
                setOrderList(res.data.order);
            } else if (res.data.status === 404) {
                Swal.fire("error", res.data.message, "error");
                history.push("/order");
            }
            setLoading(false);
        });

        return () => {
            setLoading(false);
        };
    }, []);

    let orderItemRows = null;
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
        orderItemRows = orderList.order_items.map((item, index) => {
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
                        {itemType.serving_time}
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
    }

    return (
        <Container className="mt-5">
            <BackButton text="View All Orders" url="/order" />
            <Row className="mt-5 w-75">
                <h1 className="fw-bolder mb-0">Order Items</h1>
                <DashboardTable
                    header={orderItemsHeader}
                    body={orderItemRows}
                    tableControl={false}
                />
                <h3 className="mt-3 text-end">
                    <span className="fw-bold fs-3 me-3">Total:</span>
                    <span>{convertNumToRp(totalPrice)}</span>
                </h3>
            </Row>
        </Container>
    );
}

export default OrderDetails;
