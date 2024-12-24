import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useSelector } from 'react-redux';
import PrescriptionCard from '../../componant/prescriptionCard/PrescriptionCard';
import { contractAbi, contractAddress } from '../../constant/constant';
import { usePrivy } from '@privy-io/react-auth';

const PatientHome = () => {
  const { user } = usePrivy();
  const userAddress = user.id;
  const [prescriptions, setPrescriptions] = useState([]);

  const fetchPrescriptions = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
      
      // Fetch prescriptions associated with the patient (filter by patient address)
      const prescriptionsFromContract = await contractInstance.getPatientPrescription();
      setPrescriptions(prescriptionsFromContract);
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
    }
  };

  const getDonation = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract( contractAddress, contractAbi, signer);

    const tx = contractInstance.withdrawDonation();
    console.log(tx);
  }

  useEffect(() => {
    if (userAddress) {
      fetchPrescriptions();
    }
  }, [userAddress]);

  return (
    <div>
      <div>
        <h1>Your Prescriptions</h1>
        {prescriptions.length > 0 ? (
          prescriptions.map((prescription, index) => (
            <PrescriptionCard key={index} prescription={prescription} />
          ))
        ) : (
          <p>No prescriptions found.</p>
        )}
      </div>
      <div>
        <span>You can get 7% of the current balance</span>
        <button onClick={getDonation}>Need Donation</button>
      </div>
    </div>
  );
};

export default PatientHome;
