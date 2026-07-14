"use strict";

const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    const [adminRole] = await queryInterface.sequelize.query(
      "SELECT id FROM roles WHERE name = :name LIMIT 1",
      {
        replacements: { name: "Admin" },
        type: Sequelize.QueryTypes.SELECT
      }
    );

    if (!adminRole) {
      return;
    }

    const password = await bcrypt.hash("Admin@12345", 10);
    const now = new Date();

    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "System Admin",
          email: "admin@example.com",
          password,
          role_id: adminRole.id,
          is_active: true,
          created_at: now,
          updated_at: now
        }
      ],
      { ignoreDuplicates: true }
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("users", {
      email: "admin@example.com"
    });
  }
};
