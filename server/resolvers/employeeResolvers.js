const Employee = require('../models/Employee');

const resolvers = {
  Query: {
    employees: async () => {
      return await Employee.find();
    },
  },
  Mutation: {
    createEmployee: async (_, { input }) => {
      try {
        const employee = new Employee({
          ...input,
          currentStatus: true // Set default value
        });
        await employee.save();
        return employee;
      } catch (error) {
        console.error('Error creating employee:', error);
        throw new Error('Failed to create employee');
      }
    },
  },
};

module.exports = resolvers;