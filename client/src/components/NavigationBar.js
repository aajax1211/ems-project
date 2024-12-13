import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function NavigationBar() {
  const navigate = useNavigate();

  const handleEmployeeTypeSelect = (type) => {
    navigate(`/employees/${type}`);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Navbar.Brand as={Link} to="/">Employee Management System</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <NavDropdown title="Employees" id="employee-nav-dropdown">
            <NavDropdown.Item as={Link} to="/employees">All Employees</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => handleEmployeeTypeSelect('FullTime')}>
              Full Time
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => handleEmployeeTypeSelect('PartTime')}>
              Part Time
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => handleEmployeeTypeSelect('Contract')}>
              Contract
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => handleEmployeeTypeSelect('Seasonal')}>
              Seasonal
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link as={Link} to="/create">Add Employee</Nav.Link>
          <Nav.Link as={Link} to="/upcoming-retirements">Upcoming Retirements</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;