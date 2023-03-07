const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const { PORT } = require("./config/serverConfig");

const { sendBasicEmail } = require("./services/email-service");

const setupAndStartServer = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.listen(PORT, () => {
    console.log(` server started on port ${PORT}`);
  });

  sendBasicEmail(
    "support@testing.com",
    "ranjeethingeofficial@gmail.com",
    "Welcome to the Backend Course",
    "Please submit a below form so that it will help's to you"
  );
};

setupAndStartServer();
