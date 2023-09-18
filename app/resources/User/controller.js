const { Router } = require("express");
const validation_rules = require("./validationRules");
const validator_middlware = require("../../middleware/validator");
const service = require("./service");
const sanitization_rules = require("./sanitizationRules");
const authenticated_middlware = require("../../middleware/authenticated");
const router = Router();

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const register_user = async (req, res) => {
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
const login_user = async (req, res) => {
  const service_response = await service.login_process(
    req.body.email,
    req.body.password
  );


  res.status(service_response.resp_code).json(service_response.datas);
  if (service_response.resp_code === 500)
    throw new Error(service_response.error);
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const patch_user_password = async (req, res) => {
  let service_response = await service.get_user_data_by_id_service(
    req.params.id
  );

  if (service_response.resp_code === 200) {
    service_response = await service.patch_password_process(
      req.body.new_password,
      req.body.password_confirmation,
      req.body.old_password,
      req.params.id,
      service_response.datas.process_result.user.password
    );
  }




  res.status(service_response.resp_code).json(service_response.datas);
  if (service_response.resp_code === 500)
    throw new Error(service_response.error);
};
/**
 *
 * @param {*} req
 * @param {*} res
 */
const update_user_info = async (req, res) => {
  let service_response = await service.update_information_process(
    req.body.full_name,
    req.body.locality,
    req.body.age,
    req.body.phone_numb,
    req.params.id
  );

  res.status(service_response.resp_code).json(service_response.datas);

  if (service_response.resp_code === 500)
    throw new Error(service_response.error);
};

const get_user_data = async (req, res) => {
  let service_response = await service.get_user_data_by_id_service(
    req.params.id,
    false
  );

  res.status(service_response.resp_code).json(service_response.datas);

  if (service_response.resp_code === 500)
    throw new Error(service_response.error);
};

// routes defenition
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

//password
router.patch(
  "/:id/password",
  validation_rules.change_user_password_rules(),
  validator_middlware.validate,
  sanitization_rules.filds_sanitazation_rules_alter_password(),
  authenticated_middlware.confirm_params_user_id_to_token_id,
  patch_user_password
);

//password
router.put(
  "/:id/information",
  validation_rules.update_user_info_rules(),
  validator_middlware.validate,
  sanitization_rules.filds_sanitazation_rules_update_user_info(),
  authenticated_middlware.confirm_params_user_id_to_token_id,
  update_user_info
);

router.get(
  "/:id",
  validation_rules.get_user_info_rules(),
  validator_middlware.validate,
  sanitization_rules.filds_sanitazation_rules_get_user_data(),
  authenticated_middlware.confirm_params_user_id_to_token_id,
  get_user_data
);

module.exports = router;
