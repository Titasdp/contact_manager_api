const { body } = require("express-validator");
const phone_Number_validator = require("libphonenumber-js");
// Validation rules
const filds_sanitazation_rules = () => {
  return [
    body("full_name").escape().trim(),
    body("email").trim().normalizeEmail(),
    body("locality").escape().trim(),
    body("age").toInt(),
    body("phone_numb").customSanitizer((value) => {
        const sanitized_phone_number =phone_Number_validator(value).format("E.164");
        return sanitized_phone_number}),
  ];
};

module.exports = {
    filds_sanitazation_rules,
};
