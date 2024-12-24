import axios from 'axios';
import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useSelector } from 'react-redux';
import PrescriptionCard  from '../../componant/prescriptionCard/PrescriptionCard';
import { contractAbi, contractAddress } from '../../constant/constant';


const PharmacistHome = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const user = useSelector((state) => state.user.currentUser);
  const userId = user._id;
  const fetchPrescription = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
    const prescription = await contractInstance.getPharmacyPrescription();
    setPrescriptions(prescription);
  }
  return (
    <div>
      <div>
        <h1>Your Orders</h1>
        {prescriptions.length > 0 ? (
          prescriptions.map((prescription, index) => (
            <PrescriptionCard key={index} prescription={prescription} />
          ))
        ) : (
          <p>No prescriptions found.</p>
        )}
      </div>
    </div>
  );
}

export default PharmacistHome