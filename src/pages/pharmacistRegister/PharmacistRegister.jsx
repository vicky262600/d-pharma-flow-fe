import React from 'react';
import './PharmacistRegister.css';

const PharmacistRegister = () => {
  return (
    <div className="pharmacist-register-container">
      <h2>Pharmacist Registration</h2>
      <form>
        <div className="form-group">
          <label htmlFor="pharmacistName">Name:</label>
          <input type="text" id="pharmacistName" placeholder="Enter your name" required />
        </div>
        <div className="form-group">
          <label htmlFor="pharmacistEmail">Email:</label>
          <input type="email" id="pharmacistEmail" placeholder="Enter your email" required />
        </div>
        <div className="form-group">
          <label htmlFor="pharmacistPassword">Password:</label>
          <input type="password" id="pharmacistPassword" placeholder="Enter your password" required />
        </div>
        <div className="form-group">
          <label htmlFor="pharmacyLicense">Pharmacy License Number:</label>
          <input type="text" id="pharmacyLicense" placeholder="Enter your pharmacy license number" required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default PharmacistRegister;
