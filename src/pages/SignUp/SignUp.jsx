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
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!name || !email || !password) {
      setError("All fields are required!");
      return;
    }
  
    // 🔹 Sign up user with Supabase Auth
    const { data, error: signUpError } = await supabase.auth.signUp({ email, password });
  
    if (signUpError) {
      console.error("Sign-up error:", signUpError);
      setError(signUpError.message);
      return;
    }
  
    if (!data.user) {
      console.error("User sign-up failed, no user object returned.");
      setError("User signup failed.");
      return;
    }
  
    console.log("✅ New user created in Supabase Auth:", data.user.id);
  
    // 🔹 Insert user into 'users' table (MUST use the same ID from Auth!)
    const { error: insertError } = await supabase.from("users").insert([
      {
        id: data.user.id, // ✅ Use the SAME UUID from Supabase Auth!
        name,
        email,
      },
    ]);
  
    if (insertError) {
      console.error("❌ Error inserting user into users table:", insertError);
      setError("Error storing user info: " + insertError.message);
      return;
    }
  
    console.log("✅ User successfully added to users table with correct ID");
  
    setSuccess("Account created successfully! Check your email to confirm.");
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