module.exports = (sequelize, DataTypes) => {
  const Designation = sequelize.define(
    "Designation",
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
      department_id: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      designation_name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
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
      tableName: "designations",
      underscored: true,
      paranoid: true,
      indexes: [
        {
          unique: true,
          fields: ["department_id", "designation_name"]
        }
      ]
    }
  );

  Designation.associate = (models) => {
    Designation.belongsTo(models.Department, {
      foreignKey: "department_id",
      as: "department"
    });
    Designation.hasMany(models.Employee, {
      foreignKey: "designation_id",
      as: "employees"
    });
    Designation.belongsTo(models.User, { foreignKey: "created_by", as: "creator" });
    Designation.belongsTo(models.User, { foreignKey: "updated_by", as: "updater" });
    Designation.belongsTo(models.User, { foreignKey: "deleted_by", as: "deleter" });
  };

  return Designation;
};
