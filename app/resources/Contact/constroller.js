const { Router } = require("express");
const validation_rules = require("./validationRules");
const validator_middlware = require("../../middleware/validator");
const service = require("./service");
const sanitization_rules = require("./sanitizationRules");
const authenticated_middlware = require("../../middleware/authenticated");
const router = Router();

const get_user_contacts = async (req, res) => {
  let service_response = await service.get_user_data_by_id_service(
    req.params.user_id
  );

  res.status(service_response.resp_code).json(service_response.datas);

  if (service_response.resp_code === 500)
    throw new Error(service_response.error);
};

const add_user_contact = async (req, res) => {
  let service_response = await service.create_contact_service(
    req.body.full_name,
    req.body.email,
    req.body.phone_numb,
    req.params.user_id,
    req.body.address,
    req.body.locality,
    req.body.obs
  );

  res.status(service_response.resp_code).json(service_response.datas);

  if (service_response.resp_code === 500)
    throw new Error(service_response.error);
};

const delete_user_contact = async (req, res) => {
  let service_response = await service.delete_contact_service(
    req.params.user_id,
    req.params.email,
    req.params.phone_numb
  );

  res.status(service_response.resp_code).json(service_response.datas);

  if (service_response.resp_code === 500)
    throw new Error(service_response.error);
};

const update_user_contact = async (req, res) => {
  let service_response = await service.update_user_contact_service(
    req.params.user_id,
    req.params.email,
    req.params.phone_numb,
    req.body.full_name,
    req.body.email,
    req.body.phone_numb,
    req.body.locality,
    req.body.address,
    req.body.obs
  );

  res.status(service_response.resp_code).json(service_response.datas);

  if (service_response.resp_code === 500)
    throw new Error(service_response.error);
};

// routes defenition
router.get(
  "/:user_id/contacts",
  validation_rules.get_user_contacts_rules(),
  validator_middlware.validate,
  sanitization_rules.filds_sanitization_rules_get_user_contacts(),
  authenticated_middlware.confirm_params_user_id_to_token_id_contact,
  get_user_contacts
);

router.post(
  "/:user_id/contacts",
  validation_rules.create_contact_rules(),
  validator_middlware.validate,
  sanitization_rules.filds_sanitization_rules_create_contact(),
  authenticated_middlware.confirm_params_user_id_to_token_id_contact,
  add_user_contact
);

router.delete(
  "/:user_id/contacts/:email/:phone_numb",
  validation_rules.delete_user_contact_rules(),
  validator_middlware.validate,
  sanitization_rules.filds_sanitization_rules_delete_contact(),
  authenticated_middlware.confirm_params_user_id_to_token_id_contact,
  delete_user_contact
);

router.put(
  "/:user_id/contacts/:email/:phone_numb",
  validation_rules.update_contact_rules(),
  validator_middlware.validate,
  sanitization_rules.filds_sanitization_rules_edit_contact(),
  authenticated_middlware.confirm_params_user_id_to_token_id_contact,
  update_user_contact
);

// //password
// router.patch(
//   "/:id/password",
//   validation_rules.change_user_password_rules(),
//   validator_middlware.validate,
//   sanitization_rules.filds_sanitazation_rules_alter_password(),
//   authenticated_middlware.confirm_params_user_id_to_token_id,
//   patch_user_password
// );

// //password
// router.put(
//   "/:id/information",
//   validation_rules.update_user_info_rules(),
//   validator_middlware.validate,
//   sanitization_rules.filds_sanitazation_rules_update_user_info(),
//   authenticated_middlware.confirm_params_user_id_to_token_id,
//   update_user_info
// );

// router.get(
//   "/:id",
//   validation_rules.get_user_info_rules(),
//   validator_middlware.validate,
//   sanitization_rules.filds_sanitazation_rules_get_user_data(),
//   authenticated_middlware.confirm_params_user_id_to_token_id,
//   get_user_data
// );

module.exports = router;
