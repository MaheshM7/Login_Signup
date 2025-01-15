import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Review.css";

const Review = ({ review, refreshReviews }) => {
  const navigate = useNavigate();

  // State to track editable values
  const [isEditing, setIsEditing] = useState(false);
  const [updatedReviewText, setUpdatedReviewText] = useState(review.reviewText);
  const [updatedRating, setUpdatedRating] = useState(review.rating);

  const { _id, user, reviewText, rating } = review;

  // Check if user exists and provide fallback values
  const username = user ? user.username : "Anonymous";
  const userEmail = user ? user.email : "No email provided";

  // Function to handle the edit toggle
  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Function to handle review update
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("authToken");
      // console.log(token);

      const updatedReview = {
        reviewText: updatedReviewText,
        rating: updatedRating,
      };
      // console.log(_id, reviewText, rating);

      const response = await axios.put(
        `http://localhost:5000/api/user/review/${_id}`,
        updatedReview,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // console.log("Review updated:", response.data);

      // Update the state with new values from the server response
      setUpdatedReviewText(response.data.review.reviewText);
      setUpdatedRating(response.data.review.rating);

      setIsEditing(false); // Exit editing mode
      if (refreshReviews) {
        refreshReviews(); // Refresh reviews if needed
      }
    } catch (error) {
      console.error("Error updating review:", error);

      // Reset to the previous values if update fails
      setUpdatedReviewText(review.reviewText);
      setUpdatedRating(review.rating);

      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Failed to update review.");
      }
    }
  };

  // Function to handle review delete
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("authToken");
      // console.log(token);

      const response = await axios.delete(
        `http://localhost:5000/api/user/review/${_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // console.log(response);

      // If you want to log specific details from the response (e.g., status, data)

      if (refreshReviews) {
        refreshReviews(); // Refresh parent state to remove deleted review
      }

      // Force a full page reload to reflect changes
      window.location.reload();
    } catch (error) {
      console.error("Error deleting review:", error);
      alert("User cannot delete the review.");
    }
  };

  return (
    <div className="review">
      <h3>{username}</h3>
      {isEditing ? (
        <>
          <textarea
            value={updatedReviewText}
            onChange={(e) => setUpdatedReviewText(e.target.value)}
            rows="4"
            cols="50"
          />
          <input
            type="number"
            min="1"
            max="5"
            value={updatedRating}
            onChange={(e) => setUpdatedRating(Number(e.target.value))}
          />
        </>
      ) : (
        <>
          <p>{updatedReviewText}</p>
          <p>Rating: {updatedRating}</p>
        </>
      )}
      <p>Email: {userEmail}</p>

      <button onClick={handleEdit}>{isEditing ? "Cancel" : "Edit"}</button>
      {isEditing ? (
        <button onClick={handleUpdate}>Update</button>
      ) : (
        <button onClick={handleDelete}>Delete</button>
      )}
    </div>
  );
};

export default Review;
