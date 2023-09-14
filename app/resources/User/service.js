const User_model = require("./model");
const conection_instance = require("../../utils/database/connectionInstance");
const password_manager = require("../../utils/passwordManager");
const email_sender = require("../../utils/email/sender");
const sanitazation_rules = require("./sanitazationRules");

const register_process = async (
  full_name,
  email,
  locality,
  age,
  phone_numb
) => {
  const generated_password = await password_manager.aut_password_generator();
  try {
    const value = await password_manager.encrypt_password(generated_password);
    console.log(value);
    const compar_result = await password_manager.decrypt_password(
      generated_password,
      value
    );
    console.log(compar_result)
  } catch (error) {}

  // console.log()

  // const data_array = [
  //   "ud",
  //   full_name,
  //   password,
  //   email,
  //   phone_numb,
  //   locality,
  //   age,
  // ];

  // console.log("failed");

  // const task_execution_response = await conection_instance
  //   .query(
  //     `INSERT INTO User (user_id,full_name,password,email,phone_numb,locality,age) VALUES ${data_array
  //       .map((data) => "(?)")
  //       .join(",")};`,
  //     {
  //       replacements: data_array,
  //     },
  //     {
  //       model: User_model.User,
  //     }
  //   )
  //   .then((data) => {
  //     respCode = 200;
  //     if (data.length === 0) {
  //       respCode = 204;
  //     }
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     respCode = 500;
  //   });
};

module.exports = { register_process };
