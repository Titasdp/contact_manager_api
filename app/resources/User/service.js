const User_model = require("./model");
const connection_instance = require("../../utils/database/connectionInstance");
const password_manager = require("../../utils/passwordManager");
const email_sender = require("../../utils/email/sender");
const id_generator = require("../../utils/idManager");
const payload_manager = require("../../utils/payloadManager");
const User = require("./model");
const error_handling = require("../../utils/database/sequelizeErrorHandling");
const token_manager = require("../../utils/tokenManager");

/**
 * register service
 * @param {String} full_name Name of the person
 * @param {String} email Email
 * @param {String} locality Locality introduct by the client
 * @param {Number} age Age introduced by the client
 * @param {String} phone_numb Valid Phone number introduced by the client
 * @returns payload_manager.payload_builder execution result
 */
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

    console.log(generated_password);
    const result = await connection_instance
      .query(
        `INSERT INTO User (user_id,full_name,password,email,phone_numb,locality,age) VALUES ${inputs_array
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
        return payload_manager.payload_builder(
          {},
          "The account has been created successfully, we have send you an email with the generated password.",
          201,
          null
        );
      })
      .catch((error) => {
        let return_data = null;
        const error_report = error_handling.sequelize_error_handling(error);

        if (error_report.throw_exception) {
          return_data = payload_manager.payload_builder(
            {},
            "Ops Something when wrong...",
            500,
            error
          );
        } else
          return_data = payload_manager.payload_builder(
            error_report.errors,
            "",
            400,
            null
          );
        return return_data;
      });

    return result;

  
    // const result = email_sender.email_sender(
    //   "tiagopina20014@gmail.com",
    //   "tiagopina20014.2@gmail.com",
    //   "something good",
    //   "<div>testing</div>"
    // );
  } catch (error) {
    return payload_manager.payload_builder(null, {}, 500, error);
  }
};

const login_process = async (email, password) => {
  try {
    const exec_query = `SELECT user_id,password FROM User where email =:email`;
    const result = await connection_instance
      .query(
        exec_query,
        { replacements: { email: email } },
        {
          model: User,
        }
      )
      .then(async (query_result) => {
        if (!query_result[0].length) {
          return payload_manager.payload_builder(
            {
              message: "There is no user register with those credencials...",
              error_type: "Wrong Credencials",
              cause_error_field: "password or email",
            },
            {},
            404,
            null
          );
        }

        const valid_password = await password_manager.decrypt_password(
          password,
          query_result[0][0].password
        );

        if (!valid_password)
          return payload_manager.payload_builder(
            {
              message: "There is no user register with those credencials...",
              error_type: "Wrong Credencials",
              cause_error_field: "password or email",
            },
            {},
            404,
            null
          );

        return payload_manager.payload_builder(
          {
            token: await token_manager.create_token(
              query_result[0][0].user_id,
              "5d"
            ),
          },
          "The login process was a sucess...",
          200,
          null
        );
      })
      .catch((error) => {
        console.log(error);
        let return_data = null;
        return_data = payload_manager.payload_builder(
          {},
          "Ops Something when wrong...",
          500,
          error
        );

        return return_data;
      });

    return result;
    // const result = email_sender.email_sender(
    //   "tiagopina20014@gmail.com",
    //   "tiagopina20014.2@gmail.com",
    //   "something good",
    //   "<div>testing</div>"
    // );
  } catch (error) {
    return payload_manager.payload_builder(
      {},
      "Ops Something when wrong...",
      500,
      error
    );
  }
};

const get_user_data_by_id_service = async (user_id, send_password = true) => {
  const exec_query = send_password
    ? `select full_name, password,email,locality,age from User where user_id =:user_id`
    : `select full_name,email,locality,age from User where user_id =:user_id`;

  try {
    const result = await connection_instance
      .query(
        exec_query,
        { replacements: { user_id: user_id } },
        {
          model: User,
        }
      )
      .then((query_result) => {
        if (!query_result[0].length) {
          return payload_manager.payload_builder(
            {},
            "Your are unauthorized of acessing this resource.",
            401,
            null
          );
        }

        return payload_manager.payload_builder(
          {
            user: query_result[0][0],
          },
          "The login process was a sucess...",
          200,
          null
        );
      })
      .catch((error) => {
        console.log(error);
        let return_data = null;
        return_data = payload_manager.payload_builder(
          {},
          "Ops Something when wrong...",
          500,
          error
        );

        return return_data;
      });

    return result;
  } catch (error) {
    return payload_manager.payload_builder(
      {},
      "Ops Something when wrong...",
      500,
      error
    );
  }
};

const patch_password_process = async (
  new_password,
  password_confirmation,
  old_password,
  user_id,
  old_password_hash
) => {
  if (new_password !== password_confirmation) {
    return payload_manager.payload_builder(
      {
        message:
          "The new password and the confirmation password input does not match.",
        error_type: "Bad input",
        cause_error_field: "Password or confirmation Password",
      },
      "",
      422,
      null
    );
  }
  const valid_password = await password_manager.decrypt_password(
    old_password,
    old_password_hash
  );

  if (!valid_password)
    return payload_manager.payload_builder(
      {},
      "Current password is wrong, please try again.",
      404,
      null
    );

  try {
    const password_hash = await password_manager.encrypt_password(new_password);
    const exec_query = `UPDATE User SET User.password =:password_hash  Where User.user_id=:user_id`;
    const result = await connection_instance
      .query(
        exec_query,
        { replacements: { user_id: user_id, password_hash: password_hash } },
        {
          model: User,
        }
      )
      .then(async (query_result) => {
        return payload_manager.payload_builder(
          {},
          "Your password has been successfully updated.",
          200,
          null
        );
      })
      .catch((error) => {
        console.log(error);
        let return_data = null;
        return_data = payload_manager.payload_builder(
          {},
          "Ops Something when wrong...",
          500,
          error
        );

        return return_data;
      });

    return result;
  } catch (error) {
    return payload_manager.payload_builder(
      {},
      "Ops Something when wrong...",
      500,
      error
    );
  }
};

const update_information_process = async (
  full_name,
  locality,
  age,
  phone_numb,
  user_id
) => {
  try {
    const exec_query = `UPDATE User SET User.full_name =:full_name,User.locality =:locality, User.age =:age,User.phone_numb =:phone_numb , User.updated_at =:updated_at Where User.user_id=:user_id`;
    const result = await connection_instance
      .query(
        exec_query,
        {
          replacements: {
            user_id: user_id,
            full_name: full_name,
            locality: locality,
            age: age,
            phone_numb: phone_numb,
            updated_at: new Date(),
          },
        },
        {
          model: User,
        }
      )
      .then(async (query_result) => {
        return payload_manager.payload_builder(
          {},
          "Your information have has been successfully updated.",
          200,
          null
        );
      })
      .catch((error) => {
        console.log(error);
        let return_data = null;
        return_data = payload_manager.payload_builder(
          {},
          "Ops Something when wrong...",
          500,
          error
        );

        return return_data;
      });

    return result;
  } catch (error) {
    return payload_manager.payload_builder(
      {},
      "Ops Something when wrong...",
      500,
      error
    );
  }
};

module.exports = {
  register_process,
  login_process,
  get_user_data_by_id_service,
  patch_password_process,
  update_information_process,
};
