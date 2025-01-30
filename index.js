const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const nodemailer = require("nodemailer");
const port = process.env.PORT || 3000; // Set default port if not in env
const data = "hello";

app.get("/", async (req, res) => {
  try {
    res.send(data);
    console.log(data); // Logging for debugging
  } catch (error) {
    console.log(error);
  }
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "https://portfoliocleeve.vercel.app/", // You might want to restrict this to specific domains for security
    credentials: true,
  })
);

app.post("/send_mail", async (req, res) => {
  try {
    const { email, name, message, captcha } = req.body; // Get values from the request body

    if (!email || !name || !message || !captcha) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Validate CAPTCHA here if needed

    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      auth: {
        user: process.env.SMTP_USER, // Store this in .env
        pass: process.env.PASSWORD_LOGIN,
      },
    });

    const mailOptions = {
      from: process.env.ORIGIN_EMAIL,
      to: process.env.SENDTO_EMAIL,
      subject: "PORTFOLIO CONTACT ME",
      text: `EMAIL: ${email}\nNAME: ${name}\nMESSAGE: ${message}`,
    };

    // Send the email using async/await
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.response);
    res
      .status(200)
      .json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error.message);
    res.status(500).json({ error: "Failed to send email" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
