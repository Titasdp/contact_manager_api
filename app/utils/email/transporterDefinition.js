const nodemailer = require("nodemailer");
const smtp_transport = require("nodemailer-smtp-transport");

require("dotenv").config();

console.log(process.env.NODEMAILER_HOST);

const email_transporter = nodemailer.createTransport(
  smtp_transport({
    host: "mail.frejen.pt",
    port: 465,
    secureConnection: true,
    auth: {
      user: "desafio@frejen.pt",
      pass: "h1qlsYjnnA9",
    },
    tls: {
      // h1qlsYjnnA9
      rejectUnauthorized: false
    },
  })
);

module.exports = {
  email_transporter,
};
