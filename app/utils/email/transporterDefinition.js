const nodemailer = require("nodemailer");
const smtp_transport = require("nodemailer-smtp-transport");

require("dotenv").config();


const email_transporter = nodemailer.createTransport(
  smtp_transport({
    host: `${process.env.NODEMAILER_HOST}`,
    port:  `${process.env.NODEMAILER_PORT}`,
    secureConnection: true,
    auth: {
      user: `${process.env.NODEMAILER_USERNAME}`,
      pass: `${process.env.NODEMAILER_PASSWORD}`
    },
    tls: {
      rejectUnauthorized: false
    },
  })
);

module.exports = {
  email_transporter,
};
