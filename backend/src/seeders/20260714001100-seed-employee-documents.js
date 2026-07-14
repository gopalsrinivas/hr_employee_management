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
      document_type: "Resume",
      document_number: `${employee.employee_code}-RESUME`,
      file_name: `${employee.employee_code.toLowerCase()}-resume.pdf`,
      original_name: `${employee.employee_code}-resume.pdf`,
      file_path: `uploads/documents/${employee.employee_code.toLowerCase()}-resume.pdf`,
      file_size: 102400,
      uploaded_by: adminUser ? adminUser.id : null,
      uploaded_at: now,
      created_by: adminUser ? adminUser.id : null,
      created_at: now,
      updated_at: now
    }));

    await queryInterface.bulkInsert("employee_documents", rows, { ignoreDuplicates: true });
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("employee_documents", {
      document_type: "Resume"
    });
  }
};
