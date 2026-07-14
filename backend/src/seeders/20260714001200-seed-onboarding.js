"use strict";

const now = new Date();

module.exports = {
  async up(queryInterface, Sequelize) {
    const employees = await queryInterface.sequelize.query(
      "SELECT id, joining_date FROM employees WHERE employee_code IN (:codes)",
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
      joining_date: employee.joining_date,
      documents_verified: true,
      induction_completed: true,
      laptop_allocated: true,
      email_created: true,
      id_card_generated: true,
      welcome_kit_issued: true,
      onboarding_status: "Completed",
      created_by: adminUser ? adminUser.id : null,
      created_at: now,
      updated_at: now
    }));

    await queryInterface.bulkInsert("onboarding", rows, { ignoreDuplicates: true });
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("onboarding", {
      onboarding_status: "Completed"
    });
  }
};
