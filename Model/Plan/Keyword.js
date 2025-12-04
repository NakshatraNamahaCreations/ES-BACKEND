const mongoose = require("mongoose");

const keywordSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    category: {
      type: String,
    },
    sales_volume: {
      type: Number,
    },
    product_price: {
      type: String,
    },
    asin: {
      type: String,
    },
    product_title: {
      type: String,
    },
    randomGeneratedNumber: {
      type: Number,
    },
    product_star_rating: {
      type: String,
    },
    product_num_ratings: {
      type: String,
    },

    product_url: {
      type: String,
    },
    product_photo: {
      type: String,
    },
  },
  { timestamps: true }
);

const Keywordmodel = mongoose.model("keyword", keywordSchema);
module.exports = Keywordmodel;
