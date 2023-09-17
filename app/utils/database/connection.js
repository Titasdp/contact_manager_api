const { DataTypes } = require("sequelize");
const conection_instance = require("./connectionInstance");
const User_model = require("../../resources/User/model");
const Contact_model = require("../../resources/Contact/model");

const test_db_Connection = async () => {
  try {
    await conection_instance.authenticate();
    console.log(
      "The connection between the DB and the API have been establish successfully."
    );
  } catch (error) {
    console.error("Error while trying to connect with the DB", error);
  }
};

const define_table_relations = async () => {
  /**
   * The Following code lines are responsible for establishing relations between tables
   */
  User_model.hasMany(Contact_model, {
    foreignKey: {
      name: "user_id",
      allowNull: false,
      type: DataTypes.STRING,
      primaryKey: true,
    },
  });

  Contact_model.hasMany(User_model, {
    foreignKey: {
      name: "user_id",
      allowNull: false,
      type: DataTypes.STRING,
    },
  });
};

module.exports = {
  test_db_Connection,
  define_table_relations,
};
