import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Home.css";

function Home() {
  const navigate = useNavigate(); // Initialize navigation function

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: 0, padding: 0, backgroundColor: '#f4f4f4' }}>
      {/* Full page wrapper */}
      <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
        
        {/* Header Section */}
        <header style={{ backgroundColor: '#4CAF50', color: 'white', padding: '60px 20px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '3em', margin: '0' }}>Welcome to Study Buddy</h1>
          <p style={{ fontSize: '1.2em', marginTop: '10px' }}>
            Your one way stop to find the right Study Buddies!
          </p>
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