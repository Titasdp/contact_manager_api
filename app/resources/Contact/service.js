const connection_instance = require("../../utils/database/connectionInstance");
const password_manager = require("../../utils/passwordManager");
const email_sender = require("../../utils/email/sender");
const id_generator = require("../../utils/idManager");
const payload_manager = require("../../utils/payloadManager");
const Contact = require("./model");
const error_handling = require("../../utils/database/sequelizeErrorHandling");
const token_manager = require("../../utils/tokenManager");

const get_user_data_by_id_service = async (user_id) => {
  const exec_query = `select email,phone_numb, address, locality,obs from Contact where user_id =:user_id`;
  try {
    const result = await connection_instance
      .query(
        exec_query,
        { replacements: { user_id: user_id } },
        {
          model: Contact,
        }
      )
      .then((query_result) => {
        return payload_manager.payload_builder(
          {
            contacts: query_result[0],
          },
          "",
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

const create_contact_service = async (
  full_name,
  email,
  phone_numb,
  user_id,
  address,
  locality,
  obs
) => {
  console.log("here man");
  try {
    const inputs_array = [
      [full_name, email, phone_numb, address, locality, obs, user_id],
    ];

    const result = await connection_instance
      .query(
        `INSERT INTO Contact (full_name,email,phone_numb,address,locality,obs,user_id) VALUES ${inputs_array
          .map((el) => "(?)")
          .join(",")};`,
        {
          replacements: inputs_array,
        },
        {
          model: Contact,
        }
      )
      .then((query_result) => {
        console.log(query_result);
        return payload_manager.payload_builder(
          {},
          "The Contact has been added to your list of contacts",
          201,
          null
        );
      })
      .catch((error) => {
        let return_data = null;
        console.log("inside this shit");
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

        console.log(return_data);
        return return_data;
      });

    return result;
  } catch (error) {
    return payload_manager.payload_builder(null, {}, 500, error);
  }
};

module.exports = { get_user_data_by_id_service, create_contact_service };
