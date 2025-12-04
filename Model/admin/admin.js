const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    number: String,
    name: String,

    status: String,
  },
  {
    timestamps: true,
  }
);

const adminModel = mongoose.model("admin", adminSchema);
module.exports = adminModel;
