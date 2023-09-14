require("dotenv").config();
var body_parser = require("body-parser");
const validate_env = require("./utils/validateEnv");
const express = require("express");
const db_connection = require("./utils/database/connection");
const user_routes = require("./resources/User/controller");
const env = validate_env.validate();
const app = express();
const port = process.env.SERVER_PORT || 3000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/users", user_routes);

const init_service = async () => {
  console.log("Analysing connection...");
  await db_connection.test_db_Connection();
  await app.listen(port, async () => {
    console.log(`API services can be access on port: ${port}`);
  });
};

init_service();
