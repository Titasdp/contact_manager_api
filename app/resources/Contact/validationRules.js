const phone_Number_validator = require("libphonenumber-js");
const { body, param } = require("express-validator");
// Validation rules
const mass_delete_user_contacts_rules = () => {
  return [
    param("user_id")
      .exists()
      .withMessage("User id missing in url params.")
      .notEmpty()
      .isString()
      .withMessage("User id in url params must be a string."),
    param("contacts_ids")
      .exists()
      .withMessage("Contacts Ids missing in url params.")
      .notEmpty()
      .isString()
      .withMessage("Contact Ids in url params must be a string."),
  ];
};

const get_user_contacts_rules = () => {
  return [
    param("user_id")
      .exists()
      .withMessage("User id missing in url params.")
      .notEmpty()
      .isString()
      .withMessage("User id in url params must be a string."),
  ];
};

const delete_user_contact_rules = () => {
  return [
    param("user_id")
      .exists()
      .withMessage("User id missing in url params.")
      .notEmpty()
      .isString()
      .withMessage("User id in url params must be a string."),
    param("email")
      .exists()
      .withMessage("The required param email missing in url params.")
      .trim()
      .isEmail()
      .withMessage("invalid param email send in url."),
    param("phone_numb")
      .exists()
      .withMessage("The required param phone_numb missing in url params.")
      .custom((value) => {
        try {
          const process_result = phone_Number_validator(value);
          if (process_result.isValid()) {
            return true;
          } else {
            throw new Error("Invalid Phone number in url param.");
          }
        } catch (error) {
          throw new Error("Invalid Phone number in url param.");
        }
      }),
  ];
};

const update_contact_rules = () => {
  return [
    param("user_id")
      .exists()
      .withMessage("User id missing in url params.")
      .notEmpty()
      .isString()
      .withMessage("User id in url params must be a string."),
    param("email")
      .exists()
      .withMessage("The required param email missing in url params.")
      .trim()
      .isEmail()
      .withMessage("invalid param email send in url."),
    param("phone_numb")
      .exists()
      .withMessage("The required param phone_numb missing in url params.")
      .custom((value) => {
        try {
          const process_result = phone_Number_validator(value);
          if (process_result.isValid()) {
            return true;
          } else {
            throw new Error("Invalid Phone number in url param.");
          }
        } catch (error) {
          throw new Error("Invalid Phone number in url param.");
        }
      }),
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
      .withMessage("the Field must be a String."),
    body("locality")
      .exists()
      .withMessage(
        "The required field, locality, is empty, please check your input."
      )
      .trim()
      .not()
      .equals("")
      .withMessage(
        "The required field, locality name, is empty, please check your input."
      )
      .isString()
      .withMessage("the Field must be a String."),
    body("address")
      .exists()
      .withMessage(
        "The required field, Address, is empty, please check your input."
      )
      .trim()
      .not()
      .equals("")
      .withMessage(
        "The required field, Address, is empty, please check your input."
      )
      .isString()
      .withMessage("the Field must be a String."),
    body("obs")
      .exists()
      .withMessage(
        "The required field, Obs, is empty, please check your input."
      )
      .isString()
      .withMessage("the Field obs must be a String."),

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

const create_contact_rules = () => {
  return [
    param("user_id")
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
      .withMessage("the Field must be a String."),
    body("locality")
      .exists()
      .withMessage(
        "The required field, locality, is empty, please check your input."
      )
      .trim()
      .not()
      .equals("")
      .withMessage(
        "The required field, locality, is empty, please check your input."
      )
      .isString()
      .withMessage("the Field must be a String."),
    body("address")
      .exists()
      .withMessage(
        "The required field, address, is empty, please check your input."
      )
      .trim()
      .not()
      .equals("")
      .withMessage(
        "The required field, address, is empty, please check your input."
      )
      .isString()
      .withMessage("the Field must be a String."),
    body("obs")
      .exists()
      .withMessage(
        "The required field, obs, is empty, please check your input."
      )
      .isString()
      .withMessage("The required field, obs, must be a string."),

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
  delete_user_contact_rules,
  mass_delete_user_contacts_rules,
  get_user_contacts_rules,
  update_contact_rules,
  create_contact_rules,
};
