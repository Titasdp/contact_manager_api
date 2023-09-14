const transporter = require("../email/transporterDefinition");

const email_sender = async (sender, recipient, subject, text, body_html) => {
  const execution_result = {
    success: false,
    error_msg: "",
  };
  try {
    const sender_execution_response = await transporter.sendMail({
      from: `${sender}`,
      to: `${recipient}`,
      subject: `${recipient}`,
      text: `${subject}`,
      html: `${body_html}`,
    });

    execution_result.success = true;
  } catch (error) {
    execution_result.error_msg = error.message;
  } finally {
    return execution_result;
  }
};

module.exports = { email_sender };
