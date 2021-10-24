import React, { useState, useEffect } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import { Container } from "react-bootstrap";
import Dashboard from "./dashboard/Dashboard";
import DashboardAdmin from "./dashboard/DashboardAdmin";
import Swal from "sweetalert2";
import axios from "axios";
import ReactLoading from "react-loading";

function DashboardProtectedRoute({ ...restOfProps }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAuthorized, setisAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        axios.get("/api/checkingAuthentication").then((res) => {
            if (res.data.status === 200) {
                setIsAuthenticated(true);
            }
            setLoading(false);
        });

        axios.get("/api/checkingAuthorization").then((res) => {
            if (res.data.status === 200) {
                setisAuthorized(true);
            }
            setLoading(false);
        });

        return () => {
            setisAuthorized(false);
            setIsAuthenticated(false);
        };
    }, []);

    axios.interceptors.response.use(
        undefined,
        function axiosRetryInterceptor(err) {
            if (err.response.status === 401) {
                Swal.fire(
                    "Unauthenticated",
                    err.response.data.message,
                    "warning"
                );
                history.push("/");
            }
            return Promise.reject(err);
        }
    );

    if (loading) {
        return (
            <Container className="min-vh-100 d-flex align-content-center align-items-center justify-content-center">
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
        <Route
            {...restOfProps}
            render={() => {
                if (isAuthenticated) {
                    if (isAuthorized) {
                        return <DashboardAdmin />;
                    } else {
                        return <Dashboard />;
                    }
                } else {
                    <Redirect to="/login" />;
                }
            }}
        />
    );
}

export default DashboardProtectedRoute;
