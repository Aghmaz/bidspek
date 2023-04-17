const { MailtrapClient } = require("mailtrap");

const TOKEN = "d940535d10f42b55a00ea928c66f7b86";
const ENDPOINT = "https://send.api.mailtrap.io/";

const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

const sender = {
  email: "myemail@icardsapp.com",
  name: "iCard 7kc",
};

const msgDetails = (to, password) => {
  const recipients = [
    {
      email: to,
    },
  ];
  return client
    .send({
      from: sender,
      to: recipients,
      subject: "Password Forget",
      text: password,
      category: "Integration Test",
    })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};

module.exports = { msgDetails };
