module.exports = (sequelize, DataTypes) => {
  const LeaveRequest = sequelize.define(
    "LeaveRequest",
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
      leave_type: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      from_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      to_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      total_days: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      reason: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      applied_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      approved_by: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      approved_date: {
        type: DataTypes.DATE,
        allowNull: true
      },
      status: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: "Pending"
      },
      remarks: {
        type: DataTypes.TEXT,
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
      tableName: "leave_requests",
      underscored: true,
      paranoid: true
    }
  );

  LeaveRequest.associate = (models) => {
    LeaveRequest.belongsTo(models.Employee, { foreignKey: "employee_id", as: "employee" });
    LeaveRequest.belongsTo(models.User, { foreignKey: "approved_by", as: "approver" });
    LeaveRequest.belongsTo(models.User, { foreignKey: "created_by", as: "creator" });
    LeaveRequest.belongsTo(models.User, { foreignKey: "updated_by", as: "updater" });
    LeaveRequest.belongsTo(models.User, { foreignKey: "deleted_by", as: "deleter" });
  };

  return LeaveRequest;
};
