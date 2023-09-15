const bcrypt = require("bcrypt");
const aut_password_generator = async () => {
  const password_Charset =
    "abcdefghijklmnopqrstuvwxyz123456789ABCDEFGH1JKLMNOPQRSTUVWXYZ";
  let ramdom_pass = "";
  for (let i = 0; i < 10; i++) {
    ramdom_pass +=
      password_Charset[Math.floor(Math.random() * password_Charset.length)];
  }
  return ramdom_pass;
};

const encrypt_password = async (password) => {
  try {
    salt_rounds = 5;
    const salt = await bcrypt.genSalt(salt_rounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    throw error;
  }
};

const decrypt_password = async (entered_password, hashed_password) => {
  try {
    const response = await bcrypt.compare(entered_password, hashed_password);
    return response;
  } catch {}
};

module.exports = { aut_password_generator, decrypt_password, encrypt_password };
