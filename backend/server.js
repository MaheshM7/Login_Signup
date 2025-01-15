import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";  // Importing DB connection
import "dotenv/config";  // To load environment variables from .env file
import userRouter from "./routes/userRoute.js";  // Importing user routes

const app = express();
const port = process.env.PORT || 5000;  // Set the port to 5000

// Middleware
app.use(express.json());  // Middleware to parse JSON request body
app.use(cors());  // Middleware to handle Cross-Origin Requests

// Connect to the database
connectDB();

// Registering routes
// console.log("server");
app.use("/api/user", userRouter);  // All user-related routes will be under /api/user

// Basic route to test the API
app.get("/", (req, res) => {
  res.send("API Working");
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
