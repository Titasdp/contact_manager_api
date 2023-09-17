const { DataTypes } = require("sequelize");
const connection_instance = require("../../utils/database/connectionInstance");
const table_name = "Contact";
const Contact = connection_instance.define(
  `${table_name}`,
  {
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    phone_numb: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    locality: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    obs: {
      type: DataTypes.TEXT,
      allowNull: true,
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
module.exports = Contact;
