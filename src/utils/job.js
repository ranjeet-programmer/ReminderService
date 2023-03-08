const cron = require("node-cron");
const emailService = require("../services/email-service");

const setupJobs = () => {
  cron.schedule("*/2 * * * *", async () => {
    const response = await emailService.fetchPendingEmails();

    response.forEach((email) => {
      emailService.sendBasicEmail(
        {
          from: "testing@airplane.com",
          to: email.recipientEmail,
          subject: email.subject,
          text: email.content,
        },
        async (err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log(data);

            await emailService.updateTicket(email.id, { status: "SUCCESS" });
          }
        }
      );
    });

    console.log(response);
  });
};

module.exports = setupJobs;