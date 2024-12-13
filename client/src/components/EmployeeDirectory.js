import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { Row, Col, Alert, Button, ButtonGroup } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeSearch from './EmployeeSearch';
import EmployeeTable from './EmployeeTable';
import EmployeeTypeStats from './EmployeeTypeStats';

const GET_EMPLOYEES = gql`
  query GetEmployees {
    employees {
      id
      firstName
      lastName
      age
      dateOfJoining
      title
      department
      employeeType
      currentStatus
    }
  }
`;

const GET_EMPLOYEES_BY_TYPE = gql`
  query GetEmployeesByType($employeeType: String!) {
    employeesByType(employeeType: $employeeType) {
      id
      firstName
      lastName
      age
      dateOfJoining
      title
      department
      employeeType
      currentStatus
    }
  }
`;

function EmployeeDirectory() {
  const { type } = useParams();
  const navigate = useNavigate();
  const query = type ? GET_EMPLOYEES_BY_TYPE : GET_EMPLOYEES;
  const variables = type ? { employeeType: type } : {};
  
  const { loading, error, data } = useQuery(query, { variables });
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    if (data) {
      const employeeList = type ? data.employeesByType : data.employees;
      setEmployees(employeeList || []);
      setFilteredEmployees(employeeList || []);
    }
  }, [data, type]);

  // Update handleTypeFilter
  const handleTypeFilter = (employeeType) => {
    navigate(employeeType ? `/employees/${employeeType}` : '/employees');
  };

  const handleSearch = (filters) => {
    const filtered = employees.filter(employee => {
      return (
        (!filters.age || employee.age === parseInt(filters.age)) &&
        (!filters.department || employee.department === filters.department) &&
        (!filters.title || employee.title === filters.title) &&
        (!filters.employeeType || employee.employeeType === filters.employeeType)
      );
    });
    setFilteredEmployees(filtered);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Row className="mb-4">
        <Col>
          <ButtonGroup>
            <Button 
              variant={!type ? 'primary' : 'outline-primary'} 
              onClick={() => handleTypeFilter('')}
            >
              All
            </Button>
            <Button 
              variant={type?.toLowerCase() === 'FullTime' ? 'primary' : 'outline-primary'}
              onClick={() => handleTypeFilter('FullTime')}
            >
              Full Time
            </Button>
            <Button 
              variant={type?.toLowerCase() === 'PartTime' ? 'primary' : 'outline-primary'}
              onClick={() => handleTypeFilter('PartTime')}
            >
              Part Time
            </Button>
            <Button 
              variant={type === 'contract' ? 'primary' : 'outline-primary'}
              onClick={() => handleTypeFilter('Contract')}
            >
              Contract
            </Button>
            <Button 
              variant={type === 'seasonal' ? 'primary' : 'outline-primary'}
              onClick={() => handleTypeFilter('Seasonal')}
            >
              Seasonal
            </Button>
          </ButtonGroup>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <EmployeeTypeStats employees={filteredEmployees} />
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <EmployeeSearch onSearch={handleSearch} />
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Button variant="primary" onClick={() => navigate('/create')}>
            Add New Employee
          </Button>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <small className="text-muted">
            Showing {filteredEmployees.length} employees 
            {type ? ` (${type.charAt(0).toUpperCase() + type.slice(1)})` : ''}
          </small>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <EmployeeTable employees={filteredEmployees} />
        </Col>
      </Row>

      {error && <Alert variant="danger">{error.message}</Alert>}
    </div>
  );
}

export default EmployeeDirectory;