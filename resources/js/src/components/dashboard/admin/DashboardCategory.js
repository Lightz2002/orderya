import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import ReactLoading from "react-loading";
import { v4 as uuidv4 } from "uuid";

import DashboardTable from "./DashboardTable";
import DashboardAdminHeader from "./DashboardAdminHeader";
import TableControl from "./TableControl";

function DashboardCategory() {
    const tableHeader = ["Name", "Description", "Type"];
    const [categoryList, setCategoryList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`/api/viewCategory`).then((res) => {
            if (res.status === 200) {
                setCategoryList(res.data.category);
            }
            setLoading(false);
        });
    }, []);

    const deleteCategory = (e, id) => {
        e.preventDefault();

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
    } else {
        row = categoryList.map((category) => {
            return (
                <tr key={uuidv4()}>
                    <td className="align-middle p-4">{category.name}</td>
                    <td className="align-middle p-4">{category.description}</td>
                    <td className="align-middle p-4">{category.type}</td>
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
                <DashboardTable header={tableHeader} body={row} />
            </Row>
        </Container>
    );
}

export default DashboardCategory;
