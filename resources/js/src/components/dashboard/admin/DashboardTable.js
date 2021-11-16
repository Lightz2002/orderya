import React from "react";
import { Table, Container, Row } from "react-bootstrap";

function DashboardTable({ header, body }) {
    return (
        <Container className="p-0">
            <Row>
                <Table responsive="md" striped hover className="mt-5 fs-3">
                    <thead className="bg-primary text-light">
                        <tr>
                            {header.map((head, i) => (
                                <th key={i} className="p-4">
                                    {head}
                                </th>
                            ))}
                            <th className="p-4">Control</th>
                        </tr>
                    </thead>
                    <tbody>{body}</tbody>
                </Table>
            </Row>
        </Container>
    );
}

export default DashboardTable;
