const mongoose = require("mongoose");

const GoogleUserSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  displayName: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String },
});

const GoogleUser = mongoose.model("GoogleUser", GoogleUserSchema);
module.exports = GoogleUser;






