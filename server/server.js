const express = require("express");
const PORT = 8000;
const app = express();

app.get("/", async (req, res) => {
  try {
    res.json({ message: "success" });
  } catch (error) {
    console.log("error", error);
  }
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
