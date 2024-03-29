import express from "express";
import nodemailer from "nodemailer";
import dotenv from 'dotenv'
import cors from 'cors'
const app = express()
const port = process.env.PORT || 4000
dotenv.config()
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});
app.use(cors())
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
app.listen(port, () => {
  console.log("listening to 4000");
});
