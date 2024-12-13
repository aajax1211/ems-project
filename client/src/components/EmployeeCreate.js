import React, {useState} from 'react';
import {useMutation} from '@apollo/client';
import {gql} from '@apollo/client';
import {Form, Button, Alert} from 'react-bootstrap';

const CREATE_EMPLOYEE = gql `
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
      dob
    }
  }
`;

const GET_EMPLOYEES = gql `
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

const GET_UPCOMING_RETIREMENTS = gql`
  query GetUpcomingRetirements {
    upcomingRetirements {
      id
      firstName
      lastName
      age
      dateOfJoining
      employeeType
    }
  }
`;


function EmployeeCreate() {
    const [successMessage,
        setSuccessMessage] = useState('');
    const [createEmployee] = useMutation(CREATE_EMPLOYEE, {
      refetchQueries: [{ query: GET_UPCOMING_RETIREMENTS }],  // Refetch the upcoming retirements query after mutation
  onError: (err) => {
    console.error("Error creating employee:", err);
  },
        update(cache, {data: {
                createEmployee
            }}) {
            try {
                // Read the current list of employees from the cache
                const {employees} = cache.readQuery({query: GET_EMPLOYEES}) || {
                    employees: []
                };
                

                // Write the new list of employees back to the cache, adding the new employee
                cache.writeQuery({
                    query: GET_EMPLOYEES,
                    data: {
                        employees: [
                            ...employees,
                            createEmployee
                        ]
                    }
                });
            } catch (error) {
                console.error("Error updating cache: ", error);
            }
        }
    });

    const [employee,
        setEmployee] = useState({
        firstName: '',
        lastName: '',
        age: '',
        dob: '', 
        dateOfJoining: '',
        title: '',
        department: '',
        employeeType: ''
    });

    const [errors,
        setErrors] = useState({});
    const [errorMessage,
        setErrorMessage] = useState('');

        // Function to calculate age based on the date of birth
    const calculateAge = (dob) => {
      const birthDate = new Date(dob);
      const currentDate = new Date();
      let age = currentDate.getFullYear() - birthDate.getFullYear();
      const monthDifference = currentDate.getMonth() - birthDate.getMonth();
      if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())) {
          age--;
      }
      return age;
  };

    // Whenever dob changes, update age automatically
    const handleChange = (e) => {
      const { name, value } = e.target;
      setEmployee((prevState) => {
          const updatedEmployee = { ...prevState, [name]: value };
          // If dob changes, calculate age
          if (name === 'dob' && value) {
              updatedEmployee.age = calculateAge(value);
          }
          return updatedEmployee;
      });
      setErrors({
          ...errors,
          [name]: ''
      });
  };

    const validateForm = () => {
        const newErrors = {};
        Object
            .keys(employee)
            .forEach(key => {
                if (!employee[key] && key !== 'dob') {
                    newErrors[key] = `${key
                        .charAt(0)
                        .toUpperCase() + key.slice(1)} is required`;
                }
            });

            // Validate DOB
        if (employee.dob && isNaN(new Date(employee.dob))) {
          newErrors.dob = 'Please enter a valid date of birth';
      }
        if (employee.age) {
            const age = parseInt(employee.age, 10);
            if (isNaN(age) || age < 20 || age > 70) {
                newErrors.age = 'Age must be between 20 and 70';
            }
        }

        setErrors(newErrors);
        return Object
            .keys(newErrors)
            .length === 0;
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (validateForm()) {
            try {

              console.log('Employee data:', employee);

                await createEmployee({
                    variables: {
                        input: {
                            ...employee,
                            age: parseInt(employee.age, 10),
                            dob: employee.dob
                        }
                    }
                });
                setErrorMessage('');
                setSuccessMessage('Employee created successfully!');
                setEmployee({
                    firstName: '',
                    lastName: '',
                    age: '',
                    dob: '',
                    dateOfJoining: '',
                    title: '',
                    department: '',
                    employeeType: ''
                });
            } catch (err) {
                setErrorMessage('Error creating employee. Please try again.');
                setSuccessMessage('');
                console.error(err);
            }
        }
    };

    return (
        <Form onSubmit={handleSubmit} className="employee-form">
            <h3 className="mb-3">Add New Employee</h3>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            {/* Form Fields */}
            <Form.Group>
            <Form.Label>First Name</Form.Label>
                <Form.Control
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={employee.firstName}
                    onChange={handleChange}
                    isInvalid={!!errors.firstName}/>
                <Form.Control.Feedback type="invalid">
                    {errors.firstName}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
            <Form.Label>Last Name</Form.Label>
                <Form.Control
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={employee.lastName}
                    onChange={handleChange}
                    isInvalid={!!errors.lastName}/>
                <Form.Control.Feedback type="invalid">
                    {errors.lastName}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
            <Form.Label>Age</Form.Label>
                <Form.Control
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={employee.age}
                    onChange={handleChange}
                    min="20"
                    max="70"
                    readOnly
                    isInvalid={!!errors.age}/>
                <Form.Control.Feedback type="invalid">
                    {errors.age}
                </Form.Control.Feedback>
            </Form.Group>

            {/* New DOB field */}
            <Form.Group>
            <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                    type="date"
                    name="dob"
                    value={employee.dob}
                    onChange={handleChange}
                    isInvalid={!!errors.dob} />
                <Form.Control.Feedback type="invalid">
                    {errors.dob}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
            <Form.Label>Date of Joining</Form.Label>
                <Form.Control
                    type="date"
                    name="dateOfJoining"
                    value={employee.dateOfJoining}
                    onChange={handleChange}
                    isInvalid={!!errors.dateOfJoining}/>
                <Form.Control.Feedback type="invalid">
                    {errors.dateOfJoining}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
            <Form.Label>Title</Form.Label>
                <Form.Control
                    as="select"
                    name="title"
                    value={employee.title}
                    onChange={handleChange}
                    isInvalid={!!errors.title}>
                    <option value="">Select Title</option>
                    <option value="Employee">Employee</option>
                    <option value="Manager">Manager</option>
                    <option value="Director">Director</option>
                    <option value="VP">VP</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                    {errors.title}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
            <Form.Label>Department</Form.Label>
                <Form.Control
                    as="select"
                    name="department"
                    value={employee.department}
                    onChange={handleChange}
                    isInvalid={!!errors.department}>
                    <option value="">Select Department</option>
                    <option value="IT">IT</option>
                    <option value="Marketing">Marketing</option>
                    <option value="HR">HR</option>
                    <option value="Engineering">Engineering</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                    {errors.department}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
            <Form.Label>Employee Type</Form.Label>
                <Form.Control
                    as="select"
                    name="employeeType"
                    value={employee.employeeType}
                    onChange={handleChange}
                    isInvalid={!!errors.employeeType}>
                    <option value="">Select Employee Type</option>
                    <option value="FullTime">Full Time</option>
                    <option value="PartTime">Part Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Seasonal">Seasonal</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                    {errors.employeeType}
                </Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" variant="primary" block>Create Employee</Button>
        </Form>
    );
}

export default EmployeeCreate;