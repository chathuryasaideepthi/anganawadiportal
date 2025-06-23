import React, { useState } from "react";
import axios from "axios";
import "../styles/LoginPage.css";

const LoginPage = ({ onLoginSuccess }) => {
  const [name, setName] = useState("");
  const [awwId, setAwwId] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Get all users from backend
      const response = await axios.get("http://localhost:5000/api/awws");

      const users = response.data.message; // array of { name, awwId }

      // Check if entered name and awwId match a user
      const matchedUser = users.find(
        (user) =>
          user.awwId === awwId && user.name.toLowerCase() === name.toLowerCase()
      );

      if (matchedUser) {
        // Success: call parent function with user
        onLoginSuccess(matchedUser);
      } else {
        // No match found
        setError("Wrong user. Please check your name and AWW ID.");
      }
    } catch (err) {
      setError("Failed to connect to server. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <header className="login-header">
        <h1>Anganwadi Portal</h1>
        <p>Healthcare Management System</p>
      </header>

      <div className="login-card">
        <div className="login-avatar">👤</div>
        <h2>Welcome Back</h2>
        <p>Sign in to Anganwadi Portal</p>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleLogin}>
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>AWW ID</label>
          <input
            type="text"
            placeholder="Enter your AWW ID"
            value={awwId}
            onChange={(e) => setAwwId(e.target.value)}
            required
          />

          <button type="submit">🔐 Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
