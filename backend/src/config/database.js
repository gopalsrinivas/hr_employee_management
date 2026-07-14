require("./env");

const baseConfig = {
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "hr_employee_management",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 5432),
  dialect: "postgres",
  logging: false,
  define: {
    underscored: true,
    timestamps: true
  }
};

module.exports = {
  development: baseConfig,
  test: {
    ...baseConfig,
    database: process.env.DB_TEST_NAME || "hr_employee_management_test"
  },
  production: {
    ...baseConfig,
    logging: false
  }
};
