"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("roles", "created_by", {
      allowNull: true,
      type: Sequelize.INTEGER,
      references: { model: "users", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });
    await queryInterface.addColumn("roles", "updated_by", {
      allowNull: true,
      type: Sequelize.INTEGER,
      references: { model: "users", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });
    await queryInterface.addColumn("roles", "deleted_by", {
      allowNull: true,
      type: Sequelize.INTEGER,
      references: { model: "users", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });
    await queryInterface.addColumn("users", "deleted_by", {
      allowNull: true,
      type: Sequelize.INTEGER,
      references: { model: "users", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("users", "deleted_by");
    await queryInterface.removeColumn("roles", "deleted_by");
    await queryInterface.removeColumn("roles", "updated_by");
    await queryInterface.removeColumn("roles", "created_by");
  }
};
