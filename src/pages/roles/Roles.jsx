import React, { useState } from "react";
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
  const { user } = usePrivy();
  // const privy = PrivyClient();
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedRole, setSelectedRole] = useState("");


    const handleRoleSelect = async (role) => {
      dispatch(addRole(role));
      setSelectedRole(role);
        if(user){
          try{
            // await privy.setCustomMetadata(user.id, {role: role});
            // console.log(user.metadata.role)
            console.log(selectedRole);
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

            if(role === "doctor"){
              Navigate("/doctor-page")
            }

            else if(role === "pharmacist"){
              Navigate("/pharmacist-page");
            }

            else if(role === "patient"){
              Navigate("/patient-page");
            }

            else{
              console.log("please select Role");
            }
            
          }catch(err){
            console.log(err);
          }
        }
    }

return (
    <div className="role-selection-container">
      <div className="role-selection-card">
        <h1 className="role-selection-title">I am a ..</h1>
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