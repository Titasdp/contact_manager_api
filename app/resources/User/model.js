const { DataTypes, INTEGER } = require("sequelize");
const connection_instance = require("../../utils/database/connectionInstance");
const table_name = "User";
const User = connection_instance.define(
  `${table_name}`,
  {
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    locality: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    age: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
    },
    phone_numb: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    password_generated: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
    created_at: {
      type: "TIMESTAMP",
      defaultValue: connection_instance.fn("now"),
      allowNull: false,
    },
    updated_at: {
      type: "TIMESTAMP",
      defaultValue: connection_instance.fn("now"),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    createdAt: "created_at",
    updatedAt: "updated_at",
    logging: false,
    tableName: table_name,
    modelName: table_name,
  }
);

module.exports = User;
