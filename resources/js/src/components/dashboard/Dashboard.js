import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";
import DashboardContent from "./DashboardContent";
import { Container, Row, Col } from "react-bootstrap";
import DashboardLinkContent from "./DashboardLinkContent";

/* 
Author: Ryan (2031166) & Vinson (2031162)
*/

function Dashboard() {
    return (
        <Router basename="dashboard">
            <Container fluid className="p-0 vw-100">
                <Row className=" position-relative min-vh-100 w-100 p-0 m-0">
                    <Col
                        xs={3}
                        lg={2}
                        className="position-fixed top-0 bottom-0 p-0 sidebar"
                    >
                        <DashboardSidebar isAdmin={false} />
                    </Col>
                    <Col
                        xs={9}
                        lg={10}
                        className="dashboard-col-2 d-flex flex-column"
                    >
                        <DashboardNavbar />
                        <Switch>
                            <Route exact path="/">
                                <h1>This Is User Dashboard</h1>
                            </Route>
                            <Route path="/foods">
                                <DashboardLinkContent />
                            </Route>
                            <Route path="/drinks">
                                <DashboardLinkContent />
                            </Route>
                            <Route path="/cart">
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

export default Dashboard;
