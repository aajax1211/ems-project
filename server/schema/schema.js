const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Employee {
    id: ID!
    firstName: String!
    lastName: String!
    dob: String!
    age: Int!
    dateOfJoining: String!
    title: String!
    department: String!
    employeeType: String!
    currentStatus: Boolean!
    retirementCountdown: String!
  }

  type Query {
    employees: [Employee!]!
    employeesByType(employeeType: String!): [Employee!]!
    employee(id: ID!): Employee
    upcomingRetirements: [Employee!]!
  }

  input EmployeeInput {
    firstName: String!
    lastName: String!
    dob: String!
    age: Int!
    dateOfJoining: String!
    title: String!
    department: String!
    employeeType: String!
  }

  input EmployeeUpdateInput {
    title: String
    department: String
    currentStatus: Boolean
  }

  type Mutation {
    createEmployee(input: EmployeeInput!): Employee!
    updateEmployee(id: ID!, input: EmployeeUpdateInput!): Employee!
    deleteEmployee(id: ID!): Boolean!
  }
`;

module.exports = typeDefs;