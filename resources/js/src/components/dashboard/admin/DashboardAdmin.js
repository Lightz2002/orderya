import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import DashboardNavbar from "../DashboardNavbar";
import DashboardSidebar from "../DashboardSidebar";

import adminRoutes from "../../routes/adminRoutes";
import RouteWithSubRoutes from "../../routes/RouteWithSubRoutes";

function DashboardAdmin() {
    return (
        <Router basename="/dashboard">
            <Container fluid className="p-0 vw-100">
                <Row className="position-relative min-vh-100 w-100 p-0 m-0">
                    <Col
                        xs={3}
                        lg={2}
                        className="position-fixed top-0 bottom-0 p-0 sidebar"
                    >
                        <DashboardSidebar isAdmin={true} />
                    </Col>
                    <Col
                        xs={9}
                        lg={10}
                        className="dashboard-col-2 d-flex ps-5 flex-column"
                    >
                        <DashboardNavbar />

                        <Switch>
                            <Route exact path="/">
                                <h1>This is admin dashboard</h1>
                            </Route>
                            {adminRoutes.map((route, i) => (
                                <RouteWithSubRoutes key={i} {...route} />
                            ))}
                        </Switch>
                    </Col>
                </Row>
            </Container>
        </Router>
    );
}

export default DashboardAdmin;
