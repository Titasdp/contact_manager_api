const { validationResult } = require("express-validator");
const payload_manager = require("../utils/payloadManager");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  const msg = "Inputs validation error";
  if (errors.isEmpty()) {
    return next();
  }
  const extracted_errors = [];
  errors
    .array()
    .map((err) => extracted_errors.push({ error_message: err.msg }));

  const payload = payload_manager.payload_builder(extracted_errors, {}, msg);

  return res.status(422).json(
    payload
  );
};

module.exports = {
  validate,
};
