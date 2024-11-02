import React from 'react';
import './DoctorRegister.css';

const DoctorRegister = () => {
  return (
    <div className="doctor-register-wrapper">
      <div className="doctor-register-container">
        <h2>Doctor Registration</h2>
        <form>
          <div className="form-group">
            <label htmlFor="doctorName">Name:</label>
            <input type="text" id="doctorName" placeholder="Enter your name" required />
          </div>
          <div className="form-group">
            <label htmlFor="doctorEmail">Email:</label>
            <input type="email" id="doctorEmail" placeholder="Enter your email" required />
          </div>
          <div className="form-group">
            <label htmlFor="doctorPassword">Password:</label>
            <input type="password" id="doctorPassword" placeholder="Enter your password" required />
          </div>
          <div className="form-group">
            <label htmlFor="doctorLicense">License Number:</label>
            <input type="text" id="doctorLicense" placeholder="Enter your license number" required />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default DoctorRegister;
