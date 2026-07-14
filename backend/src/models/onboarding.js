module.exports = (sequelize, DataTypes) => {
  const Onboarding = sequelize.define(
    "Onboarding",
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
      joining_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      documents_verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      induction_completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      laptop_allocated: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      email_created: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      id_card_generated: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      welcome_kit_issued: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      onboarding_status: {
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
      tableName: "onboarding",
      underscored: true,
      paranoid: true
    }
  );

  Onboarding.associate = (models) => {
    Onboarding.belongsTo(models.Employee, { foreignKey: "employee_id", as: "employee" });
    Onboarding.belongsTo(models.User, { foreignKey: "created_by", as: "creator" });
    Onboarding.belongsTo(models.User, { foreignKey: "updated_by", as: "updater" });
    Onboarding.belongsTo(models.User, { foreignKey: "deleted_by", as: "deleter" });
  };

  return Onboarding;
};
