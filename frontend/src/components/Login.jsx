import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/login.css"; // Reusing the same login styles for consistency

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sending login data to the backend API
      const response = await axios.post("http://localhost:5000/api/user/login", user);

      // Handle successful login
      if (response.status === 200) {
        // Store the token in localStorage
        localStorage.setItem("authToken", response.data.token);
        // console.log(response.data.token);
        // Navigate to the homepage or dashboard after successful login
        navigate("/profile"); // Update the route as needed
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError("Invalid email or password");
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div className="overlay">
      <div className="login-box">
        <button className="close-btn" onClick={() => navigate("/")}>✖</button>
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Your email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit" className="login-btn">Login</button>
        </form>
        <p className="signup-text">
          Don't have an account? <span onClick={() => navigate("/register")}>Sign up here</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
