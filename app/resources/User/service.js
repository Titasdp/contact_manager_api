const User_model = require("./model");
const connection_instance = require("../../utils/database/connectionInstance");
const password_manager = require("../../utils/passwordManager");
const email_sender = require("../../utils/email/sender");
const id_generator = require("../../utils/idManager");
const payload_manager = require("../../utils/payloadManager");
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
    const password_hash = await password_manager.encrypt_password(
      generated_password
    );

    console.log("password -------" + generated_password);
    const inputs_array = [
      [
        id_generator.generate_random_id("user"),
        full_name,
        password_hash,
        email,
        phone_numb,
        locality,
        age,
      ],
    ];
    const result = await connection_instance
      .query(
        `INSERT INTO Users (user_id,full_name,password,email,phone_numb,locality,age) VALUES ${inputs_array
          .map((el) => "(?)")
          .join(",")};`,
        {
          replacements: inputs_array,
        },
        {
          model: User,
        }
      )
      .then((query_result) => {
        console.log(query_result);
      })
      .catch((error) => {
        let return_data = null;
        const error_report = error_handling.sequelize_error_handling(error);

        if (error_report.throw_exception) {
          return_data = payload_manager.payload_builder(
            null,
            {},
            "Ops Something when wrong...",
            500,
            error
          );
        } else
          return_data = payload_manager.payload_builder(
            error_report.errors,
            {},
            "",
            400,
            null
          );
        return return_data;
      });

    return result;

    // console.log(result);
    // const result = email_sender.email_sender(
    //   "tiagopina20014@gmail.com",
    //   "tiagopina20014.2@gmail.com",
    //   "something good",
    //   "<div>testing</div>"
    // );
  } catch (error) {
    return payload_manager.payload_builder(
      null,
      {},
      "Ops Something when wrong...",
      500,
      error
    );
  }
};

const login_process = async (email, password) => {
  try {
    console.log("here");
    const exec_query = `SELECT user_id,password FROM Users where email =:email`;
    const result = await connection_instance
      .query(
        exec_query,
        { replacements: { email: email } },
        {
          model: User,
        }
      )
      .then((query_result) => {
        console.log(query_result);
      })
      .catch((error) => {
        console.log(error);
        let return_data = null;
        const error_report = error_handling.sequelize_error_handling(error);

        if (error_report.throw_exception) {
          return_data = payload_manager.payload_builder(
            null,
            {},
            "Ops Something when wrong...",
            500,
            error
          );
        } else
          return_data = payload_manager.payload_builder(
            error_report.errors,
            {},
            "",
            400,
            null
          );
        return return_data;
      });

    return result;

    // console.log(result);
    // const result = email_sender.email_sender(
    //   "tiagopina20014@gmail.com",
    //   "tiagopina20014.2@gmail.com",
    //   "something good",
    //   "<div>testing</div>"
    // );
  } catch (error) {
    return payload_manager.payload_builder(
      null,
      {},
      "Ops Something when wrong...",
      500,
      error
    );
  }
};

module.exports = { register_process, login_process };
