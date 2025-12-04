const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
  {
    groupName: String,
    members: [
      {
        id: String,
        username: String,
      },
    ],
  },
  { timestamps: true }
);

const Group = mongoose.model("Group", groupSchema);
module.exports = Group;
