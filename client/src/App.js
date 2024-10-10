import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import EmployeeDirectory from './components/EmployeeDirectory';

function App() {
  return (
    <Container className="app-container">
      <Row>
        <Col>
          <h1 className="text-center my-4">Employee Management System</h1>
          <EmployeeDirectory />
        </Col>
      </Row>
    </Container>
  );
}

export default App;