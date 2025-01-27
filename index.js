const express = require("express");
const app = express();
const port = 3000;
const data = [
  {
    id: 1,
    name: "test",
  },
  {
    id: 2,
    name: "test",
  },
  {
    id: 3,
    name: "test",
  },
];

app.get("/", (req, res) => {
  res.send(data);
});

app.listen(port, () => {
  console.log("server is running");
});
