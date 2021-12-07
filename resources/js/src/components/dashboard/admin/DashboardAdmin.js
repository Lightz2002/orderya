import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import DashboardNavbar from "../DashboardNavbar";
import DashboardSidebar from "../DashboardSidebar";
import OrderProvider from "../context/OrderContext";

import adminRoutes from "../../routes/adminRoutes";
import RouteWithSubRoutes from "../../routes/RouteWithSubRoutes";

function DashboardAdmin() {
    return (
        <Router basename="/dashboard">
            <Container fluid className="p-0 vw-100">
                <Row className="position-relative min-vh-100 w-100 p-0 m-0">
                    <Col xs={12} lg={2} className="p-0 sidebar">
                        <DashboardSidebar isAdmin={true} />
                    </Col>
                    <Col
                        xs={12}
                        lg={10}
                        className="dashboard-col-2 d-flex  flex-column"
                    >
                        <DashboardNavbar />
                        <OrderProvider>
                            <Switch>
                                {adminRoutes.map((route, i) => (
                                    <RouteWithSubRoutes key={i} {...route} />
                                ))}
                            </Switch>
                        </OrderProvider>
                    </Col>
                </Row>
            </Container>
        </Router>
    );
}

export default DashboardAdmin;
