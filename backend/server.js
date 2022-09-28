const express = require("express");
const dotenv = require("dotenv");
const chats = require("./data/data");
const app = express();
dotenv.config();
app.get("/", (req, res) => {
  res.send("Hello ");
});

app.get("/api/chat", (req, res) => {
  res.send(chats);
});

app.get("/api/chat/:id", (req, res) => {
  const id = req.params._id;
  const chat = chats.find((chat) => chat.id === id);
  res.send(chat);
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
