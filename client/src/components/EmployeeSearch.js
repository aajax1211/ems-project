import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

function EmployeeSearch({ onSearch }) {
  const [filters, setFilters] = useState({
    age: '',
    department: '',
    title: '',
    employeeType: ''
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <Form onSubmit={handleSubmit} className="search-form">
      <Row>
        <Col md={3}>
          <Form.Group>
            <Form.Control
              type="number"
              name="age"
              placeholder="Age"
              value={filters.age}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Group>
            <Form.Control
              as="select"
              name="department"
              value={filters.department}
              onChange={handleChange}
            >
              <option value="">All Departments</option>
              <option value="IT">IT</option>
              <option value="Marketing">Marketing</option>
              <option value="HR">HR</option>
              <option value="Engineering">Engineering</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Group>
            <Form.Control
              as="select"
              name="employeeType"
              value={filters.employeeType}
              onChange={handleChange}
            >
              <option value="">All Types</option>
              <option value="FullTime">Full Time</option>
              <option value="PartTime">Part Time</option>
              <option value="Contract">Contract</option>
              <option value="Seasonal">Seasonal</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={2}>
  <Form.Group>
    <Form.Control
      as="select"
      name="title"
      value={filters.title}
      onChange={handleChange}
    >
      <option value="">All Titles</option>
      <option value="Employee">Employee</option>
      <option value="Manager">Manager</option>
      <option value="Director">Director</option>
      <option value="VP">VP</option>
    </Form.Control>
  </Form.Group>
</Col>
        <Col md={2}>
          <Button type="submit" variant="primary">Search</Button>
        </Col>
      </Row>
    </Form>
  );
}
export default EmployeeSearch;