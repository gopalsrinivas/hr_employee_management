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
    await queryInterface.createTable("leave_requests", {
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
      leave_type: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      from_date: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      to_date: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      total_days: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      reason: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      applied_date: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      approved_by: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },
      approved_date: {
        allowNull: true,
        type: Sequelize.DATE
      },
      status: {
        allowNull: false,
        defaultValue: "Pending",
        type: Sequelize.STRING(20)
      },
      remarks: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      ...auditColumns(Sequelize)
    });

    await queryInterface.addIndex("leave_requests", ["employee_id"]);
    await queryInterface.addIndex("leave_requests", ["employee_id", "status"]);
    await queryInterface.sequelize.query(
      'ALTER TABLE "leave_requests" ADD CONSTRAINT "leave_requests_date_range_valid" CHECK ("from_date" <= "to_date")'
    );
    await queryInterface.sequelize.query(
      'ALTER TABLE "leave_requests" ADD CONSTRAINT "leave_requests_total_days_positive" CHECK ("total_days" > 0)'
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable("leave_requests");
  }
};
