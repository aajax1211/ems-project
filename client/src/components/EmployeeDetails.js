import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import { Card, Button, Form, Alert } from 'react-bootstrap';
import { formatDate } from '../utils/dateFormatter';

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

const GET_EMPLOYEE = gql`
  query GetEmployee($id: ID!) {
    employee(id: $id) {
      id
      firstName
      lastName
      age
      dob
      dateOfJoining
      title
      department
      employeeType
      currentStatus
      retirementCountdown
    }
  }
`;

const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($id: ID!, $input: EmployeeUpdateInput!) {
    updateEmployee(id: $id, input: $input) {
      id
      title
      department
      currentStatus
    }
  }
`;

const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id)
  }
`;

function EmployeeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const { loading, error, data } = useQuery(GET_EMPLOYEE, {
    variables: { id }
  });

  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE);
  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
    update(cache) {
        cache.evict({ id: `Employee:${id}` });
        cache.gc();
        // Also update the employees list query
        try {
          const { employees } = cache.readQuery({ query: GET_EMPLOYEES });
          cache.writeQuery({
            query: GET_EMPLOYEES,
            data: {
              employees: employees.filter(e => e.id !== id)
            }
          });
        } catch (error) {
          console.error("Error updating cache:", error);
        }
      }
    });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const employee = data.employee;

  const handleUpdate = async (field, value) => {
    try {
      await updateEmployee({
        variables: {
          id,
          input: { [field]: value }
        }
      });
      setMessage({ type: 'success', text: 'Employee updated successfully!' });
    } catch (err) {
      setMessage({ type: 'danger', text: 'Error updating employee' });
    }
  };
  

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await deleteEmployee({
          variables: { id }
        });
        navigate('/employees');
      } catch (err) {
        const errorMessage = err.message.includes("CAN’T DELETE EMPLOYEE – STATUS ACTIVE")
        ? "CAN’T DELETE EMPLOYEE – STATUS ACTIVE"
        : `Error deleting employee: ${err.message}`;
        setMessage({ type: 'danger', text: errorMessage });
      }
    }
  };

  return (
    <Card>
      <Card.Header>Employee Details</Card.Header>
      <Card.Body>
        {message.text && (
          <Alert variant={message.type} dismissible onClose={() => setMessage({ type: '', text: '' })}>
            {message.text}
          </Alert>
        )}
        
        <Card.Title>{`${employee.firstName} ${employee.lastName}`}</Card.Title>
        <Card.Text as="div">
          <p><strong>Age:</strong> {employee.age}</p>
          <p><strong>Date of Joining:</strong>{formatDate(employee.dateOfJoining)}</p>
          <p><strong>Employee Type:</strong> {employee.employeeType}</p>
          <p><strong>Retirement Countdown:</strong> {employee.retirementCountdown}</p>
          
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Select
              value={employee.title}
              onChange={(e) => handleUpdate('title', e.target.value)}
            >
              <option value="Employee">Employee</option>
              <option value="Manager">Manager</option>
              <option value="Director">Director</option>
              <option value="VP">VP</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Department</Form.Label>
            <Form.Select
              value={employee.department}
              onChange={(e) => handleUpdate('department', e.target.value)}
            >
              <option value="IT">IT</option>
              <option value="Marketing">Marketing</option>
              <option value="HR">HR</option>
              <option value="Engineering">Engineering</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="switch"
              label="Current Status"
              checked={employee.currentStatus}
              onChange={(e) => handleUpdate('currentStatus', e.target.checked)}
            />
          </Form.Group>
        </Card.Text>
        
        <Button variant="danger" onClick={handleDelete}>Delete Employee</Button>
        <Button variant="secondary" className="ms-2" onClick={() => navigate('/employees')}>
          Back to Directory
        </Button>
      </Card.Body>
    </Card>
  );
}

export default EmployeeDetails;