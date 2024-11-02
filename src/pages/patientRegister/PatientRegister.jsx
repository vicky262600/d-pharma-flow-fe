import React from 'react';
import './PatientRegister.css';

const PatientRegister = () => {
  return (
    <div className="patient-register-wrapper">
      <div className="patient-register-container">
        <h2>Patient Registration</h2>
        <form>
          <div className="form-group">
            <label htmlFor="patientName">Name:</label>
            <input type="text" id="patientName" placeholder="Enter your name" required />
          </div>
          <div className="form-group">
            <label htmlFor="patientEmail">Email:</label>
            <input type="email" id="patientEmail" placeholder="Enter your email" required />
          </div>
          <div className="form-group">
            <label htmlFor="patientPassword">Password:</label>
            <input type="password" id="patientPassword" placeholder="Enter your password" required />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default PatientRegister;
