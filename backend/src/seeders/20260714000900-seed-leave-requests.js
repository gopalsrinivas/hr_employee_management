"use strict";

const now = new Date();

module.exports = {
  async up(queryInterface, Sequelize) {
    const [employee] = await queryInterface.sequelize.query(
      "SELECT id FROM employees WHERE employee_code = :employeeCode LIMIT 1",
      {
        replacements: { employeeCode: "EMP003" },
        type: Sequelize.QueryTypes.SELECT
      }
    );
    const [adminUser] = await queryInterface.sequelize.query(
      "SELECT id FROM users WHERE email = :email LIMIT 1",
      {
        replacements: { email: "admin@example.com" },
        type: Sequelize.QueryTypes.SELECT
      }
    );

    if (!employee) {
      return;
    }

    await queryInterface.bulkInsert(
      "leave_requests",
      [
        {
          employee_id: employee.id,
          leave_type: "Casual Leave",
          from_date: "2026-07-20",
          to_date: "2026-07-21",
          total_days: 2,
          reason: "Personal work",
          applied_date: "2026-07-14",
          status: "Pending",
          created_by: adminUser ? adminUser.id : null,
          created_at: now,
          updated_at: now
        }
      ],
      { ignoreDuplicates: true }
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("leave_requests", {
      leave_type: "Casual Leave",
      from_date: "2026-07-20",
      to_date: "2026-07-21"
    });
  }
};
