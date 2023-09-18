require("dotenv").config();
const fs = require('fs');
const transporter = require("../email/transporterDefinition");
const handlebars = require('handlebars');
const email_template = fs.readFileSync('app/utils/email/templates/password-generated-email.hbs', 'utf8');
const compiled_template = handlebars.compile(email_template);


const email_sender = async ( recipient, subject, message) => {
  const execution_result = {
    success: false,
    error_msg: "",
  };
  try {
    const options = {
      from: process.env.NODEMAILER_USERNAME,
      to: recipient,
      subject: `${subject}`,
      html: compiled_template({
        subject: `${subject}`,
        greeting: 'Hello!',
        message: message
      })
    };



 const result =    await transporter.email_transporter.sendMail(options)
    execution_result.success = true;
  } catch (error) {

    console.log(error)
    execution_result.error_msg = error.message;
  } finally {
    return execution_result;
  }
};

module.exports = { email_sender };
