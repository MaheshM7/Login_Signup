import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";

// Helper function to generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

// Register User
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  // console.log(username);
  //     console.log(email);
  //     console.log(password);
  try {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Check password length (must be greater than 8)
    if (password.length <= 8) {
      return res.status(400).json({
        message: "Password must be longer than 8 characters",
      });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Determine the role based on email
    let role = "User"; // Default role is 'User'
    if (email === "admin@gmail.com") { 
      role = "Admin"; // Assign 'Admin' role for admin email
    }

    // Create the user with the determined role and hashed password
    const user = new User({ username, email, password, role });
    await user.save();

    // Generate token
    const token = generateToken(user);

    // Send response with the token
    res.status(201).json({
      message: `User registered successfully as ${role}`,
      token,
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error during signup", error: error.message });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  // console.log(email);
  // console.log(password);

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Use the comparePassword method from the user schema
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate token
    const token = generateToken(user);

    // Send token
    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error during login", error: error.message });
  }
};

// Get User Profile
const getUserProfile = async (req, res) => {
  try {
    // Extract user ID from request (assume it's passed via JWT in middleware)
    const userId = req.userId;

    // Find user by ID
    const user = await User.findById(userId).select("username email");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send user details
    res.status(200).json({
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error fetching user profile", error: error.message });
  }
};

export { registerUser, loginUser, getUserProfile };
