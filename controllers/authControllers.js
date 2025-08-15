import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullname, email, password, country, phoneNo, gender } = req.body;

    if (!fullname || !email || !password || !country || !phoneNo || !gender) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists with this email." });
    }

    const newUser = await User.create({
      fullname,
      email,
      password,
      country,
      phoneNo,
      gender,
    });

    if (newUser) {
      const token = generateToken(newUser._id);
      res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        country: newUser.country,
        phoneNo: newUser.phoneNo,
        gender: newUser.gender,
        token,
      });
    } else {
      res.status(400).json({ message: "Invalid user data." });
    }
  } catch (error) {
    console.error("Signup Error:", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!user || !isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid email or password." });
    }
    const token = generateToken(user._id);
    res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong. Please try again later.",
    });
  }
};
