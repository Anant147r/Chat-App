const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");

const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;
  if (!content || !chatId) {
    console.log("Invalid data passed into the request");
    return res.sendStatus(400);
  }
  var newMessage = {
    sender: req.user._id,
    content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);
    message = await message.populate("sender", "name pic").execPopulate();
    message = await message.populate("chat").execPopulate();
  } catch (err) {}
});

module.exports = { sendMessage };
