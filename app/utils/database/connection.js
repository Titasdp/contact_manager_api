const conection_instance = require("./connectionInstance");

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

module.exports = {
  test_db_Connection,
};
