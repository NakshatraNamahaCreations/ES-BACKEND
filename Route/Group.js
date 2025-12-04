const express = require("express");
const router = express.Router();
const Group = require("../Model/group");
const User = require("../Model/Peoples/user"); // Ensure User model is imported
const Message = require("../Model/messageModel"); // Ensure Message model is imported

// Create a new group
router.post("/groups", async (req, res) => {
  const { name, members, createdBy } = req.body;

  if (!name || !members || !createdBy) {
    return res.status(400).send("Name, members, and createdBy are required.");
  }

  try {
    const group = new Group({ name, members, createdBy });
    await group.save();
    res.status(201).json(group);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating group");
  }
});

// Get groups for a specific user
router.get("/groups", async (req, res) => {
  const { userID } = req.query;

  if (!userID) {
    return res.status(400).send("UserID is required.");
  }

  try {
    const groups = await Group.find({ "members.id": userID });
    res.status(200).json(groups);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching groups");
  }
});

// Create a group (alternative route)
router.post("/create-group", async (req, res) => {
  const { groupName, members } = req.body;

  if (!groupName || !members) {
    return res.status(400).send("GroupName and members are required.");
  }

  try {
    const group = new Group({ groupName, members });
    await group.save();
    res.status(201).json(group);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating group");
  }
});

// Add a member to a group
router.post("/add-member", async (req, res) => {
  const { groupID, newMemberID } = req.body;

  if (!groupID || !newMemberID) {
    return res.status(400).send("GroupID and newMemberID are required.");
  }

  try {
    const group = await Group.findById(groupID);
    const user = await User.findById(newMemberID);

    if (!group || !user) {
      return res.status(404).send("Group or User not found.");
    }

    if (!group.members.find((member) => member.id === newMemberID)) {
      group.members.push({ id: user._id, username: user.username });
      await group.save();
    }

    res.status(200).json(group);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding member");
  }
});

// Remove a member from a group
router.post("/remove-member", async (req, res) => {
  const { groupID, memberID } = req.body;

  if (!groupID || !memberID) {
    return res.status(400).send("GroupID and memberID are required.");
  }

  try {
    const group = await Group.findById(groupID);

    if (!group) {
      return res.status(404).send("Group not found.");
    }

    group.members = group.members.filter((member) => member.id !== memberID);
    await group.save();

    res.status(200).json(group);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error removing member");
  }
});

// Delete a group
router.delete("/delete-group/:groupID", async (req, res) => {
  const { groupID } = req.params;

  try {
    const group = await Group.findByIdAndDelete(groupID);

    if (!group) {
      return res.status(404).send("Group not found.");
    }

    res.status(200).send("Group deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting group");
  }
});

// Get group chat history
router.get("/group-chat-history", async (req, res) => {
  const { groupID } = req.query;

  if (!groupID) {
    return res.status(400).send("GroupID is required.");
  }

  try {
    const messages = await Message.find({ groupID }).sort({ timestamp: 1 });
    res.status(200).json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving group chat history");
  }
});

module.exports = router;
