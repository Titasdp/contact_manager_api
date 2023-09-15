const jwt = require("jsonwebtoken");

const create_token = (user_id, expires_in) => {
  return jwt.sign({ id: user_id }, process.env.JWT_SECRET, {
    expiresIn: expires_in,
  });
};

const validate_token = async (token) => {
  const verification = await jwt.verify(
    token,
    process.env.JWT_SECRET,
    (error, decoded_token) => {
      if (error) return error;
      return decoded_token;
    }
  );

  return verification;
};

module.exports = {
  validate_token,
};
