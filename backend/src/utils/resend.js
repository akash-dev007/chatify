const { Resend } = require("resend");
const dotenv = require('dotenv');
dotenv.config();
const resendClient = new Resend(process.env.RESEND_API_KEY);

const sender = {
  name: "Chatify",
  email: process.env.EMAIL_FROM
};
module.exports = { resendClient, sender };