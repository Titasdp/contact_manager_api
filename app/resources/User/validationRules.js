const phone_Number_validator = require("libphonenumber-js");
const { body, check } = require("express-validator");
// Validation rules
const register_validation_rules = () => {
  return [
    body("full_name")
      .trim()
      .exists()
      .withMessage(
        "The required field, full name, is empty, please check your input."
      )
      .not()
      .equals("")
      .withMessage(
        "The required field, full name, is empty, please check your input."
      )
      .isString()
      .withMessage("The required field,full name is must be a string."),
    body("email")
      .trim()
      .exists()
      .withMessage(
        "The required field, email ,is empty, please check your input."
      )
      .isEmail()
      .withMessage(
        "Please check email you entered does not correspont to a valid email."
      ),
    body("locality")
      .trim()
      .exists()
      .withMessage(
        "The required field, locality, is empty, please check your input."
      )
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

const login_validaton_rules = () => {
  return [
    body("email")
      .trim()
      .exists()
      .withMessage(
        "The required field, email ,is empty, please check your input."
      )
      .isEmail()
      .withMessage(
        "Please check email you entered does not correspont to a valid email."
      ),
  ];
};

module.exports = {
  register_validation_rules,
  login_validaton_rules,
};
