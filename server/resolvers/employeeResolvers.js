const Employee = require('../models/Employee');

const resolvers = {
  Query: {
    employees: async () => {
      return await Employee.find();
    },
    employeesByType: async (_, { employeeType }) => {
      return await Employee.find({ employeeType });
    },
    employee: async (_, { id }) => {
      const employee = await Employee.findById(id);
      
      if (!employee) throw new Error('Employee not found');

      // Calculate the retirement date based on dob
      const currentDate = new Date();
      const retirementAge = 65;
      const dob = new Date(employee.dob);
      const retirementDate = new Date(dob.getFullYear() + retirementAge, dob.getMonth(), dob.getDate());

      // Calculate remaining time
const timeRemaining = retirementDate - currentDate;
const daysRemaining = Math.ceil(timeRemaining / (1000 * 3600 * 24)); // Convert time to days

// Calculate years, months, and days
const yearsRemaining = Math.floor(daysRemaining / 365); // Whole years
const remainingDaysAfterYears = daysRemaining % 365; // Days left after extracting years
const monthsRemaining = Math.floor(remainingDaysAfterYears / 30); // Approximate months
const remainingDays = remainingDaysAfterYears % 30; // Remaining days after extracting months

// Format countdown message
employee.retirementCountdown = `${remainingDays} days, ${monthsRemaining} months, ${yearsRemaining} years`;
return employee;

      return employee;
    },
    upcomingRetirements: async () => {
    try {
      const currentDate = new Date();
      const sixMonthsFromNow = new Date();
      sixMonthsFromNow.setMonth(currentDate.getMonth() + 6);

      const retirementAge = 65;

      const employees = await Employee.find();
      return employees.filter((employee) => {
        // Parse the dob (Date of Birth) into a Date object
        const dob = new Date(employee.dob);

        // Check if dob is valid
      if (isNaN(dob)) {
        console.log(`Invalid dob for employee ${employee.firstName} ${employee.lastName}: ${employee.dob}`);
        return false;  // Skip this employee if dob is invalid
      }
        // Calculate the retirement date
        const retirementDate = new Date(dob.getFullYear() + retirementAge, dob.getMonth(), dob.getDate());

        // Log retirement date for each employee
      console.log(`Retirement date for ${employee.firstName} ${employee.lastName}: ${retirementDate}`);

        // Check if the retirement date is within the next 6 months
        return (
          retirementDate >= currentDate && retirementDate <= sixMonthsFromNow
        );
      });
    } catch (error) {
      throw new Error('Failed to fetch upcoming retirements');
    }
  }
}, Mutation: {
    createEmployee: async (_, { input }) => {
      try {
        const employee = new Employee({
          ...input,
          currentStatus: true
        });
        await employee.save();
        return employee;
      } catch (error) {
        throw new Error('Failed to create employee');
      }
    },
    updateEmployee: async (_, { id, input }) => {
      try {
        const employee = await Employee.findByIdAndUpdate(
          id,
          { $set: input },
          { new: true }
        );
        if (!employee) throw new Error('Employee not found');
        return employee;
      } catch (error) {
        throw new Error('Failed to update employee');
      }
    },
    deleteEmployee: async (_, { id }) => {
      try {
        const employee = await Employee.findById(id);
        if (!employee) {
          throw new Error('Employee not found');
        }

        if (employee.currentStatus) {
          throw new Error("CAN’T DELETE EMPLOYEE – STATUS ACTIVE");
        }
        const result = await Employee.findByIdAndDelete(id);
        return !!result;
      } catch (error) {
        throw new Error(error.message);
      }
    }
  }
};

module.exports = resolvers;