const Message = require("../Model/messageModel.js");

const Chat = require("../Model/chatModel.js");

class message {

 async getAllMessages(req, res) {
    const userid = req.params.userid;
    try {
      const messages = await Message.find({
        chatId: "66b0d2fc9de354ac9fe6a5d9",
      });

      res.status(200).json({ messages });
    } catch (error) {
      // Log the error for debugging
      console.error("Error fetching all users:", error);

      // Respond with an error status and message
      res.status(500).json({ error: "Server error. Please try again later." });
    }
  }

  async sendMessage(req, res) {
    const { chatId, message } = req.body;
    try {
      let msg = await Message.create({
        sender: req.rootUserId,
        message,
        chatId,
      });
      msg = await (
        await msg.populate("sender", "name profilePic email")
      ).populate({
        path: "chatId",
        select: "chatName isGroup users",
        model: "Chat",
        populate: {
          path: "users",
          select: "name email profilePic",
          model: "User",
        },
      });
      await Chat.findByIdAndUpdate(chatId, {
        latestMessage: msg,
      });
      res.status(200).send(msg);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  }

  async getMessages(req, res) {
    const { chatId } = req.params;
    try {
      let messages = await Message.find({ chatId })
        .populate({
          path: "sender",
          model: "User",
          select: "name profilePic email",
        })
        .populate({
          path: "chatId",
          model: "Chat",
        });

      res.status(200).json(messages);
    } catch (error) {
      res.sendStatus(500).json({ error: error });
      console.log(error);
    }
  }
}

const messageControllers = new message();
module.exports = messageControllers;
