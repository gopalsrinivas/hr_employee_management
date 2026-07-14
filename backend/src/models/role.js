module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "Role",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
      },
      description: {
        type: DataTypes.STRING(255),
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
      tableName: "roles",
      underscored: true,
      paranoid: true
    }
  );

  Role.associate = (models) => {
    Role.hasMany(models.User, {
      foreignKey: "role_id",
      as: "users"
    });
    Role.belongsTo(models.User, { foreignKey: "created_by", as: "creator" });
    Role.belongsTo(models.User, { foreignKey: "updated_by", as: "updater" });
    Role.belongsTo(models.User, { foreignKey: "deleted_by", as: "deleter" });
  };

  return Role;
};
