const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const { PORT, REMINDER_BINDING_KEY } = require("./config/serverConfig");
const { createChannel, subscribeMessage } = require("./utils/messageQueue");

const jobs = require("./utils/job");

const TicketController = require("./controllers/ticket-controller");

const setupAndStartServer = async () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // const channel = await createChannel();

  app.post("/api/v1/tickets", TicketController.create);

  const channel = await createChannel();

  subscribeMessage(channel, undefined, REMINDER_BINDING_KEY);

  app.listen(PORT, () => {
    console.log(` server started on port ${PORT}`);
    jobs();
  });
};

setupAndStartServer();
