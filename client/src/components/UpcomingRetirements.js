import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Table, Alert } from 'react-bootstrap';
import { formatDate } from '../utils/dateFormatter';

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

function UpcomingRetirements() {
  const { loading, error, data } = useQuery(GET_UPCOMING_RETIREMENTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <Alert variant="danger">Error: {error.message}</Alert>;

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Age</th>
          <th>Date of Joining</th>
          <th>Employee Type</th>
        </tr>
      </thead>
      <tbody>
        {data.upcomingRetirements.map((employee, index) => (
          <tr key={employee.id}>
            <td>{index + 1}</td>
            <td>{employee.firstName}</td>
            <td>{employee.lastName}</td>
            <td>{employee.age}</td>
            <td>{formatDate(employee.dateOfJoining)}</td>
            <td>{employee.employeeType}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default UpcomingRetirements;
