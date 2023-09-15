const payload_builder = (errors, process_result, message, resp_code, error) => {
  return {
    error: error,
    resp_code: resp_code,
    datas: {
      to_client_errors: errors,
      process_result: process_result,
      message: message,
    },
  };
};

module.exports = {
  payload_builder,
};
