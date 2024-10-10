import React from 'react';
import { Table } from 'react-bootstrap';

function EmployeeTable({ employees }) {
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
            <tr key={employee.id}>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.age}</td>
              <td>{new Date(employee.dateOfJoining).toLocaleDateString()}</td>
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