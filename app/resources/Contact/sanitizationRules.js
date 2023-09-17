const { body, param } = require("express-validator");
// Validation rules
const filds_sanitization_rules_get_user_contacts = () => {
  return [param("user_id").escape().trim()];
};

const filds_sanitization_rules_delete_contact = () => {
  return [
    param("user_id").escape().trim(),
    param("contact_id").escape().trim(),
  ];
};

const filds_sanitization_rules__mass_delete_contacts = () => {
  return [param("user_id").escape().trim()];
};

const filds_sanitization_rules_edit_contact = () => {
  return [
    param("user_id").escape().trim(),
    param("contact_id").escape().trim(),
    body("full_name").escape().trim(),
    body("email").escape().trim(),
    body("locality").escape().trim(),
    body("address").escape().trim(),
    body("obs").escape().trim(),
  ];
};

const filds_sanitization_rules_create_contact = () => {
  return [
    param("user_id").escape().trim(),
    body("full_name").escape().trim(),
    body("email").escape().trim(),
    body("locality").escape().trim(),
    body("address").escape().trim(),
    body("obs").escape().trim(),
  ];
};

module.exports = {
  filds_sanitization_rules_edit_contact,
  filds_sanitization_rules_create_contact,
  filds_sanitization_rules_delete_contact,
  filds_sanitization_rules_get_user_contacts,
  filds_sanitization_rules__mass_delete_contacts,
};
