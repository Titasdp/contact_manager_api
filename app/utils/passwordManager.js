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

module.exports = { aut_password_generator };
