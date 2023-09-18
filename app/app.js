require("dotenv").config();
var body_parser = require("body-parser");

const cors = require("cors");
const db_connection = require("./utils/database/connection");
db_connection.define_table_relations(); // responsible to define the tables relations
const validate_env = require("./utils/validateEnv");
const express = require("express");

const user_routes = require("./resources/User/controller");
const contact_routes = require("./resources/Contact/constroller");
const env = validate_env.validate();
const app = express();
const port = process.env.SERVER_PORT || 3000;

var corsOptions = {
  // origin: "http://127.0.0.1:3000",
  optionsSuccessStatus: 200, // For legacy browser support
  methods: "GET, PUT,POST, PATCH,DELETE",
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/users", user_routes);
app.use("/users", contact_routes);

const init_service = async () => {
  console.log("Analysing connection...");
  await db_connection.test_db_Connection();

  await app.listen(port, async () => {
    console.log(`API services can be access on port: ${port}`);
  });
};

init_service();
