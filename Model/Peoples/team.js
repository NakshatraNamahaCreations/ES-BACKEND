const mongoose = require("mongoose");

const teamsSchema = new mongoose.Schema(
  {
    name: String,
    // phoneNumber: String,
    password: String,
    email: String,
    // website: Boolean,
    // youtubeVideo: Boolean,
    // broadcast: Boolean,
    // payment: Boolean,
    // tryToBook: Boolean,
    // pricing: Boolean,
    // banner: Boolean,
    // chat: Boolean,
    // // coupon: Boolean,
    // team: Boolean,
    // // user: Boolean,
    // // freeMaterial: Boolean,
    // campaign: Boolean,
    // course: Boolean,
    // // selfService: Boolean,
    Courses: Boolean,
    userapp: Boolean,
    tryToBook: Boolean,
    People: Boolean,
    Payments: Boolean,
    Chat: Boolean,
    Pricing: Boolean,
    Marketing: Boolean,
    Paymentkey: Boolean,
    Coupon: Boolean,
    team: Boolean,
 Dashboard: Boolean,
  },
  {
    timestamps: true,
  }
);

const TeamMembers = mongoose.model("TeamMembers", teamsSchema);
module.exports = TeamMembers;
