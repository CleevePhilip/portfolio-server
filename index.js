const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const nodemailer = require("nodemailer");
const port = 8000;
const data = "hello";

app.get("/", async (req, res) => {
  try {
    res.send(data);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
});
app.get("/test", async (req, res) => {
  try {
    res.send("Test:", data);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
