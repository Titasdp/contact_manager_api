const connection_instance = require("../../utils/database/connectionInstance");
const payload_manager = require("../../utils/payloadManager");
const Contact = require("./model");
const error_handling = require("../../utils/database/sequelizeErrorHandling");

const get_user_data_by_id_service = async (user_id) => {
  const exec_query = `select email,phone_numb, address, locality,obs, full_name from Contact where user_id =:user_id`;
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
        return payload_manager.payload_builder(
          {},
          "The Contact has been added to your list of contacts",
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
  } catch (error) {
    return payload_manager.payload_builder(null, {}, 500, error);
  }
};

const delete_contact_service = async (user_id, email, phone_numb) => {
  let exec_query = `DELETE FROM Contact Where email =:email AND user_id=:user_id AND phone_numb =:phone_numb;`;
  try {
    const result = await connection_instance
      .query(
        exec_query,
        {
          replacements: {
            email: email,
            phone_numb: phone_numb,
            user_id: user_id,
          },
        },
        {
          model: Contact,
        }
      )
      .then((query_result) => {
        return payload_manager.payload_builder(
          {},
          "The Contact has been Deleted",
          200,
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
  } catch (error) {
    return payload_manager.payload_builder(null, {}, 500, error);
  }
};

const update_user_contact_service = async (
  user_id,
  old_email,
  old_phone_numb,
  full_name,
  email,
  phone_numb,
  locality,
  address,
  obs
) => {
  let exec_query = `UPDATE Contact SET Contact.full_name=:full_name, Contact.email=:email, Contact.locality=:locality,Contact.address=:address,Contact.phone_numb=:phone_numb,Contact.obs=:obs,Contact.updated_at =:updated_at Where email =:old_email AND user_id=:user_id AND phone_numb =:old_phone_numb;`;
  try {
    const result = await connection_instance
      .query(
        exec_query,
        {
          replacements: {
            user_id: user_id,
            old_email: old_email,
            old_phone_numb: old_phone_numb,
            full_name: full_name,
            email: email,
            phone_numb: phone_numb,
            locality: locality,
            address: address,
            obs: obs,
            updated_at: new Date(),
          },
        },
        {
          model: Contact,
        }
      )
      .then((query_result) => {
        return payload_manager.payload_builder(
          {},
          "your contact have been successfuly updated.",
          200,
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
  } catch (error) {
    return payload_manager.payload_builder(null, {}, 500, error);
  }
};

module.exports = {
  get_user_data_by_id_service,
  create_contact_service,
  delete_contact_service,
  update_user_contact_service,
};
