const phone_Number_validator = require("libphonenumber-js");
const { body, param } = require("express-validator");
// Validation rules
const register_validation_rules = () => {
  return [
    body("full_name")
      .exists()
      .withMessage(
        "The required field, full name, is empty, please check your input."
      )
      .trim()
      .not()
      .equals("")
      .withMessage(
        "The required field, full name, is empty, please check your input."
      )
      .isString()
      .withMessage("The required field,full name is must be a string."),
    body("email")
      .exists()
      .withMessage(
        "The required field, email ,is empty, please check your input."
      )
      .trim()
      .isEmail()
      .withMessage(
        "Please check email you entered does not correspont to a valid email."
      ),
    body("locality")
      .exists()
      .withMessage(
        "The required field, locality, is empty, please check your input."
      )
      .trim()
      .not()
      .equals("")
      .withMessage(
        "The required field, full name, is empty, please check your input."
      )
      .isString()
      .withMessage("the Field locality must be a String."),
    body("age")
      .exists()
      .withMessage(
        "The required field, age, is empty, please check your input."
      )
      .isInt({ min: 1 })
      .withMessage(
        "The required field, age, must be a positive integer number."
      ),
    body("phone_numb")
      .exists()
      .withMessage(
        "The required field, phone number, is empty, please check your input"
      )
      .custom((value) => {
        try {
          const process_result = phone_Number_validator(value);
          if (process_result.isValid()) {
            return true;
          } else {
            throw new Error("Please introduce a valid phone number.");
          }
        } catch (error) {
          throw new Error("Please introduce a valid phone number.");
        }
      }),
  ];
};

const login_validaton_rules = () => {
  return [
    body("email")
      .exists()
      .withMessage(
        "The required field, email ,is empty, please check your input."
      )
      .isEmail()
      .withMessage(
        "Please check email you entered does not correspont to a valid email."
      )
      .trim(),

    body("password")
      .exists()
      .withMessage(
        "The required field, password ,is empty, please check your input."
      )
      .isString()
      .withMessage("the Field locality must be a String.")
      .trim(),
  ];
};

const change_user_password_rules = () => {
  return [
    param("id")
      .exists()
      .withMessage("Id missing in url params.")
      .notEmpty()
      .isString()
      .withMessage("Id in url params must be a string."),
    //
    body("new_password")
      .isString()
      .withMessage("The required field,full name is must be a string.")
      .trim()
      .exists()
      .withMessage(
        "The required field, New password ,is empty, please check your input."
      )
      .matches(/^[\S]+$/)
      .withMessage("Password cannot contain white space")
      .isLength({ min: 10 })
      .withMessage("Password must be at least 10 characters long"),
    body("password_confirmation")
      .isString()
      .withMessage("The required field,full name is must be a string.")
      .trim()
      .exists()
      .withMessage(
        "The required field, New password ,is empty, please check your input."
      )
      .matches(/^[\S]+$/)
      .withMessage("Password cannot contain white space")
      .isLength({ min: 10 })
      .withMessage("Password must be at least 10 characters long"),
    body("old_password")
      .exists()
      .withMessage(
        "The required field, Old password ,is empty, please check your input."
      )
  ];
};

const get_user_info_rules = () => {
  return [
    param("id")
      .exists()
      .withMessage("Id missing in url params.")
      .notEmpty()
      .isString()
      .withMessage("Id in url params must be a string."),
  ];
};

const update_user_info_rules = () => {


  return [
    param("id")
      .exists()
      .withMessage("Id missing in url params.")
      .notEmpty()
      .isString()
      .withMessage("Id in url params must be a string."),
    body("full_name")
      .exists()
      .withMessage(
        "The required field, full name, is empty, please check your input."
      )
      .trim()
      .not()
      .equals("")
      .withMessage(
        "The required field, full name, is empty, please check your input."
      )
      .isString()
      .withMessage("The required field,full name is must be a string."),
    body("locality")
      .exists()
      .withMessage(
        "The required field, locality, is empty, please check your input."
      )
      .trim()
      .not()
      .equals("")
      .withMessage(
        "The required field, full name, is empty, please check your input."
      )
      .isString()
      .withMessage("the Field must be a String."),
    body("age")
      .exists()
      .withMessage(
        "The required field, age, is empty, please check your input."
      )
      .isInt({ min: 1 })
      .withMessage(
        "The required field, age, must be a positive integer number."
      ),
    body("phone_numb")
      .exists()
      .withMessage(
        "The required field, phone number, is empty, please check your input"
      )
      .custom((value) => {
        try {
          const process_result = phone_Number_validator(value);
          if (process_result.isValid()) {
            return true;
          } else {
            throw new Error("Please introduce a valid phone number.");
          }
        } catch (error) {
          throw new Error("Please introduce a valid phone number.");
        }
      }),
  ];
};

module.exports = {
  register_validation_rules,
  login_validaton_rules,
  change_user_password_rules,
  update_user_info_rules,
  get_user_info_rules,
};
