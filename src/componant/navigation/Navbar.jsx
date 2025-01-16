import React from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useRef } from "react";
import { ethers } from "ethers";
import "./Navbar.css";
import { contractAbi, contractAddress } from "../../constant/constant";
import { useDispatch } from "react-redux";
import { addRole } from "../../redux/userSlice";

const Navbar = () => {
  const { login, logout, user } = usePrivy();
  const dispatch = useDispatch();
  const amount = useRef();

  const handleLogout = () => {
    logout();
    dispatch(addRole(""));
    console.log("User logged out");
  };

  const loginClick = () => {
    login();

  }

  const donateFunction = async (e) => {
    e.preventDefault();
    try{
    const donationAmount = amount.current.value;
    console.log(donationAmount);
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    console.log(signer);
    const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);


    
    const ethPriceBigNumber = await contractInstance.getPrice();
    const ethPrice = ethers.utils.formatUnits(ethPriceBigNumber);
    console.log(ethPrice);
    
    const ethToSend = donationAmount / ethPrice;

    const amountInWei = ethers.utils.parseEther(ethToSend.toString());

    const tx = await contractInstance.donateMe({value: amountInWei});
    console.log(tx);
    alert(`${donationAmount} is donated`);
    }catch(err){
      console.log(err);
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>D-Pharma</h1>
      </div>
      <div className="navbar-links">
        {user ? (
          <>
            <span className="navbar-user">Welcome, {user.email || "User"}</span>
            <button className="navbar-button" onClick={handleLogout}>
              Logout
            </button>
            <form onSubmit={donateFunction}>
              <div className="form">
                <input type="number" placeholder="Enter amount is USD" ref={amount}/>
                <button type="submit">Donate</button>
              </div>
            </form>
          </>
        ) : (
          <div>
            <span className="navbar-login-prompt">Not logged in</span>
            <button onClick={loginClick}>Login</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
