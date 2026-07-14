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
    await queryInterface.createTable("designations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      department_id: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: { model: "departments", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT"
      },
      designation_name: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      description: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      status: {
        allowNull: false,
        defaultValue: true,
        type: Sequelize.BOOLEAN
      },
      ...auditColumns(Sequelize)
    });

    await queryInterface.addIndex("designations", ["department_id"]);
    await queryInterface.addIndex("designations", ["department_id", "designation_name"], {
      unique: true,
      name: "designations_department_name_unique"
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("designations");
  }
};
