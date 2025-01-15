import express from "express";
import { loginUser, registerUser, getUserProfile } from "../controllers/userController.js";
import { addReview, getReviews, updateReview, deleteReview } from "../controllers/resourceController.js"; // Import resource controller
import authMiddleware from "../middleware/authMiddleware.js";

const userRouter = express.Router();

// Register and login routes
// console.log("routes")
userRouter.post("/register", registerUser); // User registration
userRouter.post("/login", loginUser);       // User login
userRouter.get("/profile", authMiddleware, getUserProfile);       // User login

// Resource routes (Reviews)
userRouter.post("/review", authMiddleware, addReview);  // Add a review
userRouter.get("/reviews", authMiddleware, getReviews);    // Get all reviews
userRouter.put("/review/:reviewId", authMiddleware, updateReview);  // Update a review
userRouter.delete("/review/:reviewId", authMiddleware, deleteReview); // Delete a review

export default userRouter;
