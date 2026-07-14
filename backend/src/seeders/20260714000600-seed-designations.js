"use strict";

const now = new Date();

const findDepartmentId = async (queryInterface, Sequelize, departmentName) => {
  const [department] = await queryInterface.sequelize.query(
    "SELECT id FROM departments WHERE department_name = :departmentName LIMIT 1",
    {
      replacements: { departmentName },
      type: Sequelize.QueryTypes.SELECT
    }
  );

  return department ? department.id : null;
};

module.exports = {
  async up(queryInterface, Sequelize) {
    const hrDepartmentId = await findDepartmentId(queryInterface, Sequelize, "HR");
    const itDepartmentId = await findDepartmentId(queryInterface, Sequelize, "IT");
    const financeDepartmentId = await findDepartmentId(queryInterface, Sequelize, "Finance");

    const rows = [
      {
        department_id: itDepartmentId,
        designation_name: "Software Engineer",
        description: "Builds and maintains software systems.",
        status: true,
        created_at: now,
        updated_at: now
      },
      {
        department_id: itDepartmentId,
        designation_name: "Senior Software Engineer",
        description: "Leads complex software development tasks.",
        status: true,
        created_at: now,
        updated_at: now
      },
      {
        department_id: itDepartmentId,
        designation_name: "Team Lead",
        description: "Leads delivery and engineering teams.",
        status: true,
        created_at: now,
        updated_at: now
      },
      {
        department_id: hrDepartmentId,
        designation_name: "HR Executive",
        description: "Handles HR operations.",
        status: true,
        created_at: now,
        updated_at: now
      },
      {
        department_id: hrDepartmentId,
        designation_name: "HR Manager",
        description: "Manages HR teams and policies.",
        status: true,
        created_at: now,
        updated_at: now
      },
      {
        department_id: financeDepartmentId,
        designation_name: "Accountant",
        description: "Maintains accounts and financial records.",
        status: true,
        created_at: now,
        updated_at: now
      }
    ].filter((row) => row.department_id);

    await queryInterface.bulkInsert("designations", rows, { ignoreDuplicates: true });
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("designations", {
      designation_name: [
        "Software Engineer",
        "Senior Software Engineer",
        "Team Lead",
        "HR Executive",
        "HR Manager",
        "Accountant"
      ]
    });
  }
};
