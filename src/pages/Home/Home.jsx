import React from 'react';
import '../../App.css';
import './Home.css';

function Home() {
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

        {/* Who We Are Section */}
        <section style={{ padding: '60px 20px', maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5em', marginBottom: '20px', color: '#333' }}>Who We Are</h2>
          <p style={{ fontSize: '1.2em', lineHeight: '1.6', color: '#666' }}>
            Study Buddy is a platform created to assist students in their academic journey. Whether you're preparing for exams, working on assignments, or simply looking to people to study with, we are here to help.
            We offer a streamlined way to find peers with the same classes and to setup study meets to enhance your academic growth.
          </p>
          <p style={{ fontSize: '1.2em', lineHeight: '1.6', color: '#666', marginTop: '20px' }}>
            Join thousands of students who are using Study Buddy to enhance their learning experience. With ollaborative study groups and customizable study plans, your study sessions will never be the same!
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
          <h4>- Alex Russ</h4>
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