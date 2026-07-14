module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define(
    "Department",
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
      department_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
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
      tableName: "departments",
      underscored: true,
      paranoid: true
    }
  );

  Department.associate = (models) => {
    Department.hasMany(models.Designation, {
      foreignKey: "department_id",
      as: "designations"
    });
    Department.hasMany(models.Employee, {
      foreignKey: "department_id",
      as: "employees"
    });
    Department.belongsTo(models.User, { foreignKey: "created_by", as: "creator" });
    Department.belongsTo(models.User, { foreignKey: "updated_by", as: "updater" });
    Department.belongsTo(models.User, { foreignKey: "deleted_by", as: "deleter" });
  };

  return Department;
};
