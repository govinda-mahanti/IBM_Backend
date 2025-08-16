import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// ================= SIGNUP =================
export const signup = async (req, res) => {
  try {
    const { fullname, email, password, country, phoneNo, gender } = req.body;

    // 1. Basic validation
    if (!fullname || !email || !password || !country || !phoneNo || !gender) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required." });
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, error: "Email already in use." });
    }

    // 3. Hash password
    const salt = await bcrypt.genSalt(10); // 10 rounds is good
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create new user
    const newUser = await User.create({
      fullname,
      email,
      password: hashedPassword,
      country,
      phoneNo,
      gender,
    });

    // 5. Generate JWT
    const token = generateToken(newUser._id);

    return res.status(201).json({
      success: true,
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
    res.status(500).json({ success: false, error: "Server error." });
  }
};

// ================= LOGIN =================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user by email
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(401)
        .json({ success: false, error: "Invalid email or password." });

    // 2. Compare password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res
        .status(401)
        .json({ success: false, error: "Invalid email or password." });

    // 3. Generate JWT
    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
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
    res.status(500).json({ success: false, error: "Server error." });
  }
};
