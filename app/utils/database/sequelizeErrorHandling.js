const sequelize = require("sequelize");
const connection = require("./connectionInstance");
const sequelize_error_handling = (error) => {
  all_errors = error.errors;
  all_errors.forEach((err) => {
    console.error(JSON.parse(err.parrent));
  });

  console.log("stop here");
  switch (error) {
    case error instanceof sequelize.UniqueConstraintError:
      break;

    case error instanceof sequelize.ValidationError:
      break;

    case error instanceof sequelize.ForeignKeyConstraintError:
      // Handle foreign key constraint errors
      throw new Error(error);

    default:
      throw new Error(error);
      break;
  }
};

module.exports = {
  sequelize_error_handling,
};
