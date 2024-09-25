const mongoose = require("mongoose");

const AdminUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
	  unique: true,
    },
    password: {
      type: String,
	  require: true,
    },
  },
  { timestamps: true }
);
// Adds createdAt and updatedAt fields automatically

const AdminUser = mongoose.model("AdminUser", AdminUserSchema );
module.exports = AdminUser ;

