const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema({
  senderID: String,
  receiverID: String,
  content: String,
  type: String,
  groupID: String,
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;

