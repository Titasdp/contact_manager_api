const User_model = require("./model");
const connection_instance = require("../../utils/database/connectionInstance");
const password_manager = require("../../utils/passwordManager");
const email_sender = require("../../utils/email/sender");
const id_generator = require("../../utils/idManager");
const payload_builder = require("../../utils/payloadManager");
const User = require("./model");
const error_handling = require("../../utils/database/sequelizeErrorHandling");
const register_process = async (
  full_name,
  email,
  locality,
  age,
  phone_numb
) => {
  const generated_password = await password_manager.aut_password_generator();
  try {
    // const value = await password_manager.encrypt_password(generated_password);
    // const inputs_array = [
    //   [
    //     id_generator.generate_random_id("user"),
    //     full_name,
    //     generated_password,
    //     email,
    //     phone_numb,
    //     locality,
    //     age,
    //   ],
    // ];
    // const result = await connection_instance
    //   .query(
    //     `INSERT INTO Users (user_id,full_name,password,email,phone_numb,locality,age) VALUES ${inputs_array
    //       .map((el) => "(?)")
    //       .join(",")};`,
    //     {
    //       replacements: inputs_array,
    //     },
    //     {
    //       model: User,
    //     }
    //   )
    //   .then((query_result) => {
    //     console.log(query_result);
    //     return "adsa";
    //   })
    //   .catch((error) => {
    //     const error_report = error_handling.sequelize_error_handling(error);

    //     return "adsadsd";
    //   });

    // console.log(result);
    const result = email_sender.email_sender(
      "tiagopina20014@gmail.com",
      "tiagopina20014.2@gmail.com",
      "something good",
      "<div>testing</div>"
    );
  } catch (error) {
    console.log(error);
  }

  // console.log()
};

module.exports = { register_process };
