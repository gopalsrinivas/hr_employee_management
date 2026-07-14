module.exports = (sequelize, DataTypes) => {
  const AppLog = sequelize.define(
    "AppLog",
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
      api: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      method: {
        type: DataTypes.STRING(10),
        allowNull: false
      },
      request_id: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      ip_address: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      log_level: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      tableName: "app_logs",
      underscored: true,
      updatedAt: false
    }
  );

  AppLog.associate = (models) => {
    AppLog.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
  };

  return AppLog;
};
