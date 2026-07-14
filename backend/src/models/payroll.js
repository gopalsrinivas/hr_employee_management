module.exports = (sequelize, DataTypes) => {
  const Payroll = sequelize.define(
    "Payroll",
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
      employee_id: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      payroll_month: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      payroll_year: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      basic_salary: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0
      },
      hra: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0
      },
      da: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0
      },
      bonus: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0
      },
      incentives: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0
      },
      pf: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0
      },
      esi: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0
      },
      tax: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0
      },
      deductions: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0
      },
      net_salary: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0
      },
      salary_status: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: "Pending"
      },
      paid_date: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      deleted_by: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    },
    {
      tableName: "payroll",
      underscored: true,
      paranoid: true,
      indexes: [
        {
          unique: true,
          fields: ["employee_id", "payroll_month", "payroll_year"]
        }
      ]
    }
  );

  Payroll.associate = (models) => {
    Payroll.belongsTo(models.Employee, { foreignKey: "employee_id", as: "employee" });
    Payroll.belongsTo(models.User, { foreignKey: "created_by", as: "creator" });
    Payroll.belongsTo(models.User, { foreignKey: "updated_by", as: "updater" });
    Payroll.belongsTo(models.User, { foreignKey: "deleted_by", as: "deleter" });
  };

  return Payroll;
};
