import React from 'react';

import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <header className="header">
        <h1>Study Buddy</h1>
        <p>Connect, collaborate, and succeed together.</p>
      </header>

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
        <button className="cta-button">Sign Up</button>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What Students Say</h2>
        <div className="testimonial">
          <p>"Study Buddy helped me stay on track with my coursework!"</p>
          <h4>- Alex Johnson</h4>
        </div>
        <div className="testimonial">
          <p>"I met amazing study partners and improved my grades!"</p>
          <h4>- Michael Tran</h4>
        </div>
        <div className="testimonial">
          <p>"The study sessions are super organized and helpful."</p>
          <h4>- Ryan Ma</h4>
        </div>
      </section>
    </div>
  );
}

export default Home;
