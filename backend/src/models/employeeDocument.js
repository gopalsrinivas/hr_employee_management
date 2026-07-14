module.exports = (sequelize, DataTypes) => {
  const EmployeeDocument = sequelize.define(
    "EmployeeDocument",
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
      document_type: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      document_number: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      file_name: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      original_name: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      file_path: {
        type: DataTypes.STRING(500),
        allowNull: false
      },
      file_size: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      uploaded_by: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      uploaded_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
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
      tableName: "employee_documents",
      underscored: true,
      paranoid: true
    }
  );

  EmployeeDocument.associate = (models) => {
    EmployeeDocument.belongsTo(models.Employee, { foreignKey: "employee_id", as: "employee" });
    EmployeeDocument.belongsTo(models.User, { foreignKey: "uploaded_by", as: "uploader" });
    EmployeeDocument.belongsTo(models.User, { foreignKey: "created_by", as: "creator" });
    EmployeeDocument.belongsTo(models.User, { foreignKey: "updated_by", as: "updater" });
    EmployeeDocument.belongsTo(models.User, { foreignKey: "deleted_by", as: "deleter" });
  };

  return EmployeeDocument;
};
