"use strict";

const auditColumns = (Sequelize) => ({
  created_by: {
    allowNull: true,
    type: Sequelize.INTEGER,
    references: { model: "users", key: "id" },
    onUpdate: "CASCADE",
    onDelete: "SET NULL"
  },
  updated_by: {
    allowNull: true,
    type: Sequelize.INTEGER,
    references: { model: "users", key: "id" },
    onUpdate: "CASCADE",
    onDelete: "SET NULL"
  },
  deleted_by: {
    allowNull: true,
    type: Sequelize.INTEGER,
    references: { model: "users", key: "id" },
    onUpdate: "CASCADE",
    onDelete: "SET NULL"
  },
  created_at: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
  },
  updated_at: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
  },
  deleted_at: {
    allowNull: true,
    type: Sequelize.DATE
  }
});

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("payroll", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      employee_id: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: { model: "employees", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      payroll_month: {
        allowNull: false,
        type: Sequelize.STRING(20)
      },
      payroll_year: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      basic_salary: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.DECIMAL(12, 2)
      },
      hra: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.DECIMAL(12, 2)
      },
      da: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.DECIMAL(12, 2)
      },
      bonus: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.DECIMAL(12, 2)
      },
      incentives: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.DECIMAL(12, 2)
      },
      pf: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.DECIMAL(12, 2)
      },
      esi: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.DECIMAL(12, 2)
      },
      tax: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.DECIMAL(12, 2)
      },
      deductions: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.DECIMAL(12, 2)
      },
      net_salary: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.DECIMAL(12, 2)
      },
      salary_status: {
        allowNull: false,
        defaultValue: "Pending",
        type: Sequelize.STRING(20)
      },
      paid_date: {
        allowNull: true,
        type: Sequelize.DATEONLY
      },
      ...auditColumns(Sequelize)
    });

    await queryInterface.addIndex("payroll", ["payroll_month"]);
    await queryInterface.addIndex("payroll", ["payroll_year"]);
    await queryInterface.addIndex("payroll", ["employee_id", "payroll_month", "payroll_year"], {
      unique: true,
      name: "payroll_employee_month_year_unique"
    });
    await queryInterface.sequelize.query(
      'ALTER TABLE "payroll" ADD CONSTRAINT "payroll_amounts_non_negative" CHECK ("basic_salary" >= 0 AND "hra" >= 0 AND "da" >= 0 AND "bonus" >= 0 AND "incentives" >= 0 AND "pf" >= 0 AND "esi" >= 0 AND "tax" >= 0 AND "deductions" >= 0 AND "net_salary" >= 0)'
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable("payroll");
  }
};
