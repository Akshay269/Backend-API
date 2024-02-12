const User = require("../Models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");
const Image = require("../Models/ImageModel");
const multer = require("multer");
const path = require("path");



module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({ email, password, username, createdAt });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User Registered successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Incorrect password or email" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(201).json({
      message: "User logged in successfully",
      success: true,
      tokens: { token, userId: user._id },
    });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Logout = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      withCredentials: true,
      httpOnly: false,
    });

    res
      .status(200)
      .json({ message: "User logged out successfully", success: true });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.uploadImage = async (req, res, next) => {
  try {
    // console.log(req.user, '#######');
    const userId = req.user._id;
    // console.log(userId, "userId")

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.files.forEach(async (file) => {
      const image = new Image({
        user: userId,
        filename: file.filename,
      });

      await image.save();

      user.images.push(image._id);
    });

    await user.save();

    return res.status(201).json({ message: "Images uploaded successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
