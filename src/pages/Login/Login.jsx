import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../../supabaseClient";
import "../../App.css";
import "./Login.css";

function LoginPage({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        return;
      }

      if (data.user) {
        console.log("User logged in:", data.user);
        setUser(data.user); // Save user in state to update navbar
        navigate("/loggedInHome"); // Redirect to home page
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="loginPage">
      <div className="loginContainer">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="inputGroup">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <div className="error">{error}</div>}
          <button type="submit" className="loginButton">
            Login
          </button>
        </form>
        <div className="signupLink">
          <p>
            Need an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
