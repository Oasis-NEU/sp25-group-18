import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Home.css";

function Home() {
  const navigate = useNavigate(); // Initialize navigation function

  return (
    <div className="home-container">
      <header className="header">
        <h1>Study Buddy</h1>
        <p>Connect, collaborate, and succeed together.</p>
      </header>

      <div className="content-sections">
        <section className="who-we-are">
          <h2>Who We Are</h2>
          <p>
            We are a community of students who organize study sessions, support
            each other, and make learning more engaging.
          </p>
        </section>

        <section className="get-started">
          <h2>Get Started</h2>
          <p>Join us today and enhance your learning experience.</p>
          <button className="cta-button" onClick={() => navigate("/signup")}>
            Sign Up
          </button>
        </section>
      </div>
    </div>
  );
}

export default Home;
