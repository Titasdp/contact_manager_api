const { body } = require("express-validator");
const phone_Number_validator = require("libphonenumber-js");
// Validation rules
const filds_sanitazation_rules_register = () => {
  return [
    body("full_name").escape().trim(),
    body("password").escape().trim(),
    body("email").trim().normalizeEmail(),
    body("locality").escape().trim(),
    body("age").toInt(),
    body("phone_numb").customSanitizer((value) => {
      const sanitized_phone_number =
        phone_Number_validator(value).format("E.164");
      return sanitized_phone_number;
    }),
  ];
};

const filds_sanitazation_rules_login = () => {
  return [
    body("password").escape().trim(),
    body("email").trim().normalizeEmail(),
  ];
};

module.exports = {
  filds_sanitazation_rules_register,
  filds_sanitazation_rules_login,
};
