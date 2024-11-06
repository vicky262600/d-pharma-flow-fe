import React, { useRef } from 'react';
import './PatientRegister.css';
import axios from 'axios';

const PatientRegister =  () => {
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();

  const handleClick = async (e) => {
    e.preventDefault();
    if(password.current.value !== passwordAgain.current.value){
      console.log("password does not match");
      alert("password does not match");
    }else{
        try{
          const patient = {
            name:  name.current.value,
            email: email.current.value,
            password: password.current.value
          }
          await axios.post("http://localhost:5000/api/v1/auth/register/patient", patient);
          console.log("all done");
          // console.log(data);
        }catch(err){
          console.log(err);
        }
    }
  }

  return (
    <div className="patient-register-wrapper">
      <div className="patient-register-container">
        <h2>Patient Registration</h2>
        <form onSubmit={handleClick}>
          <div className="form-group">
            <label htmlFor="patientName">Name:</label>
            <input type="text" id="patientName" placeholder="Enter your name" required ref={name}/>
          </div>
          <div className="form-group">
            <label htmlFor="patientEmail">Email:</label>
            <input type="email" id="patientEmail" placeholder="Enter your email" required ref={email}/>
          </div>
          <div className="form-group">
            <label htmlFor="patientPassword">Password:</label>
            <input type="password" id="patientPassword" placeholder="Enter your password" required ref={password}/>
          </div>
          <div className="form-group">
            <label htmlFor="patientPassword">Password:</label>
            <input type="password" id="patientPasswordAgain" placeholder="Enter your password Again" required ref={passwordAgain}/>
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default PatientRegister;
