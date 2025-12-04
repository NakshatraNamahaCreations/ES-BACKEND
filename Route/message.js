const express = require("express");
const router = express.Router();

const Message = require("../Model/messageModel.js");

// Add chat-history route to the router
router.get("/chat-history", async (req, res) => {
  const { userID, contactID } = req.query;

  if (!userID || !contactID) {
    return res.status(400).send("userID and contactID are required");
  }

  try {
    const messages = await Message.find({
      $or: [
        { senderID: userID, receiverID: contactID },
        { senderID: contactID, receiverID: userID },
      ],
    }).sort({ timestamp: 1 });

    res.status(200).json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving chat history");
  }
});

module.exports = router;

