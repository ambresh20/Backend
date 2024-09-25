const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      // required: true,
    },
    phone: {
      type: String,
      // required: true,
    },
    dob: {
      type: String,
      // required: true,
    },
    address: {
      type: String,
      // required: true,
    },
    city: {
      type: String,
      // required: true,
    },
    pin: {
      type: Number,
      // required: true,
    },
  },
  { timestamps: true }
);
// Adds createdAt and updatedAt fields automatically

const User = mongoose.model("User", userSchema);
module.exports = User;
