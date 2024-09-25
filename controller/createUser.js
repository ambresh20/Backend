const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load environment variables

const SECRET_KEY = process.env.SECRET_KEY || "ambresh";

// Registration function
const registration = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    dob,
    address,
    city,
    pin,
  } = req.body;

  try {
    let user = await User.findOne({ email });

    if (
      !firstName ||
      !lastName ||
      !phone ||
      !dob ||
      !email ||
      !password ||
      !address ||
      !city ||
      !pin
    ) {
      console.log("Not all fields...");
      return res.status(400).json({
        status: 400,
        message: "Please fill all fields",
      });
    }

    if (user) {
      return res.status(400).json({ message: "User already Register" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      dob,
      address,
      city,
      pin,
    });

    await user.save();

    const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res
      .status(201)
      .json({
        status: 2001,
        message: "User Registration Successfully",
        data: user,
        token: token,
      });
  } catch (error) {
    console.error("Error during Registration:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = registration;
