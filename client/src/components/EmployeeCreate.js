import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function EmployeeCreate({ onCreate }) {
  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    age: '',
    dateOfJoining: '',
    title: '',
    department: '',
    employeeType: '',
  });

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    // Add your validation logic here
    return true; // Return true if valid, false otherwise
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newEmployee = {
        ...employee,
        age: parseInt(employee.age, 10) // Ensure age is sent as a number
      };
      onCreate(newEmployee);
      setEmployee({
        firstName: '',
        lastName: '',
        age: '',
        dateOfJoining: '',
        title: '',
        department: '',
        employeeType: '',
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="employee-form">
      <h3 className="mb-3">Add New Employee</h3>
      <Form.Group>
        <Form.Control
          type="text"
          name="firstName"
          placeholder="First Name"
          value={employee.firstName}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={employee.lastName}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="number"
          name="age"
          placeholder="Age"
          value={employee.age}
          onChange={handleChange}
          min="20"
          max="70"
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="date"
          name="dateOfJoining"
          value={employee.dateOfJoining}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          as="select"
          name="title"
          value={employee.title}
          onChange={handleChange}
          required
        >
          <option value="">Select Title</option>
          <option value="Employee">Employee</option>
          <option value="Manager">Manager</option>
          <option value="Director">Director</option>
          <option value="VP">VP</option>
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Control
          as="select"
          name="department"
          value={employee.department}
          onChange={handleChange}
          required
        >
          <option value="">Select Department</option>
          <option value="IT">IT</option>
          <option value="Marketing">Marketing</option>
          <option value="HR">HR</option>
          <option value="Engineering">Engineering</option>
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Control
          as="select"
          name="employeeType"
          value={employee.employeeType}
          onChange={handleChange}
          required
        >
          <option value="">Select Employee Type</option>
          <option value="FullTime">Full Time</option>
          <option value="PartTime">Part Time</option>
          <option value="Contract">Contract</option>
          <option value="Seasonal">Seasonal</option>
        </Form.Control>
      </Form.Group>
      <Button type="submit" variant="primary" block>Create Employee</Button>
    </Form>
  );
}

export default EmployeeCreate;