const { Router } = require("express");
const validation_rules = require("./validationRules");
const validator_middlware = require("../../middleware/validator");
const service = require("./service");
const sanitization_rules = require("./sanitizationRules");
const router = Router();

const register_user = async (req, res, next) => {
  console.log("here register");
  const service_response = await service.register_process(
    req.body.full_name,
    req.body.email,
    req.body.locality,
    req.body.age,
    req.body.phone_numb
  );
  res.status(service_response.resp_code).json(service_response.datas);
  if (service_response.resp_code === 500)
    throw new Error(service_response.error);
};
/**
 * Route function responsible for the login process
 * @param {Request} req CLIENT REQUEST
 * @param {Response} res API RESPONSE
 * @param {NextFunction} next NEXT FUNCTION ALLOWS MIDDLWARE TO PASS CONTROL TO THE NEXT MIDDLWARE
 */
const login_user = async (req, res, next) => {
  const service_response = await service.login_process(
    req.body.email,
    req.body.password
  );

  res.status(service_response.resp_code).json(service_response.datas);



  console
  if (service_response.resp_code === 500)
    throw new Error(service_response.error);
};

router.post(
  "/register",
  validation_rules.register_validation_rules(),
  validator_middlware.validate,
  sanitization_rules.filds_sanitazation_rules_register(),
  register_user
);

router.post(
  "/login",
  validation_rules.login_validaton_rules(),
  validator_middlware.validate,
  sanitization_rules.filds_sanitazation_rules_login(),
  login_user
);

module.exports = router;
