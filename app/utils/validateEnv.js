const validate_env = require("envalid");
const validate = () => {
  return validate_env.cleanEnv(process.env, {
    DB_DESIGNATION: (0, validate_env.str)(),
    DB_USERNAME: (0, validate_env.str)(),
    DB_PASSWORD: (0, validate_env.str)(),
    DB_HOST: (0, validate_env.str)(),
    DB_PORT: (0, validate_env.str)(),
    DB_DIALECT:(0, validate_env.str)(),
    PORT: (0, validate_env.port)({ default: 3000 }),
  });
};
module.exports = {
  validate,
};
