var express = require("express");
var router = express.Router();
var nodeMailer = require("nodemailer");

router.get("/", function(req, res, next) {
  res.render("contact", { title: "Contact" });
});

router.post("/send", (req, res, next) => {
  let transporter = nodeMailer.createTransport({
    service: "Gmail",
    auth: {
      user: "nodejs.pcrepair@gmail.com",
      pass: "nodejspcrepair"
    }
  });

  let mailOptions = {
    from: "PC Repair <nodejs.pcrepair@gmail.com>",
    to: ["agildav@gmail.com"],
    subject: "Hello from PC Repair",
    text: `You have a submission from: Name: ${req.body.name} Email: ${
      req.body.email
    } Message: ${req.body.message}`,
    html: `<h1>You have a submission from:</h1><ul> <li>Name: ${
      req.body.name
    }</li><li> Email: ${req.body.email}</li><li> Message: ${
      req.body.message
    }</li></ul>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return console.log(error);
    console.log("Message sent: ", info.response);
    res.redirect("/");
  });
});

module.exports = router;
