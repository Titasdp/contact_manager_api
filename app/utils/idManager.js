const uniqid = require("uniqid");

const generate_random_id = (tag) => {
  return uniqid("", `${tag}`);
};

module.exports = {
  generate_random_id,
};
