const amqplib = require("amqplib");

const { MESSAGE_BROKER_URL, EXHANGE_NAME } = require("../config/serverConfig");

const createChannel = async () => {
  try {
    const connection = await amqplib.connect(MESSAGE_BROKER_URL);

    const channel = await connection.createChannel();

    await channel.assertExchange(EXHANGE_NAME, "direct", false);

    return channel;
  } catch (error) {
    throw error;
  }
};

const subscribeMessage = async (channel, service, bindingKey) => {
  try {
    const appplicationQueue = await channel.assertQueue("QUEUE_NAME");

    channel.bindQueue(appplicationQueue.queue, EXHANGE_NAME, bindingKey);

    channel.consume(appplicationQueue.queue, (msg) => {
      console.log("received data ");
      console.log(msg.content.toString());
      channel.ack(msg);
    });
  } catch (error) {
    throw error;
  }
};

const publishMessage = async (channel, bindingKey, message) => {
  try {
    await channel.assertQueue(QUEUE_NAME);

    await channel.publish(EXHANGE_NAME, bindingKey, Buffer.from(message));
  } catch (error) {
    throw error;
  }
};

module.exports = {
  subscribeMessage,
  createChannel,
  publishMessage,
};
