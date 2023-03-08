const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const { PORT } = require("./config/serverConfig");

const jobs = require("./utils/job");

const TicketController = require("./controllers/ticket-controller");

const setupAndStartServer = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.post("/api/v1/tickets", TicketController.create);

  app.listen(PORT, () => {
    console.log(` server started on port ${PORT}`);
    jobs();
  });
};

setupAndStartServer();
