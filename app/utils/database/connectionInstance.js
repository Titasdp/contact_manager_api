require("dotenv").config();
const Sequelize = require("sequelize");

const database_connection_instance = new Sequelize(
  `${process.env.DB_DESIGNATION}`,
  `${process.env.DB_USERNAME}`,
  `${process.env.DB_PASSWORD}`,
  {
    host: `${process.env.DB_HOST}`,
    port: `${process.env.DB_PORT}`,
    dialect: `${process.env.DB_DIALECT}`,
    logging: false,
    define: {},
    dialectOptions: {
      multipleStatements: true,
    },
    pool: {
      max: 5,
      min: 1,
    },
  }
);

database_connection_instance
  .sync()

  .then((response) => {
    console.log("Connection stablish");
  })
  .catch((error) => {
    console.log("Failed to sync db: " + error.message);
  });

module.exports = database_connection_instance;
