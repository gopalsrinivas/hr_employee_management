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
    await queryInterface.createTable("onboarding", {
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
      joining_date: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      documents_verified: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      induction_completed: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      laptop_allocated: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      email_created: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      id_card_generated: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      welcome_kit_issued: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      onboarding_status: {
        allowNull: false,
        defaultValue: "Pending",
        type: Sequelize.STRING(20)
      },
      ...auditColumns(Sequelize)
    });

    await queryInterface.addIndex("onboarding", ["joining_date"]);
    await queryInterface.sequelize.query(
      'ALTER TABLE "onboarding" ADD CONSTRAINT "onboarding_status_allowed" CHECK ("onboarding_status" IN (\'Pending\', \'Completed\'))'
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable("onboarding");
  }
};
