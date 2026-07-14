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
    await queryInterface.createTable("employees", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      user_id: {
        allowNull: true,
        unique: true,
        type: Sequelize.INTEGER,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },
      employee_code: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(20)
      },
      first_name: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      last_name: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      gender: {
        allowNull: false,
        type: Sequelize.STRING(20)
      },
      dob: {
        allowNull: true,
        type: Sequelize.DATEONLY
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(150)
      },
      mobile: {
        allowNull: true,
        type: Sequelize.STRING(20)
      },
      joining_date: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      department_id: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: { model: "departments", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT"
      },
      designation_id: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: { model: "designations", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT"
      },
      manager_id: {
        allowNull: true,
        type: Sequelize.BIGINT,
        references: { model: "employees", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },
      salary: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.DECIMAL(12, 2)
      },
      status: {
        allowNull: false,
        defaultValue: "Active",
        type: Sequelize.STRING(20)
      },
      ...auditColumns(Sequelize)
    });

    await queryInterface.addIndex("employees", ["employee_code"], { unique: true });
    await queryInterface.addIndex("employees", ["email"], { unique: true });
    await queryInterface.addIndex("employees", ["department_id"]);
    await queryInterface.addIndex("employees", ["designation_id"]);
    await queryInterface.addIndex("employees", ["manager_id"]);
    await queryInterface.addIndex("employees", ["joining_date"]);
    await queryInterface.addIndex("employees", ["department_id", "designation_id"]);
    await queryInterface.sequelize.query(
      'ALTER TABLE "employees" ADD CONSTRAINT "employees_salary_non_negative" CHECK ("salary" >= 0)'
    );
    await queryInterface.sequelize.query(
      'ALTER TABLE "employees" ADD CONSTRAINT "employees_status_allowed" CHECK ("status" IN (\'Active\', \'Exited\'))'
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable("employees");
  }
};
