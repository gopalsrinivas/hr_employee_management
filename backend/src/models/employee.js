module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define(
    "Employee",
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true
      },
      employee_code: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
      },
      first_name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      last_name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      gender: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      dob: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
      email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      mobile: {
        type: DataTypes.STRING(20),
        allowNull: true
      },
      joining_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      department_id: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      designation_id: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      manager_id: {
        type: DataTypes.BIGINT,
        allowNull: true
      },
      salary: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0
      },
      status: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: "Active"
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
      tableName: "employees",
      underscored: true,
      paranoid: true
    }
  );

  Employee.associate = (models) => {
    Employee.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
    Employee.belongsTo(models.Department, { foreignKey: "department_id", as: "department" });
    Employee.belongsTo(models.Designation, { foreignKey: "designation_id", as: "designation" });
    Employee.belongsTo(models.Employee, { foreignKey: "manager_id", as: "manager" });
    Employee.hasMany(models.Employee, { foreignKey: "manager_id", as: "directReports" });
    Employee.hasMany(models.Attendance, { foreignKey: "employee_id", as: "attendanceRecords" });
    Employee.hasMany(models.LeaveRequest, { foreignKey: "employee_id", as: "leaveRequests" });
    Employee.hasMany(models.Payroll, { foreignKey: "employee_id", as: "payrollRecords" });
    Employee.hasMany(models.EmployeeDocument, { foreignKey: "employee_id", as: "documents" });
    Employee.hasOne(models.Onboarding, { foreignKey: "employee_id", as: "onboarding" });
    Employee.hasOne(models.EmployeeExit, { foreignKey: "employee_id", as: "exitProcess" });
    Employee.belongsTo(models.User, { foreignKey: "created_by", as: "creator" });
    Employee.belongsTo(models.User, { foreignKey: "updated_by", as: "updater" });
    Employee.belongsTo(models.User, { foreignKey: "deleted_by", as: "deleter" });
  };

  return Employee;
};
