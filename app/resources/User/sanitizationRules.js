const { body, param } = require("express-validator");

// Validation rules
const filds_sanitazation_rules_register = () => {
  return [
    body("full_name").escape().trim(),
    body("password").escape().trim(),
    body("email").trim().normalizeEmail(),
    body("locality").escape().trim(),
    body("age").toInt(),
    body("phone_numb").escape().trim(),
  ];
};

const filds_sanitazation_rules_login = () => {
  return [
    body("password").escape().trim(),
    body("email").trim().normalizeEmail(),
  ];
};

const filds_sanitazation_rules_alter_password = () => {
  return [
    param("id").escape().trim(),
    body("old_password").escape().trim(),
    body("new_password").escape().trim(),
    body("password_confirmation").escape().trim(),
  ];
};

const filds_sanitazation_rules_get_user_data = () => {
  return [param("id").escape().trim()];
};

const filds_sanitazation_rules_update_user_info = () => {
  return [
    param("id").escape().trim(),
    body("full_name").escape().trim(),
    body("locality").escape().trim(),
    body("age").toInt(),
    body("phone_numb").escape().trim(),
  ];
};
module.exports = {
  filds_sanitazation_rules_register,
  filds_sanitazation_rules_login,
  filds_sanitazation_rules_alter_password,
  filds_sanitazation_rules_get_user_data,
  filds_sanitazation_rules_update_user_info,
};
