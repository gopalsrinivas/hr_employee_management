"use strict";

const now = new Date();

module.exports = {
  async up(queryInterface, Sequelize) {
    const employees = await queryInterface.sequelize.query(
      "SELECT id, salary FROM employees WHERE employee_code IN (:codes)",
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

    const rows = employees.map((employee) => {
      const basicSalary = Number(employee.salary);
      const hra = basicSalary * 0.2;
      const da = basicSalary * 0.1;
      const pf = basicSalary * 0.12;
      const tax = basicSalary * 0.05;
      const netSalary = basicSalary + hra + da - pf - tax;

      return {
        employee_id: employee.id,
        payroll_month: "July",
        payroll_year: 2026,
        basic_salary: basicSalary,
        hra,
        da,
        bonus: 0,
        incentives: 0,
        pf,
        esi: 0,
        tax,
        deductions: 0,
        net_salary: netSalary,
        salary_status: "Pending",
        created_by: adminUser ? adminUser.id : null,
        created_at: now,
        updated_at: now
      };
    });

    await queryInterface.bulkInsert("payroll", rows, { ignoreDuplicates: true });
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("payroll", {
      payroll_month: "July",
      payroll_year: 2026
    });
  }
};
