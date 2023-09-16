const payload_builder = (result, message, resp_code, error) => {
  return {
    error: error,
    resp_code: resp_code,
    datas: {
      process_result: result,
      message: message,
    },
  };
};

module.exports = {
  payload_builder,
};
