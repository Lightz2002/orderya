import React, { useState, useEffect } from "react";
import { Container, Image } from "react-bootstrap";
import axios from "axios";
import ReactLoading from "react-loading";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

import DashboardTable from "./DashboardTable";
import DashboardAdminHeader from "./DashboardAdminHeader";
import TableControl from "./TableControl";
import { API_URL } from "../../../../config";
import { convertNumToRp } from "../../../../helper";

function DashboardDrink() {
    const tableHeader = [
        "Category",
        "Name",
        "Quantity",
        "Price",
        "Serving Time",
        "Image",
    ];
    const [drinkList, setDrinkList] = useState([]);
    const [loading, setLoading] = useState(true);

    const deleteDrink = (e, id) => {
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
                axios.delete(`/api/deleteDrink/${id}`).then((res) => {
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
        axios.get("/api/viewDrink").then((res) => {
            if (res.status === 200) {
                setDrinkList(res.data.drink);
            }
            setLoading(false);
        });
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
        row = drinkList.map((drink) => {
            return (
                <tr key={uuidv4()}>
                    <td className="align-middle p-4">{drink.category.name}</td>
                    <td className="align-middle p-4">{drink.name}</td>
                    <td className="align-middle p-4">{drink.quantity}</td>
                    <td className="align-middle p-4">
                        {convertNumToRp(drink.price)}
                    </td>
                    <td className="align-middle p-4">{drink.serving_time}</td>
                    <td className="align-middle p-4">
                        <Image
                            src={`${API_URL}/${drink.image}`}
                            width="50px"
                            alt={drink.name}
                        />
                    </td>
                    <TableControl
                        updateUrl={`drinks/update/${drink.id}`}
                        handleDelete={deleteDrink}
                        id={drink.id}
                    />
                </tr>
            );
        });
    }

    return (
        <div>
            <DashboardAdminHeader title="Drinks" />
            <DashboardTable header={tableHeader} body={row} />
        </div>
    );
}

export default DashboardDrink;
