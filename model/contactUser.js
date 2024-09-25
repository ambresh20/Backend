const mongoose = require("mongoose");

const contactUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
// Adds createdAt and updatedAt fields automatically

const ContactUser = mongoose.model("ContactUser", contactUserSchema);
module.exports = ContactUser;

