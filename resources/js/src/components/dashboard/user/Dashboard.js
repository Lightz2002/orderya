import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DashboardNavbar from "../DashboardNavbar";
import DashboardSidebar from "../DashboardSidebar";
import { Container, Row, Col } from "react-bootstrap";
import userRoutes from "../../routes/userRoutes";
import RouteWithSubRoutes from "../../routes/RouteWithSubRoutes";
import ProductProvider from "../context/ProductContext";

/* 
Author: Ryan (2031166) & Vinson (2031162)
*/

function Dashboard() {
    return (
        <Router basename="/dashboard">
            <Container fluid className="p-0 vw-100">
                <Row className=" position-relative  w-100 p-0 m-0">
                    <Col xs={12} lg={2} className="p-0  sidebar">
                        <DashboardSidebar isAdmin={false} />
                    </Col>
                    <Col
                        xs={12}
                        lg={10}
                        className="dashboard-col-2 d-flex flex-column"
                    >
                        <DashboardNavbar />
                        <ProductProvider>
                            <Switch>
                                {userRoutes.map((route, i) => (
                                    <RouteWithSubRoutes key={i} {...route} />
                                ))}
                            </Switch>
                        </ProductProvider>
                    </Col>
                </Row>
            </Container>
        </Router>
    );
}

export default Dashboard;
