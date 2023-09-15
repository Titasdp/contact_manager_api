const token_manager = require("../utils/tokenManager");
const payload_manager = require("../utils/payloadManager");

const confirm_authentication = (req, res, next) => {
  const bearer_token = req.headers.authorization;

  if (!bearer_token || !bearer_token.startsWith("Bearer ")) {
    const payload = payload_manager.payload_builder([], {}, "", 401, null);
    return res.status(payload.resp_code).json(payload.datas);
  }

  const access_token_validation = bearer.split("Bearer ")[1].trim();

  if (access_token_validation instanceof jwt.JsonWebTokenError) {
    const payload = payload_manager.payload_builder([], {}, "", 401, null);
    return res.status(payload.resp_code).json(payload.datas);
  }
};

module.exports = { confirm_authentication };
