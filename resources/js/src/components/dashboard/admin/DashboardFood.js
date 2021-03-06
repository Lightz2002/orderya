import React, { useState, useEffect } from "react";
import { Container, Row, Image, Button } from "react-bootstrap";
import axios from "axios";
import ReactLoading from "react-loading";
import { Link, useRouteMatch } from "react-router-dom";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";

import DashboardTable from "../../small-component/DashboardTable";
import DashboardAdminHeader from "./DashboardAdminHeader";
import TableControl from "./TableControl";
import { API_URL } from "../../../../config";
import { convertNumToRp } from "../../../../helper";
import generatePDF from "../../../services/ReportGenerator";

function DashboardFood() {
    const tableHeader = [
        "Category",
        "Name",
        "Quantity",
        "Price",
        "Serving Time",
        "Image",
    ];
    const [foodList, setFoodList] = useState([]);
    const [loading, setLoading] = useState(true);
    let { path, url } = useRouteMatch();

    const deleteFood = (e, id) => {
        e.preventDefault();
        console.log(foodList);

        const btnDelete = e.currentTarget;

        btnDelete.lastChild.textContent = "Deleting";

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/deleteFood/${id}`).then((res) => {
                    if (res.status === 200) {
                        Swal.fire("Deleted", res.data.message, "success");
                        btnDelete.closest("tr").remove();
                        btnDelete.lastChild.textContent = "Delete";
                    } else if (res.data.status === 404) {
                        Swal.fire("Error", res.data.message, "error");
                    }
                });
            } else {
                btnDelete.lastChild.textContent = "Delete";
            }
        });
    };

    useEffect(() => {
        axios.get("/api/viewFood").then((res) => {
            if (res.status === 200) {
                setFoodList(res.data.food);
            }
            setLoading(false);
        });
        return () => {
            setLoading(false);
        };
    }, []);

    let row = "";
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
        row = foodList.map((food) => {
            return (
                <tr key={uuidv4()}>
                    <td className="align-middle p-4">
                        {food.category?.name ||
                            "This food category has been deleted"}
                    </td>
                    <td className="align-middle p-4">{food.name}</td>
                    <td className="align-middle p-4">{food.quantity}</td>
                    <td className="align-middle p-4">
                        {convertNumToRp(food.price)}
                    </td>
                    <td className="align-middle p-4">{food.serving_time}</td>
                    <td className="align-middle p-4">
                        <Image
                            src={`${API_URL}/${food.image}`}
                            width="50px"
                            alt={food.name}
                        />
                    </td>
                    <TableControl
                        updateUrl={`foods/update/${food.id}`}
                        handleDelete={deleteFood}
                        id={food.id}
                    />
                </tr>
            );
        });
    }

    const generateFoodReportData = (foodList) => {
        let tableRows = [
            ...foodList.map((food, index) => [
                index + 1,
                food.category.name,
                food.name,
                food.quantity,
                convertNumToRp(food.price),
                food.serving_time,
            ]),
        ];

        return tableRows;
    };

    return (
        <Container fluid>
            <Row>
                <DashboardAdminHeader title="Food" />
                <Button
                    variant="outline-secondary"
                    className="d-inline-flex justify-content-evenly align-items-baseline btn-print  mt-3 fs-4 p-3 mb-0 ms-auto "
                    onClick={() =>
                        generatePDF(
                            "All Food Menus",
                            [
                                "No",
                                "Category",
                                "Name",
                                "Quantity",
                                "Price",
                                "Serving Time",
                            ],
                            generateFoodReportData(foodList),
                            ""
                        )
                    }
                >
                    <i className="fas fa-print fs-3"></i>
                    Print
                </Button>
                <DashboardTable
                    header={tableHeader}
                    body={row}
                    tableControl={true}
                />
            </Row>
        </Container>
    );
}

export default DashboardFood;
