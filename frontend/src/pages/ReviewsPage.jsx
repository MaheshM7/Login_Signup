import React, { useEffect, useState } from "react";
import axios from "axios";
import Review from "../components/Review";

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null); // Added state for error handling

  // Fetch reviews from the backend
  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem("authToken"); // Fetch the token from localStorage

      // If no token is found, set error and return
      if (!token) {
        setError("You need to log in to see reviews.");
        return;
      }

      const response = await axios.get(
        "http://localhost:5000/api/user/reviews", 
        {
          headers: { Authorization: `Bearer ${token}` } // Send token in headers
        }
      );
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setError("Failed to fetch reviews. Please try again.");
    }
  };

  useEffect(() => {
    fetchReviews();  // Fetch reviews on component mount
  }, []);

  // Update review in the state
  const handleUpdate = (updatedReview) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review._id === updatedReview._id ? updatedReview : review
      )
    );
  };

  // Delete review from the state
  const handleDelete = (reviewId) => {
    setReviews((prevReviews) =>
      prevReviews.filter((review) => review._id !== reviewId)
    );
  };

  return (
    <div className="reviews-page">
      <h2>All Reviews</h2>
      {error && <p className="error-message">{error}</p>} {/* Display error message */}
      {reviews.length === 0 ? (
        <p>No reviews found</p>
      ) : (
        reviews.map((review) => (
          <Review
            key={review._id}
            review={review}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
};

export default ReviewsPage;
