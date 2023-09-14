const { Router } = require("express");
const validation_rules = require("./validationRules");
const validator_middlware = require("../../middleware/validator");
const service = require("./service");
const sanitazation_rules = require("./sanitazationRules");
const router = Router();

const register_user = async (req, res, next) => {
  try {
    console.log("here");
    const response = await service.register_process(
      req.body.full_name,
      req.body.email,
      req.body.locality,
      req.body.age,
      req.body.phone_numb
    );
    console.log("hew ");

    res.status(201).json({ response });
  } catch (error) {
    // let message = '';
    // if (error instanceof Error) message = error.message;
    // next(new HttpException(400, message));
  } finally {
  }
};

router.post(
  "/register",
  validation_rules.register_validation_rules(),
  validator_middlware.validate,
  sanitazation_rules.filds_sanitazation_rules(),
  register_user
);

module.exports = router;
