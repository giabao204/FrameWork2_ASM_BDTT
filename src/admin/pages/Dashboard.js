import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';


const Dashboard = () => {
  return (
    <div>
      <h1 className="my-4">Dashboard</h1>
      <Row>
        <Col md={6} lg={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Projects</Card.Title>
              <Card.Text>30 done this month</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Orders Overview</Card.Title>
              <Card.Text>$2400, Design changes</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
