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

        {/* Features Section */}
        <section style={{ padding: '60px 20px', backgroundColor: '#f9f9f9', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5em', marginBottom: '40px', color: '#333' }}>What We Offer</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1', minWidth: '250px', padding: '20px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
              <h3 style={{ fontSize: '1.8em', color: '#4CAF50' }}>Find Your Peers</h3>
              <p style={{ fontSize: '1.1em', color: '#666' }}>
                Never study alone again! Find people that share the same classes to collaborate and study.
              </p>
            </div>
            <div style={{ flex: '1', minWidth: '250px', padding: '20px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
              <h3 style={{ fontSize: '1.8em', color: '#4CAF50' }}>Easy Meetups</h3>
              <p style={{ fontSize: '1.1em', color: '#666' }}>
                Create an event or find one on our webpage to save time and organization on study meets.
              </p>
            </div>
            <div style={{ flex: '1', minWidth: '250px', padding: '20px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
              <h3 style={{ fontSize: '1.8em', color: '#4CAF50' }}>Collaborative Study Groups</h3>
              <p style={{ fontSize: '1.1em', color: '#666' }}>
                Join peer study groups to collaborate, share notes, and discuss subjects together.
              </p>
            </div>
          </div>
        </section>

        {/* Get Started Section */}
        <section style={{ padding: '60px 20px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5em', marginBottom: '20px', color: '#333' }}>Get Started</h2>
          <p style={{ fontSize: '1.2em', color: '#666', marginBottom: '30px' }}>
            Ready to begin? Take the first step towards more productive study sessions today!
          </p>
          <a
            href="#"
            style={{
              display: 'inline-block',
              backgroundColor: '#4CAF50',
              color: 'white',
              padding: '15px 30px',
              fontSize: '1.2em',
              textDecoration: 'none',
              borderRadius: '5px',
              transition: 'background-color 0.3s ease',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#45a049')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#4CAF50')}
          >
            Get Started
          </a>
        </section>

        {/* Footer */}
        <footer style={{ backgroundColor: '#333', color: 'white', padding: '20px 0', textAlign: 'center' }}>
          <p style={{ margin: 0 }}>&copy; 2025 Study Buddy. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default Home;