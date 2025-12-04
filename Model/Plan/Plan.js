const mongoose = require("mongoose");

const planSchema = new mongoose.Schema(
  {
    planName: {
      type: String,
    },
    imagelink: {
      type: String,
    },
    priceDescription: {
      type: String,
    },
    price: {
      type: Number,
    },
    searchCount: {
      type: Number,
    },
    validPeriod: {
      type: String,
    },
    noOfPeriod: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Planmodel = mongoose.model("plan", planSchema);
module.exports = Planmodel;
