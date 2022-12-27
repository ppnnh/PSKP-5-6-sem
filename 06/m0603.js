const nodemailer = require("nodemailer");

const password = "memjilroirjjlbfx";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: false,
  service: "Gmail",
  auth: {
    user: "leraburanko@gmail.com",
    pass: password,
  },
});

var sender;

const receiver = "leraburanko@gmail.com";

send = (message) => {
  const mailOptions = {
    from: sender,
    to: receiver,
    subject: "Lab6",
    text: message,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    err ? console.log(err) : console.log("Sent: " + info.response);
  });
};

module.exports = send;
