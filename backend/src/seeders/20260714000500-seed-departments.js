"use strict";

const now = new Date();

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "departments",
      [
        {
          department_name: "HR",
          description: "Human Resources department.",
          status: true,
          created_at: now,
          updated_at: now
        },
        {
          department_name: "IT",
          description: "Information Technology department.",
          status: true,
          created_at: now,
          updated_at: now
        },
        {
          department_name: "Finance",
          description: "Finance department.",
          status: true,
          created_at: now,
          updated_at: now
        },
        {
          department_name: "Accounts",
          description: "Accounts department.",
          status: true,
          created_at: now,
          updated_at: now
        },
        {
          department_name: "Admin",
          description: "Administration department.",
          status: true,
          created_at: now,
          updated_at: now
        }
      ],
      { ignoreDuplicates: true }
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("departments", {
      department_name: ["HR", "IT", "Finance", "Accounts", "Admin"]
    });
  }
};
