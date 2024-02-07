import express from "express";
import nodemailer from "nodemailer";
import dotenv from 'dotenv'
const app = express()
dotenv.config()
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});
app.use(express.json())
app.post('/send', async (req, res) => {
  try {
    const {name, email } = req.body;
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: `Hello ${name}`,
      text: `Thanks for subscribing`,
    };

    await transporter.sendMail(mailOptions).then(() => {
      res.status(200).json("mail send" );
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});
app.listen(4000, () => {
  console.log("listening to 4000");
});
