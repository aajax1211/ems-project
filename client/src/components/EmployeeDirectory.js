import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import { Row, Col, Alert } from 'react-bootstrap';
import EmployeeSearch from './EmployeeSearch';
import EmployeeTable from './EmployeeTable';
import EmployeeCreate from './EmployeeCreate';

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

const CREATE_EMPLOYEE = gql`
  mutation CreateEmployee($input: EmployeeInput!) {
    createEmployee(input: $input) {
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
  const { loading, error, data } = useQuery(GET_EMPLOYEES);
  const [createEmployee] = useMutation(CREATE_EMPLOYEE);
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    if (data) {
      setEmployees(data.employees);
      setFilteredEmployees(data.employees);
    }
  }, [data]);

  const handleSearch = (filters) => {
    const filtered = employees.filter(employee => {
      return (
        (!filters.age || employee.age === parseInt(filters.age)) &&
        (!filters.department || employee.department === filters.department) &&
        (!filters.title || employee.title === filters.title)
      );
    });
    setFilteredEmployees(filtered);
  };

  const handleCreate = async (newEmployee) => {
    try {
      const { data } = await createEmployee({ variables: { input: newEmployee } });
      setEmployees([...employees, data.createEmployee]);
      setFilteredEmployees([...filteredEmployees, data.createEmployee]);
    } catch (err) {
      console.error('Error creating employee:', err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Row className="mb-4">
        <Col>
          <EmployeeSearch onSearch={handleSearch} />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={8}>
          <EmployeeTable employees={filteredEmployees} />
        </Col>
        <Col md={4}>
          <EmployeeCreate onCreate={handleCreate} />
        </Col>
      </Row>
      {error && <Alert variant="danger">{error.message}</Alert>}
    </div>
  );
}

export default EmployeeDirectory;