"use strict";

const now = new Date();

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "roles",
      [
        {
          name: "Admin",
          description: "System administrator with full access.",
          created_at: now,
          updated_at: now
        },
        {
          name: "HR",
          description: "Human resources team member.",
          created_at: now,
          updated_at: now
        },
        {
          name: "Employee",
          description: "Standard employee account.",
          created_at: now,
          updated_at: now
        }
      ],
      { ignoreDuplicates: true }
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("roles", {
      name: ["Admin", "HR", "Employee"]
    });
  }
};
