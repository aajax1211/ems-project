import React from 'react';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../utils/dateFormatter';

function EmployeeTable({ employees }) {
  const navigate = useNavigate();

  const handleRowClick = (employeeId) => {
    navigate(`/employee/${employeeId}`);
  };

  return (
    <div className="employee-table">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Date of Joining</th>
            <th>Title</th>
            <th>Department</th>
            <th>Employee Type</th>
            <th>Current Status</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr 
              key={employee.id} 
              onClick={() => handleRowClick(employee.id)}
              style={{ cursor: 'pointer' }}
            >
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.age}</td>
              <td>{formatDate(employee.dateOfJoining)}</td>
              <td>{employee.title}</td>
              <td>{employee.department}</td>
              <td>{employee.employeeType}</td>
              <td>{employee.currentStatus ? 'Active' : 'Inactive'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default EmployeeTable;