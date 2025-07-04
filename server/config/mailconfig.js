const nodemailer = require("nodemailer")
const {MAIL_PASS,MAIL_ID} = require("../utility/keys")

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: 'smtp.gmail.com',
   port: 465,
   secure: true,
  auth: {
    user: MAIL_ID,
    pass: MAIL_PASS,
  },
});

const sender = {
    email : "geopulse.noreply@gmail.com",
    name : "GeoPulse Services"
}

module.exports = {transporter , sender};