import React, { useRef } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './DoctorRegister.css';

const DoctorRegister = () => {
  const navigate = useNavigate();
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const licenseNumber = useRef();
  const role = "doctor";
  
  const handleClick = async (e) =>{
    e.preventDefault();
    if(password.current.value !== passwordAgain.current.value){
      console.log("password does not match");
      alert("password does not match");
    }else{
      try{
      const doctor = {
        name : name.current.value,
        email : email.current.value,
        password : password.current.value,
        licenseNumber : licenseNumber.current.value,
        role : role,
      }
      let user = await axios.post("http://localhost:5000/api/v1/auth/register/doctor", doctor);
      console.log(user.data);
      navigate("/login");
      
      }catch(err){
        console.log(err);
      }
    }
  }

  return (
    <div className="doctor-register-wrapper">
      <div className="doctor-register-container">
        <h2>Doctor Registration</h2>
        <form onSubmit={handleClick}>
          <div className="form-group">
            <label htmlFor="doctorName">Name:</label>
            <input type="text" id="doctorName" placeholder="Enter your name" required  ref={name}/>
          </div>
          <div className="form-group">
            <label htmlFor="doctorEmail">Email:</label>
            <input type="email" id="doctorEmail" placeholder="Enter your email" required ref={email}/>
          </div>
          <div className="form-group">
            <label htmlFor="doctorPassword">Password:</label>
            <input type="password" id="doctorPassword" placeholder="Enter your password" required ref={password}/>
          </div>
          <div className="form-group">
            <label htmlFor="doctorPassword">Password Again:</label>
            <input type="password" id="doctorPasswordAgain" placeholder="Enter your password Again" required ref={passwordAgain}/>
          </div>
          <div className="form-group">
            <label htmlFor="doctorLicense">License Number:</label>
            <input type="text" id="doctorLicense" placeholder="Enter your license number" required ref={licenseNumber}/>
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default DoctorRegister;
