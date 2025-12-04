const mongoose = require("mongoose");

const broadCastingSchema = new mongoose.Schema(
  {
    message: String,
    image: String,
  },
  {
    timestamps: true,
  }
);

const broadCasting = mongoose.model("broadCasting", broadCastingSchema);

module.exports = broadCasting;
