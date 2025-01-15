import mongoose from "mongoose";

// Connect to MongoDB database
export const connectDB = async () => {
  try {
    // Ensure to use the correct connection URL
    await mongoose.connect("mongodb://localhost:27017/Signup_Login", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB Connected");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1); // Exit process with failure
  }
};
