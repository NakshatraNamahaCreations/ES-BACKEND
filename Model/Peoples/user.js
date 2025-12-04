const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new Schema(
  {
    username: String,
    phoneNumber: String,
    email: String,
    gender: String,
    password: String,
    dateOfBirth: Date,
    profilePicture: String,
    courseDetails: Array,
    videoDetails: Array,
    fcmToken: String,
    firebaseUserId: String,
    otp: String,
socketID: { type: String, default: null },
    searchcount: {
      type: Number,
      default: 0, // Provide a default value for `count`
    },
     searchLimit: { type: Number, default: 10 },
    expiryDate: { type: Date },
    paymentdate: { type: Date },
    bio: {
      type: String,
      default: "Available",
    },
    profilePic: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
 usedCoupons: [{ type: String }],
    contacts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);




userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign(
      { id: this._id, email: this.email },
      process.env.SECRET,
      {
        expiresIn: "365d",
      }
    );

    return token;
  } catch (error) {
    console.log("error while generating token");
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;
