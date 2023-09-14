const payload_builder = (errors, process_result, message) => {
  return {
    processErrors: errors,
    process_result: process_result,
    message: message,
  };
};

module.exports = {
  payload_builder,
};
