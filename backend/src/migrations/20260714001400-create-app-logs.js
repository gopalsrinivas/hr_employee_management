"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("app_logs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      api: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      method: {
        allowNull: false,
        type: Sequelize.STRING(10)
      },
      request_id: {
        allowNull: true,
        type: Sequelize.STRING(100)
      },
      user_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },
      ip_address: {
        allowNull: true,
        type: Sequelize.STRING(100)
      },
      log_level: {
        allowNull: false,
        type: Sequelize.STRING(20)
      },
      message: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      }
    });

    await queryInterface.addIndex("app_logs", ["user_id"]);
    await queryInterface.addIndex("app_logs", ["log_level"]);
    await queryInterface.addIndex("app_logs", ["created_at"]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable("app_logs");
  }
};
