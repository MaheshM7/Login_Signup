import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/AddReviewPage.css";  // Include your custom styles for the add review page

const AddReviewPage = () => {
  const [reviewText, setReviewText] = useState("");  // Store review text
  const [rating, setRating] = useState(1);  // Store rating
  const [error, setError] = useState("");  // Store error message
  const [success, setSuccess] = useState("");  // Store success message
  const [showReviewButton, setShowReviewButton] = useState(false);  // State to show the "Go to Reviews" button
  const navigate = useNavigate();

  // Handle review text change
  const handleReviewTextChange = (e) => {
    setReviewText(e.target.value);
  };

  // Handle rating change
  const handleRatingChange = (e) => {
    setRating(Number(e.target.value));
  };

  // Handle review submission
  const handleSubmitReview = async () => {
    try {
      const token = localStorage.getItem("authToken");

      // If no token is found, redirect to login page
      if (!token) {
        navigate("/login");
        return;
      }

      // Send review text and rating to the backend
      const response = await axios.post(  
        "http://localhost:5000/api/user/review",
        { reviewText, rating },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("Review added successfully!");
      setReviewText("");  // Reset the review text after submission
      setRating(1);  // Reset rating

      // Show "Go to Reviews" button after success
      setShowReviewButton(true);

      // Hide the success message after 1 second
      setTimeout(() => {
        setSuccess("");
      }, 1000);
    } catch (err) {
      setError("Failed to add review");
    }
  };

  // Navigate to the reviews page
  const handleGoToReviews = () => {
    navigate("/reviews"); // Replace with your reviews page path
  };

  return (
    <div className="add-review-page">
      <div className="review-card">
        <h2>Add Your Review</h2>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <textarea
          className="review-text"
          value={reviewText}
          onChange={handleReviewTextChange}
          placeholder="Write your review here"
        ></textarea>

        <div className="rating">
          <label htmlFor="rating">Rating (1-5): </label>
          <input
            type="number"
            id="rating"
            min="1"
            max="5"
            value={rating}
            onChange={handleRatingChange}
          />
        </div>

        <button className="submit-btn" onClick={handleSubmitReview}>
          Add Review
        </button>

       
      </div>
    </div>
  );
};

export default AddReviewPage;
