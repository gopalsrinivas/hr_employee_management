module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define(
    "Attendance",
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
      attendance_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      check_in: {
        type: DataTypes.TIME,
        allowNull: true
      },
      check_out: {
        type: DataTypes.TIME,
        allowNull: true
      },
      working_hours: {
        type: DataTypes.DECIMAL(4, 2),
        allowNull: false,
        defaultValue: 0
      },
      status: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: "Present"
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
      tableName: "attendance",
      underscored: true,
      paranoid: true,
      indexes: [
        {
          unique: true,
          fields: ["employee_id", "attendance_date"]
        }
      ]
    }
  );

  Attendance.associate = (models) => {
    Attendance.belongsTo(models.Employee, { foreignKey: "employee_id", as: "employee" });
    Attendance.belongsTo(models.User, { foreignKey: "created_by", as: "creator" });
    Attendance.belongsTo(models.User, { foreignKey: "updated_by", as: "updater" });
    Attendance.belongsTo(models.User, { foreignKey: "deleted_by", as: "deleter" });
  };

  return Attendance;
};
