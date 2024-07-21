const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.get("/contactus", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "contactus.html"));
});

app.post("/success", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "success.html"));
});

app.get("/messages", (req, res) => {
  fs.readFile("messages.json", (err, data) => {
    if (err) throw err;
    const messages = JSON.parse(data);
    res.json(messages);
  });
});

app.post("/send", (req, res) => {
  const { username, message } = req.body;
  fs.readFile("messages.json", (err, data) => {
    if (err) throw err;
    const messages = JSON.parse(data);
    messages.push({ username, message });
    fs.writeFile("messages.json", JSON.stringify(messages), (err) => {
      if (err) throw err;
      res.sendStatus(200);
    });
  });
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "notfound.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
