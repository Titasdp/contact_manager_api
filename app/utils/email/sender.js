const transporter = require("../email/transporterDefinition");

const email_sender = async (sender, recipient, subject, body_html) => {
  const execution_result = {
    success: false,
    error_msg: "",
  };
  try {
    await transporter.email_transporter.sendMail({
      from: `desafio@frejen.pt`,
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
