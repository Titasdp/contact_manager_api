const nodemailer = require("nodemailer");
require("dotenv").config();

const email_transporter = nodemailer.createTransport({
  host: `${process.env.NODEMAILER_HOST}`,
  port: `${process.env.NODEMAILER_PORT}`,
  secure: true,
  auth: {
    user: `${process.env.NODEMAILER_USERNAME}`,
    pass: `${process.env.NODEMAILER_PASSWORD}`,
  },
});
