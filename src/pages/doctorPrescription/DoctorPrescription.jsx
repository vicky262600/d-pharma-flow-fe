import React, { useEffect, useRef, useState } from 'react';
import './DoctorPrescription.css';
import { contractAbi, contractAddress } from '../../constant/constant';
import { ethers } from 'ethers';
import PrescriptionCard from '../../componant/prescriptionCard/PrescriptionCard';
import { usePrivy } from '@privy-io/react-auth';
// import axios from 'axios';
import { useSelector } from 'react-redux';
import { current } from '@reduxjs/toolkit';

const DoctorPrescription = () => {
  // const { user, logout } = usePrivy();
  const description = useRef();
  const patientEmail = useRef();
  const medications = useRef();
  const pharmacyId = useRef();
  // const user = useSelector((state) => state.user.currentUser);
  const [prescriptions, setPrescriptions] = useState([]);

  // console.log("Logged-in User ID:", user.id);
  const {user, logout} = usePrivy();
  const userId = user.id;

  // useEffect(() => {
  //   const fetchPrescripition = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:5000/api/v1/prescription/"+ userId);
  //       console.log("Fetched Prescriptions:", response.data);
  //       setPrescriptions(response.data);
  //     } catch (err) {
  //       console.error("Error fetching prescriptions:", err);
  //     }
  //   };

  //   fetchPrescripition();
  // }, [userId]);

  const LogOut = () =>{
    logout();
  }

  const handleClick = async (e) => {
    e.preventDefault();

    const userAddress = user.linkedAccounts[0].address;
    console.log("account:", userAddress);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    console.log(signer);

    const constractInstance = new ethers.Contract(
      contractAddress, contractAbi, signer
    );

    let PatientEmail = ethers.utils.getAddress(patientEmail.current.value);
    let Medications = medications.current.value;
    let Description = description.current.value;
    const PharmacyId = ethers.utils.getAddress(pharmacyId.current.value); // Fix checksum here
    console.log(PatientEmail);

    const tx = await constractInstance.addPrescription(Description, Medications, PatientEmail, PharmacyId);
    const receipt = await tx.wait();
    console.log(receipt);
  };

  return (
    <div className="prescription-page">
      <div className="form-container">
        <h2>Create New Prescription</h2>
        <form onSubmit={handleClick}>
          <div className="form-group">
            <label htmlFor="patientEmail">Patient Email:</label>
            <input type="text" id="patientEmail" placeholder="Enter patient email" required ref={patientEmail} />
          </div>
          <div className="form-group">
            <label htmlFor="medications">Medications:</label>
            <textarea id="medications" rows="4" placeholder="Enter medication details" required ref={medications}></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea id="description" rows="4" placeholder="Enter description" required ref={description}></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="pharmacyId">Pharmacy ID:</label>
            <input type="text" id="pharmacyId" placeholder="Enter pharmacy ID"  required ref={pharmacyId} />
          </div>
          <button type="submit">Create Prescription</button>
          <button onClick={LogOut}>logout</button>
        </form>
      </div>

      <div className="card-container">
        {prescriptions.length > 0 ? (
          prescriptions.map((prescription) => (
            <PrescriptionCard key={prescription._id} prescriptions={prescription} />
          ))
        ) : (
          <p>No prescriptions found.</p>
        )}
      </div>
    </div>
  );
};

export default DoctorPrescription;
