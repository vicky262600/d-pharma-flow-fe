import React from 'react';
import { useSelector } from 'react-redux';
import './PrescriptionCard.css'; // Import CSS file for styling
import { ethers } from 'ethers';
import { contractAddress, contractAbi} from "../../constant/constant"

const PrescriptionCard =  ({ prescriptions, index }) => {
  console.log(prescriptions.patientId);
  const currentRole = useSelector((state) => state.userRole.currentRole); // Access the current role from the Redux store
  console.log(currentRole);

  const approvePrescription = async () =>{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress, contractAbi, signer
    );
    const tx = await contractInstance.approvePrescription(index);
    const receipt = await tx.wait();
    console.log(receipt);
    alert("The prescription is accepted. Please refresh prescription");
  }

  return (
    <div className="prescription-card">
      <h4>patientId: {prescriptions.patientId}</h4>
      <p>index: {index}</p>
      <p>medications: {prescriptions.medications}</p>
      <p>description: {prescriptions.description}</p>
      <h3>statues : {prescriptions.isAccepted === false ? <samp>pending</samp> : <samp>accepted</samp>}</h3>
      {currentRole === "pharmacist" && prescriptions.isAccepted === false ? <button onClick={approvePrescription}>pending</button> : <samp></samp>}

    </div>
  );
};

export default PrescriptionCard;
