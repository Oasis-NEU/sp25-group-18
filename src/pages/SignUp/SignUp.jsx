import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../../supabaseClient";
import "../../App.css";
import "./SignUp.css";

function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); // We'll use this to navigate after sign up

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are required!");
      return;
    }

    try {
      // Sign up the user using Supabase Auth (auth only stores email and password)
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      // After successful sign-up, store additional user info (name) in the custom 'users' table
      const { error: insertError } = await supabase.from("users").insert([
        {
          name,
          email,
          user_id: data.user.id, // Use the user_id from Supabase Auth
        },
      ]);

      if (insertError) {
        setError("Error storing additional user info: " + insertError.message);
        return;
      }

      // If everything is successful, show success message
      setSuccess(
        "Account created successfully! Please check your email to confirm."
      );

      // Optionally navigate to login page after successful signup
      setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds

      // Reset form
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError("Something went wrong, please try again.");
    }
  };

  return (
    <div className="loginPage">
      <div className="loginContainer">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="inputGroup">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}

          <button type="submit" className="loginButton">
            Sign Up
          </button>
        </form>

        <div className="signupLink">
          <p>
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
