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
    await queryInterface.createTable("attendance", {
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
      attendance_date: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      check_in: {
        allowNull: true,
        type: Sequelize.TIME
      },
      check_out: {
        allowNull: true,
        type: Sequelize.TIME
      },
      working_hours: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.DECIMAL(4, 2)
      },
      status: {
        allowNull: false,
        defaultValue: "Present",
        type: Sequelize.STRING(20)
      },
      ...auditColumns(Sequelize)
    });

    await queryInterface.addIndex("attendance", ["attendance_date"]);
    await queryInterface.addIndex("attendance", ["employee_id", "attendance_date"], {
      unique: true,
      name: "attendance_employee_date_unique"
    });
    await queryInterface.sequelize.query(
      'ALTER TABLE "attendance" ADD CONSTRAINT "attendance_working_hours_non_negative" CHECK ("working_hours" >= 0)'
    );
    await queryInterface.sequelize.query(
      'ALTER TABLE "attendance" ADD CONSTRAINT "attendance_checkout_after_checkin" CHECK ("check_out" IS NULL OR "check_in" IS NULL OR "check_out" > "check_in")'
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable("attendance");
  }
};
