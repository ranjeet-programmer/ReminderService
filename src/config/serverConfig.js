const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  EMAIL_ID: process.env.EMAIL_ID,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  EXHANGE_NAME: process.env.EXHANGE_NAME,
  REMINDER_BINDING_KEY: process.env.REMINDER_BINDING_KEY,
  MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL,
};
