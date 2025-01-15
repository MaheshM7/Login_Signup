import Resource from "../models/Resource.js";
import User from "../models/User.js";

// Add a new review (Resource)
const addReview = async (req, res) => {
  const { reviewText, rating } = req.body;
  const userId = req.userId; // Get the user ID from the middleware
  try {
    const user = await User.findById(userId); // Ensure the user exists
    if (!user) return res.status(404).json({ message: "User not found" });

    const newReview = new Resource({
      user: userId,
      reviewText,
      rating,
    });

    await newReview.save();
    res.status(201).json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ message: "Error adding review", error: error.message });
  }
};

// Read all reviews (can optionally filter by user)
const getReviews = async (req, res) => {
  try {
    const reviews = await Resource.find()
      .populate('user', 'username email') // Populate user details (username and email)
      .exec();
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Error fetching reviews", error: error.message });
  }
};

// Update a review (only the user who wrote the review can update it)
const updateReview = async (req, res) => {
  const { reviewText, rating } = req.body;
  const reviewId = req.params.reviewId;
  const userId = req.userId;

  try {
    const review = await Resource.findById(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });
    // console.log(review.user.toString());
    // console.log(userId.toString());
    if (review.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: "You can only update your own reviews" });
    }

    review.reviewText = reviewText || review.reviewText;
    review.rating = rating || review.rating;

    await review.save();
    res.status(200).json({ message: "Review updated successfully", review });
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ message: "Error updating review", error: error.message });
  }
};

// Delete a review (admin or user who wrote the review can delete it)
const deleteReview = async (req, res) => {
  const reviewId = req.params.reviewId;
  const role = req.role; // 'User' or 'Admin'

  try {
    const review = await Resource.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Allow deletion only if the user has the 'Admin' role
    if (role === 'Admin') {
      await review.deleteOne(); // Replace remove() with deleteOne()
      res.status(200).json({ message: "Review deleted successfully" });
    } else {
      res.status(403).json({ message: "You do not have permission to delete this review" });
    }
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ message: "Error deleting review", error: error.message });
  }
};



export { addReview, getReviews, updateReview, deleteReview };
