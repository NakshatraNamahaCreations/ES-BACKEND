const mongoose = require("mongoose");

const asinSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    category: {
      type: String,
    },
    sales_volume: {
      type: String,
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

const Asinmodel = mongoose.model("asin", asinSchema);
module.exports = Asinmodel;
