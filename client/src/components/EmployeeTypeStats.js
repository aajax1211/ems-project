import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

function EmployeeTypeStats({ employees }) {
  const counts = {
    total: employees.length,
    fulltime: employees.filter(e => e.employeeType === 'FullTime').length,
    parttime: employees.filter(e => e.employeeType === 'PartTime').length,
    contract: employees.filter(e => e.employeeType === 'Contract').length,
    seasonal: employees.filter(e => e.employeeType === 'Seasonal').length
  };

  return (
    <Row className="mb-4">
      <Col>
        <Card className="text-center">
          <Card.Body>
            <Row>
              <Col>
                <h6>Total</h6>
                <strong>{counts.total}</strong>
              </Col>
              <Col>
                <h6>Full Time</h6>
                <strong>{counts.fulltime}</strong>
              </Col>
              <Col>
                <h6>Part Time</h6>
                <strong>{counts.parttime}</strong>
              </Col>
              <Col>
                <h6>Contract</h6>
                <strong>{counts.contract}</strong>
              </Col>
              <Col>
                <h6>Seasonal</h6>
                <strong>{counts.seasonal}</strong>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default EmployeeTypeStats;