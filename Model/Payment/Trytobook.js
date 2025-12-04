const mongoose = require("mongoose");

const trytobookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    mobilenumber: {
      type: String,
    },
    planname: {
      type: String,
    },
    price: {
      type: Number,
    },
    date: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Trytobookmodel = mongoose.model("trytobook", trytobookSchema);
module.exports = Trytobookmodel;
