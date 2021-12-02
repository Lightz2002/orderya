import React, { useState, useEffect } from "react";
import { Container, Row, Image, Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import ReactLoading from "react-loading";
import { v4 as uuidv4 } from "uuid";

import generatePDF from "../../../services/reportGenerator";
import DashboardTable from "../../small-component/DashboardTable";
import DashboardAdminHeader from "./DashboardAdminHeader";
import TableControl from "./TableControl";
import { API_URL } from "../../../../config";

function DashboardCategory() {
    const tableHeader = ["Name", "Description", "Type", "Image"];
    const [categoryList, setCategoryList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`/api/viewCategory`).then((res) => {
            if (res.status === 200) {
                setCategoryList(res.data.category);
            }
            setLoading(false);
        });
        return () => {
            setLoading(false);
        };
    }, []);

    const deleteCategory = (e, id) => {
        e.preventDefault();

        const btnDelete = e.currentTarget;

        btnDelete.lastChild.textContent = "Deleting";

        Swal.fire({
            title: "Are you sure?",
            text: "This is will also delete all products with this category!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/deleteCategory/${id}`).then((res) => {
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
    } else if (categoryList.length > 0) {
        row = categoryList.map((category) => {
            return (
                <tr key={uuidv4()}>
                    <td className="align-middle p-4">{category.name}</td>
                    <td className="align-middle p-4">
                        {category.description || ""}
                    </td>
                    <td className="align-middle p-4">{category.type}</td>
                    <td className="align-middle p-4">
                        <Image
                            src={`${API_URL}/${category.image}`}
                            alt={category.name}
                            width="100"
                        />
                    </td>
                    <TableControl
                        updateUrl={`category/update/${category.id}`}
                        handleDelete={deleteCategory}
                        id={category.id}
                    />
                </tr>
            );
        });
    }

    return (
        <Container fluid>
            <Row>
                <DashboardAdminHeader title="Category" />
                <Button
                    variant="outline-secondary"
                    className="d-inline-flex justify-content-evenly align-items-baseline btn-print  mt-3 fs-4 p-3 mb-0 ms-auto "
                    onClick={() =>
                        generatePDF(
                            "All Categories",
                            tableHeader,
                            categoryList,
                            ["name", "description", "type", "image"]
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

export default DashboardCategory;
