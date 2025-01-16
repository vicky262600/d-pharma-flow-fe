import React, { useEffect } from "react";
import { usePrivy } from '@privy-io/react-auth';
import { useNavigate } from 'react-router-dom';
import "./Login.css";

const Login = () => {
  const { login, user } = usePrivy();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log("this is user:", user);
      navigate("./roles");
    }
  }, [user]);

  const handleLoginClick = (e) => {
    if(window.ethereum){
      e.preventDefault();
    login();
    }
    else{
      alert("you do not have any wallet connected")
    }
  };



  return (
    <div className="login-container">
      <div className="login-left">
        <h1 className="left-title">RIRA D-pharma</h1>
      </div>
      <div className="login-right">
        <h1 className="login-title">Welcome to D-pharma</h1>
        <p className="login-subtitle">Connect with your wallet to get started</p>
        <button onClick={handleLoginClick} className="login-button">
          Connect Wallet
        </button>
      </div>
    </div>
  );
};

export default Login;
