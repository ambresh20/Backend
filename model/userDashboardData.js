const mongoose = require("mongoose");

const UserDashboardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
      required: true,
    },
	interest: {
		type: String,
		required: true,
	},
	bio: {
		type: String,
	}
  },
  { timestamps: true }
);
// Adds createdAt and updatedAt fields automatically

const UserDashboard = mongoose.model("UserDashboard", UserDashboardSchema);
module.exports = UserDashboard ;

