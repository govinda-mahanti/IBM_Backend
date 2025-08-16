import bcrypt from "bcryptjs";
import validator from "validator";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// Validation helper functions
const validateEmail = (email) => validator.isEmail(email);
const validatePassword = (password) => {
  return (
    password.length >= 8 &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /\d/.test(password) &&
    /[@$!%*?&]/.test(password)
  );
};
const validatePhone = (phone) =>
  validator.isMobilePhone(phone, "any", { strictMode: false });

// ================= SIGNUP =================
export const signup = async (req, res) => {
  try {
    const { fullname, email, password, country, phoneNo, gender } = req.body;

    // Detailed validation
    const errors = [];

    if (!fullname || fullname.trim().length < 2) {
      errors.push("Full name must be at least 2 characters");
    }

    if (!email || !validateEmail(email)) {
      errors.push("Please provide a valid email address");
    }

    if (!password || !validatePassword(password)) {
      errors.push(
        "Password must be at least 8 characters with uppercase, lowercase, number, and special character"
      );
    }

    if (!country || country.trim().length < 2) {
      errors.push("Country is required");
    }

    if (!phoneNo || !validatePhone(phoneNo)) {
      errors.push("Please provide a valid phone number");
    }

    if (!gender || !["Male", "Female", "Other"].includes(gender)) {
      errors.push("Gender must be Male, Female, or Other");
    }

    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, error: "Email already in use." });
    }

    // Create new user (password will be hashed by pre-save hook)
    const newUser = await User.create({
      fullname: fullname.trim(),
      email: email.toLowerCase().trim(),
      password,
      country: country.trim(),
      phoneNo: phoneNo.trim(),
      gender,
    });

    // Generate JWT
    const token = generateToken(newUser._id);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        country: newUser.country,
        phoneNo: newUser.phoneNo,
        gender: newUser.gender,
      },
      token,
    });
  } catch (error) {
    console.error("Signup Error:", error.message);

    // Handle duplicate key error
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(409).json({
        success: false,
        error: `${field} already exists`,
      });
    }

    res
      .status(500)
      .json({ success: false, error: "Server error. Please try again later." });
  }
};

// ================= LOGIN =================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    const errors = [];

    if (!email || !validateEmail(email)) {
      errors.push("Please provide a valid email address");
    }

    if (!password || password.length < 8) {
      errors.push("Password must be at least 8 characters long");
    }

    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password.",
      });
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      console.log("Invalid password attempt for user:", email);
      return res.status(401).json({
        success: false,
        error: "Invalid email or password.",
      });
    }

    // Generate JWT
    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        country: user.country,
        phoneNo: user.phoneNo,
        gender: user.gender,
      },
      token,
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({
      success: false,
      error: "Server error. Please try again later.",
    });
  }
};
