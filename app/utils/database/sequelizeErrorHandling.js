const sequelize = require("sequelize");
const sequelize_error_handling = (error) => {
  let throw_exception = false;
  let response_errors = [];
  let all_errors = error.errors;
  if (error instanceof sequelize.DatabaseError) {
    throw_exception = true;
  } else {
    all_errors.forEach((err) => {
      if (err.type != "unique violation" && throw_exception == false) {
        throw_exception = true;
      } else {
        response_errors.push({
          message: `${err.path} must be unique`,
          error_type: err.type,
          cause_error_field: err.path,
        });
      }
    });
  }

  return {
    throw_exception: throw_exception,
    errors: response_errors,
  };
};

module.exports = {
  sequelize_error_handling,
};
