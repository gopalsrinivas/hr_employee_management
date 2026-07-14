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
    await queryInterface.createTable("employee_exit", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      employee_id: {
        allowNull: false,
        unique: true,
        type: Sequelize.BIGINT,
        references: { model: "employees", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      resignation_date: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      last_working_day: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      reason: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      manager_approval: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      hr_approval: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      asset_returned: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      fnf_completed: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      experience_letter: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      relieving_letter: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      exit_status: {
        allowNull: false,
        defaultValue: "Pending",
        type: Sequelize.STRING(20)
      },
      ...auditColumns(Sequelize)
    });

    await queryInterface.addIndex("employee_exit", ["resignation_date"]);
    await queryInterface.sequelize.query(
      'ALTER TABLE "employee_exit" ADD CONSTRAINT "employee_exit_last_day_valid" CHECK ("last_working_day" >= "resignation_date")'
    );
    await queryInterface.sequelize.query(
      'ALTER TABLE "employee_exit" ADD CONSTRAINT "employee_exit_status_allowed" CHECK ("exit_status" IN (\'Pending\', \'Completed\'))'
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable("employee_exit");
  }
};
