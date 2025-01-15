import { useState } from "react";
import { resolvePath, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/login.css"; // Reusing the same login styles for consistency

const SignUp = () => {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(user.username);
    // console.log(user.email);
    // console.log(user.password);

    try {
      // Updated API URL to use port 5000
      const response = await axios.post("http://localhost:5000/api/user/register", user);
      
      // Handle successful registration
      if (response.status === 201) {
        // Store the token in localStorage
        // console.log(response.data.token)
        localStorage.setItem("authToken", response.data.token);

        // Navigate to login page after successful registration
        navigate("/profile");  
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError("Email already in use");
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div className="overlay">
      <div className="login-box">
        <button className="close-btn" onClick={() => navigate("/")}>✖</button>
        <h2>Sign Up</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="Your name" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Your email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit" className="login-btn">Sign Up</button>
        </form>
        <p className="signup-text">
          Already have an account? <span onClick={() => navigate("/")}>Login here</span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
