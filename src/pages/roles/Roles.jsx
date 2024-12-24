import React, { useEffect, useState } from "react";
import { addRole } from "../../redux/userSlice";
import { contractAddress, contractAbi} from "../../constant/constant"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import Navbar from "../../componant/navigation/NavBar";
import { usePrivy } from "@privy-io/react-auth";
// import { PrivyClient } from "@privy-io/server-auth";
import "./Roles.css";
import { ethers } from "ethers";

const Roles = () => {
  const appId = process.env.REACT_APP_PRIVATE_KEY;
  const sercetKey = process.env.SECRET_KEY;
  const { user, logout, setCustomMetadata } = usePrivy();
  // const privy = PrivyClient();
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedRole, setSelectedRole] = useState("");
  const [ provider, setProvider] = useState("");

  const outuser = () => {
    logout();
  }

  // const privy = new PrivyClient({
  //   appId: appId,
  //   appSecret: sercetKey,
  // });
  
    const handleRoleSelect = async (role) => {
      dispatch(addRole(role));
        setSelectedRole(role);
        if(user){
          try{
            // await privy.setCustomMetadata(user.id, {role: role});
            // console.log(user.metadata.role)
            // console.log(role)
            const userAddress = user.linkedAccounts[0].address;
            console.log("account:", userAddress)
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            console.log("signer", signer)
            const contractInstance = new ethers.Contract(
              contractAddress,
              contractAbi,
              signer
            )
            const tx = await contractInstance.setRole(role);
            const receipt = await tx.wait();
            console.log(receipt);

            if(selectedRole){

              Navigate("/doctor-prescription")
            }
            
          }catch(err){
            console.log(err);
          }
        }
    }

return (
    <div className="role-selection-container">
      <div className="role-selection-card">
        <h1 className="role-selection-title">Choose Your Role</h1>
        <p className="role-selection-subtitle">Please select your role to continue</p>

        <div className="role-buttons">
          <button
            className="role-button"
            onClick={() => handleRoleSelect("doctor")}
          >
            Doctor
          </button>
          <button
            className="role-button"
            onClick={() => handleRoleSelect("patient")}
          >
            Patient
          </button>
          <button
            className="role-button"
            onClick={() => handleRoleSelect("pharmacist")}
          >
            Pharmacist
          </button>
          <button
                      className="role-button"
                      onClick={() => outuser("pharmacist")}
          >
            logout
          </button>
        </div>

        {selectedRole && (
          <p className="role-selection-info">
            You have selected: <strong>{selectedRole}</strong>
          </p>
        )}
      </div>
    </div>
  );
};

export default Roles;
