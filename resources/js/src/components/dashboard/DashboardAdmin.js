import React from "react";
import DashboardNavbar from "./DashboardNavbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import DashboardSidebar from "./DashboardSidebar";
import DashboardLinkContent from "./DashboardLinkContent";
import { Container, Row, Col } from "react-bootstrap";

function DashboardAdmin() {
    return (
        <Router basename="dashboard">
            <Container fluid className="p-0 vw-100">
                <Row className="position-relative min-vh-100 w-100 p-0 m-0">
                    <Col
                        xs={3}
                        lg={2}
                        className="position-fixed top-0 bottom-0 p-0 mw-100"
                    >
                        <DashboardSidebar isAdmin={true} />
                    </Col>
                    <Col
                        xs={9}
                        lg={10}
                        className="dashboard-col-2 d-flex flex-column"
                    >
                        <DashboardNavbar />
                        <Switch>
                            <Route exact path="/">
                                <h1>This is admin dashboard</h1>
                            </Route>
                            <Route path="/foods">
                                <DashboardLinkContent />
                            </Route>
                            <Route path="/drinks">
                                <DashboardLinkContent />
                            </Route>
                            <Route path="/employee">
                                <DashboardLinkContent />
                            </Route>
                            <Route path="/order">
                                <DashboardLinkContent />
                            </Route>
                        </Switch>
                    </Col>
                </Row>
            </Container>
        </Router>
    );
}

export default DashboardAdmin;
