"use strict";

const now = new Date();

const findOne = async (queryInterface, Sequelize, sql, replacements) => {
  const [row] = await queryInterface.sequelize.query(sql, {
    replacements,
    type: Sequelize.QueryTypes.SELECT
  });

  return row || null;
};

module.exports = {
  async up(queryInterface, Sequelize) {
    const adminUser = await findOne(
      queryInterface,
      Sequelize,
      "SELECT id FROM users WHERE email = :email LIMIT 1",
      { email: "admin@example.com" }
    );
    const itDepartment = await findOne(
      queryInterface,
      Sequelize,
      "SELECT id FROM departments WHERE department_name = :name LIMIT 1",
      { name: "IT" }
    );
    const hrDepartment = await findOne(
      queryInterface,
      Sequelize,
      "SELECT id FROM departments WHERE department_name = :name LIMIT 1",
      { name: "HR" }
    );
    const financeDepartment = await findOne(
      queryInterface,
      Sequelize,
      "SELECT id FROM departments WHERE department_name = :name LIMIT 1",
      { name: "Finance" }
    );
    const teamLead = await findOne(
      queryInterface,
      Sequelize,
      "SELECT id FROM designations WHERE designation_name = :name LIMIT 1",
      { name: "Team Lead" }
    );
    const softwareEngineer = await findOne(
      queryInterface,
      Sequelize,
      "SELECT id FROM designations WHERE designation_name = :name LIMIT 1",
      { name: "Software Engineer" }
    );
    const seniorSoftwareEngineer = await findOne(
      queryInterface,
      Sequelize,
      "SELECT id FROM designations WHERE designation_name = :name LIMIT 1",
      { name: "Senior Software Engineer" }
    );
    const hrExecutive = await findOne(
      queryInterface,
      Sequelize,
      "SELECT id FROM designations WHERE designation_name = :name LIMIT 1",
      { name: "HR Executive" }
    );
    const accountant = await findOne(
      queryInterface,
      Sequelize,
      "SELECT id FROM designations WHERE designation_name = :name LIMIT 1",
      { name: "Accountant" }
    );

    const createdBy = adminUser ? adminUser.id : null;

    await queryInterface.bulkInsert(
      "employees",
      [
        {
          employee_code: "EMP001",
          first_name: "Arjun",
          last_name: "Mehta",
          gender: "Male",
          dob: "1990-04-12",
          email: "arjun.mehta@example.com",
          mobile: "9000000001",
          joining_date: "2021-01-15",
          department_id: itDepartment.id,
          designation_id: teamLead.id,
          salary: 120000,
          status: "Active",
          created_by: createdBy,
          created_at: now,
          updated_at: now
        }
      ],
      { ignoreDuplicates: true }
    );

    const manager = await findOne(
      queryInterface,
      Sequelize,
      "SELECT id FROM employees WHERE employee_code = :employeeCode LIMIT 1",
      { employeeCode: "EMP001" }
    );

    await queryInterface.bulkInsert(
      "employees",
      [
        {
          employee_code: "EMP002",
          first_name: "Nisha",
          last_name: "Rao",
          gender: "Female",
          dob: "1994-08-20",
          email: "nisha.rao@example.com",
          mobile: "9000000002",
          joining_date: "2022-03-01",
          department_id: itDepartment.id,
          designation_id: seniorSoftwareEngineer.id,
          manager_id: manager.id,
          salary: 95000,
          status: "Active",
          created_by: createdBy,
          created_at: now,
          updated_at: now
        },
        {
          employee_code: "EMP003",
          first_name: "Kabir",
          last_name: "Khan",
          gender: "Male",
          dob: "1996-11-09",
          email: "kabir.khan@example.com",
          mobile: "9000000003",
          joining_date: "2023-06-10",
          department_id: itDepartment.id,
          designation_id: softwareEngineer.id,
          manager_id: manager.id,
          salary: 70000,
          status: "Active",
          created_by: createdBy,
          created_at: now,
          updated_at: now
        },
        {
          employee_code: "EMP004",
          first_name: "Priya",
          last_name: "Iyer",
          gender: "Female",
          dob: "1992-02-18",
          email: "priya.iyer@example.com",
          mobile: "9000000004",
          joining_date: "2020-09-21",
          department_id: hrDepartment.id,
          designation_id: hrExecutive.id,
          salary: 65000,
          status: "Active",
          created_by: createdBy,
          created_at: now,
          updated_at: now
        },
        {
          employee_code: "EMP005",
          first_name: "Rohan",
          last_name: "Shah",
          gender: "Male",
          dob: "1991-12-05",
          email: "rohan.shah@example.com",
          mobile: "9000000005",
          joining_date: "2019-07-01",
          department_id: financeDepartment.id,
          designation_id: accountant.id,
          salary: 80000,
          status: "Active",
          created_by: createdBy,
          created_at: now,
          updated_at: now
        }
      ],
      { ignoreDuplicates: true }
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("employees", {
      employee_code: ["EMP001", "EMP002", "EMP003", "EMP004", "EMP005"]
    });
  }
};
