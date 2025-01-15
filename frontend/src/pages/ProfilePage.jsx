import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ProfilePage.css"; // Include your custom styles for the profile page

const ProfilePage = () => {
  const [user, setUser] = useState(null); // Store user data
  const [error, setError] = useState(""); // Store error message
  const navigate = useNavigate();

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Get the token from localStorage
        const token = localStorage.getItem("authToken");

        // If no token is found, redirect to login page
        if (!token) {
          navigate("/");
          return;
        }

        // Send request to get user profile
        const response = await axios.get(
          "http://localhost:5000/api/user/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Send the token as Authorization header
            },
          }
        );

        // Set the user data in state
        setUser(response.data);
      } catch (err) {
        setError("Failed to fetch profile");
      }
    };

    fetchProfile();
  }, [navigate]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove token from localStorage
    const token = localStorage.getItem("authToken");
    // console.log(token);
    navigate("/"); // Redirect to login page
  };

  // Handle navigation to the add review page
  const handleAddReview = () => {
    navigate("/add-review"); // Navigate to the add review page
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h2>Profile</h2>

        {error && <p className="error-message">{error}</p>}

        <div className="profile-info">
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>

        <button className="add-review-btn" onClick={handleAddReview}>
          Add Review
        </button>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
