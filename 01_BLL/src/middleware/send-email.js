const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

let MailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "BonApp",
    link: process.env.URL,
  },
});

const sendSignupEmail = (userEmail, name) => {
  let response = {
    body: {
      name,
      intro: "Welcome to BonApp! We're very excited to have you on board.",
    },
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: process.env.EMAIL_ADDRESS,
    to: userEmail,
    subject: "Welcome to BonApp!",
    html: mail,
  };

  transporter
    .sendMail(message)
    .then(() => {
      console.log(`Mail successfully sent to ${userEmail}`);
    })
    .catch((error) => console.error(error));
};

const sendReceiptEmail = (userEmail, name, items, totalPrice) => {
  let response = {
    body: {
      name,
      intro: "Your order has been placed!",
      table: {
        data: items.toObject(),
        columns: {
          // Optionally, customize the column widths
          customWidth: {
            price: "15%",
            quantity: "15%",
          },
          // Optionally, change column text alignment
          customAlignment: {
            price: "center",
            quantity: "center",
          },
        },
      },
      outro: [
        `<strong>Total: ${totalPrice}₪</strong>`,
        `Looking forward to see you again soon!`,
      ],
    },
  };
  let mail = MailGenerator.generate(response);
  let message = {
    from: process.env.EMAIL_ADDRESS,
    to: userEmail,
    subject: "Your order has been placed!",
    html: mail,
  };

  transporter
    .sendMail(message)
    .then(() => {
      console.log(`Mail successfully sent to ${userEmail}`);
    })
    .catch((error) => console.error(error));
};

module.exports = {
  sendSignupEmail,
  sendReceiptEmail,
};
