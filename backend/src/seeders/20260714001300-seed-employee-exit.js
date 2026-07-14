"use strict";

const now = new Date();

module.exports = {
  async up(queryInterface, Sequelize) {
    const [employee] = await queryInterface.sequelize.query(
      "SELECT id FROM employees WHERE employee_code = :employeeCode LIMIT 1",
      {
        replacements: { employeeCode: "EMP005" },
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
      "employee_exit",
      [
        {
          employee_id: employee.id,
          resignation_date: "2026-07-01",
          last_working_day: "2026-07-31",
          reason: "Career opportunity",
          manager_approval: true,
          hr_approval: false,
          asset_returned: false,
          fnf_completed: false,
          experience_letter: false,
          relieving_letter: false,
          exit_status: "Pending",
          created_by: adminUser ? adminUser.id : null,
          created_at: now,
          updated_at: now
        }
      ],
      { ignoreDuplicates: true }
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("employee_exit", {
      resignation_date: "2026-07-01"
    });
  }
};
