import React from 'react';
import './Landing.css';

const Landing = () => {
  return (
    <div className="landing-container">
      <div className="centered-box">
        <h1 className="landing-title">Welcome to PharmaFlow</h1>
        <p className="landing-subtitle">Bridging the gap between doctors, patients, and pharmacies.</p>
        <div className="button-container">
          <a href="/register" className="landing-button register">Register</a>
          <a href="/login" className="landing-button login">Login</a>
        </div>
      </div>
    </div>
  );
};

export default Landing;
