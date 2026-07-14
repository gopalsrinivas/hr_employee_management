"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const [adminUser] = await queryInterface.sequelize.query(
      "SELECT id FROM users WHERE email = :email LIMIT 1",
      {
        replacements: { email: "admin@example.com" },
        type: Sequelize.QueryTypes.SELECT
      }
    );

    await queryInterface.bulkInsert("app_logs", [
      {
        api: "/api/health",
        method: "GET",
        request_id: "seed-request-001",
        user_id: adminUser ? adminUser.id : null,
        ip_address: "127.0.0.1",
        log_level: "INFO",
        message: "Seeded application log entry.",
        created_at: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("app_logs", {
      request_id: "seed-request-001"
    });
  }
};
