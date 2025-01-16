import React, { useEffect, useState } from 'react';
import Navbar from '../../componant/navigation/Navbar';
import { ethers } from 'ethers';
import { useSelector } from 'react-redux';
import PrescriptionCard from '../../componant/prescriptionCard/PrescriptionCard';
import { contractAbi, contractAddress } from '../../constant/constant';
import { usePrivy } from '@privy-io/react-auth';
import './PharmacistHome.css';

const PharmacistHome = () => {
  const { user } = usePrivy();
  let userAddress = user.id;
  const [prescriptions, setPrescriptions] = useState([]);
  const currentRole = useSelector((state) => state.userRole.currentRole); // Access the current role from the Redux store
  console.log(currentRole);

  const fetchPrescription = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
    const prescription = await contractInstance.getPharmacyPrescription();
    setPrescriptions(prescription);
    console.log(prescription);
  };

  useEffect(()=>{
    fetchPrescription();
  },[userAddress]);

  return (
    <div className="container">
      <Navbar/>
      <h1>Your Orders</h1>
      <div className="prescription-list">
        {prescriptions.length > 0 ? (
          prescriptions.map((prescription, index) => (
            <PrescriptionCard key={index} index={index}prescriptions={prescription} />
          ))
        ) : (
          <p>No prescriptions found.</p>
        )}
      </div>
      <button onClick={fetchPrescription}>Refresh Prescription</button>
    </div>
  );
};

export default PharmacistHome;
