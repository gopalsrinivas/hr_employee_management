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
    await queryInterface.createTable("employee_documents", {
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
      document_type: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      document_number: {
        allowNull: true,
        type: Sequelize.STRING(100)
      },
      file_name: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      original_name: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      file_path: {
        allowNull: false,
        type: Sequelize.STRING(500)
      },
      file_size: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      uploaded_by: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },
      uploaded_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      ...auditColumns(Sequelize)
    });

    await queryInterface.addIndex("employee_documents", ["employee_id"]);
    await queryInterface.addIndex("employee_documents", ["document_type"]);
    await queryInterface.sequelize.query(
      'ALTER TABLE "employee_documents" ADD CONSTRAINT "employee_documents_file_size_positive" CHECK ("file_size" > 0)'
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable("employee_documents");
  }
};
