module.exports = (sequelize, DataTypes) => {
  const EmployeeExit = sequelize.define(
    "EmployeeExit",
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
      employee_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true
      },
      resignation_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      last_working_day: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      reason: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      manager_approval: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      hr_approval: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      asset_returned: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      fnf_completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      experience_letter: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      relieving_letter: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      exit_status: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: "Pending"
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
      tableName: "employee_exit",
      underscored: true,
      paranoid: true
    }
  );

  EmployeeExit.associate = (models) => {
    EmployeeExit.belongsTo(models.Employee, { foreignKey: "employee_id", as: "employee" });
    EmployeeExit.belongsTo(models.User, { foreignKey: "created_by", as: "creator" });
    EmployeeExit.belongsTo(models.User, { foreignKey: "updated_by", as: "updater" });
    EmployeeExit.belongsTo(models.User, { foreignKey: "deleted_by", as: "deleter" });
  };

  return EmployeeExit;
};
