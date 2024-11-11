import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">Register</h2>
        <div className="role-container">
          <div className="role-card doctor">
            <h3>Doctor</h3>
            <p>Sign up to manage prescriptions and patient information.</p>
            <Link to="/register/doctor">
              <button className="register-button">Register as Doctor</button>
            </Link>
          </div>
          <div className="role-card patient">
            <h3>Patient</h3>
            <p>Sign up to request prescriptions and manage your health.</p>
            <Link to="/register/patient">
              <button className="register-button">Register as Patient</button>
            </Link>
          </div>
          <div className="role-card pharmacist">
            <h3>Pharmacist</h3>
            <p>Sign up to manage medications and fulfill prescriptions.</p>
            <Link to="/register/pharmacist">
              <button className="register-button">Register as Pharmacist</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
