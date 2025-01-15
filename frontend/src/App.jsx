import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header"; // Import the Header component
import Login from "./components/Login";
import Register from "./components/Register";
import ProfilePage from "./pages/ProfilePage";
import AddReviewPage from "./pages/AddReviewPage"; 
import ReviewsPage from "./pages/ReviewsPage";  

function App() {
  const token = localStorage.getItem("authToken");

  return (
    <Router>
      <Header /> {/* Added Header component for navigation */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/add-review" element={<AddReviewPage />} />
        <Route path="/reviews" element={<ReviewsPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
