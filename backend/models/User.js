import mongoose from "mongoose";
import bcrypt from "bcrypt";

// User schema definition
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['User', 'Admin'], default: 'User' }, // You can define roles
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Middleware to hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // If password hasn't changed, no need to hash
  this.password = await bcrypt.hash(this.password, 10); // Hash password with bcrypt
  next();
});

// Method to compare passwords (useful for login)
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password); // Compare entered password with the hashed one
};

const User = mongoose.model("User", userSchema);

export default User;
