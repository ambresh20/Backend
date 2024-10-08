const User = require("../model/user");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
require("dotenv").config();

const hashPassword = async (userPassword) => {
  const saltRound = 10;
  return await bcrypt.hash(userPassword, saltRound);
};

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).send({ message: "Please provide email" });
    }

    const checkUser = await User.findOne({ email });

    if (!checkUser) {
      return res
        .status(400)
        .send({ message: "User not found please register" });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.MY_GMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });

    const receiver = {
      from: "ambreshvaishya52@gmail.com",
      to: email,
      subject: "Password Reset Request",
      text: `Click on this link to generate your new password ${process.env.CLIENT_URL}/reset-password/${token}`,
    };

    await transporter.sendMail(receiver);

    return res.status(200).send({
      message: "Password reset link send successfully on your gmail account",
    });
  } catch (error) {
    return res.status(500).send({ message: "Something went wrong" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).send({ message: "Please provide password" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findOne({ email: decode.email });

    const newhashPassword = await hashPassword(password);

    user.password = newhashPassword;
    await user.save();

    return res.status(200).send({ message: "Password reset successfully" });
  } 
  catch (error) {
    return res.status(500).send({ message: "Something went wrong" });
  }
};

// Generate token
const generateToken = async (userId) => {
  return await jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
};


module.exports = {forgetPassword, resetPassword };
