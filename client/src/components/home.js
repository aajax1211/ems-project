import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import './home.css';
const Home = () => (
    <div className="home-hero">
      <Container className="text-center text-white d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <div>
          <h1 className="display-4 font-weight-bold">Welcome to Employee Management System</h1>
          <p className="lead mt-4">Manage your employees efficiently and effectively with our intuitive platform.</p>
          <Button variant="primary" size="lg" href="/dashboard">
            Get Started
          </Button>
        </div>
      </Container>
  
      <Container className="features-section py-5">
        <h2 className="text-center mb-4">Features</h2>
        <Row>
          <Col md={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body className="text-center">
                <i className="bi bi-people-fill display-4 text-primary mb-3"></i>
                <Card.Title>Employee Directory</Card.Title>
                <Card.Text>
                  Easily manage and search through all employee records in one centralized location.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body className="text-center">
                <i className="bi bi-calendar-check-fill display-4 text-primary mb-3"></i>
                <Card.Title>Employee Details</Card.Title>
                <Card.Text>
                  Keep track of employee details and their status.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body className="text-center">
                <i className="bi bi-bar-chart-fill display-4 text-primary mb-3"></i>
                <Card.Title>Track Upcoming Retirements</Card.Title>
                <Card.Text>
                  Generate detailed performance reports to assess and improve employee productivity.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
  
      <footer className="bg-dark text-white text-center py-3">
        &copy; {new Date().getFullYear()} Employee Management System. All rights reserved.
      </footer>
    </div>
  );
  export default Home;