import React from "react";
import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";
import DashboardContent from "./DashboardContent";
import { Container, Row, Col } from "react-bootstrap";

function Dashboard() {
    return (
        <Container fluid className="p-0 vw-100">
            <Row className="w-100 p-0 m-0">
                <Col xs={3} lg={2} className="p-0 mw-100">
                    <DashboardSidebar />
                </Col>
                <Col xs={9} lg={10}>
                    <DashboardNavbar />
                    <DashboardContent />
                </Col>
            </Row>
        </Container>
    );
}

export default Dashboard;
