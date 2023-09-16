const token_manager = require("../utils/tokenManager");
const payload_manager = require("../utils/payloadManager");
const jwt = require("jsonwebtoken");

const confirm_authentication = (req, res, next) => {
  const bearer_token = req.headers.authorization;

  if (!bearer_token || !bearer_token.startsWith("Bearer ")) {
    const payload = payload_manager.payload_builder(
      {},
      "Your are unauthorized of acessing this resource.",
      401,
      null
    );
    return res.status(payload.resp_code).json(payload.datas);
  }

  const access_token_validation = bearer_token.split("Bearer ")[1].trim();

  if (access_token_validation instanceof jwt.JsonWebTokenError) {
    const payload = payload_manager.payload_builder([], {}, "", 401, null);
    return res.status(payload.resp_code).json(payload.datas);
  }

  next();
};

const confirm_params_user_id_to_token_id = async (req, res, next) => {
  const bearer_token = req.headers.authorization;

  if (!bearer_token || !bearer_token.startsWith("Bearer ")) {
    const payload = payload_manager.payload_builder(
      {},
      "Your are unauthorized of acessing this resource.",
      401,
      null
    );
    return res.status(payload.resp_code).json(payload.datas);
  }

  const access_token_validation = await token_manager.validate_token(
    bearer_token.split("Bearer ")[1].trim()
  );

  if (access_token_validation instanceof jwt.JsonWebTokenError) {
    const payload = payload_manager.payload_builder(
      {},
      "You are unauthorized to access this resource.",
      401,
      null
    );
    return res.status(payload.resp_code).json(payload.datas);
  }

  if (req.params.id != access_token_validation.id) {
    const payload = payload_manager.payload_builder(
      {},
      "You are unauthorized to access this resource.",
      401,
      null
    );
    return res.status(payload.resp_code).json(payload.datas);
  }
  next();
};

module.exports = { confirm_authentication, confirm_params_user_id_to_token_id };
