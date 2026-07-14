"use strict";

const now = new Date();

module.exports = {
  async up(queryInterface, Sequelize) {
    const employees = await queryInterface.sequelize.query(
      "SELECT id, employee_code FROM employees WHERE employee_code IN (:codes)",
      {
        replacements: { codes: ["EMP001", "EMP002", "EMP003", "EMP004", "EMP005"] },
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

    const rows = employees.map((employee) => ({
      employee_id: employee.id,
      attendance_date: "2026-07-14",
      check_in: "09:30:00",
      check_out: "18:30:00",
      working_hours: 9,
      status: "Present",
      created_by: adminUser ? adminUser.id : null,
      created_at: now,
      updated_at: now
    }));

    await queryInterface.bulkInsert("attendance", rows, { ignoreDuplicates: true });
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("attendance", {
      attendance_date: "2026-07-14"
    });
  }
};
