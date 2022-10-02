const express = require("express");
const dotenv = require("dotenv");
const chats = require("./data/data");
const connectDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const app = express();
dotenv.config();
connectDB();
app.use(express.json()); // To accept json data
app.get("/", (req, res) => {
  res.send("Hello ");
});

// app.get("/api/chat", (req, res) => {
//   res.send(chats);
// });

app.get("/api/chat/:id", (req, res) => {
  const id = req.params._id;
  const chat = chats.find((chat) => chat.id === id);
  res.send(chat);
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`.yellow.bold);
});
