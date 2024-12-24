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
  const [prescriptions, setPrescriptions] = useState([]);

  // const { user, logout } = usePrivy();
  const currentRole = useSelector((state) => state.userRole.currentRole); // Access the current role from the Redux store
  console.log(currentRole);
  const description = useRef();
  const patientId = useRef();
  const medications = useRef();
  const pharmacyId = useRef();
  // const user = useSelector((state) => state.user.currentUser);

  // console.log("Logged-in User ID:", user.id);
  const {user, logout} = usePrivy();
  const userId = user;

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

    const PatientId = ethers.utils.getAddress(patientId.current.value);
    const Medications = medications.current.value;
    const Description = description.current.value;
    const PharmacyId = ethers.utils.getAddress(pharmacyId.current.value); // Fix checksum here
    console.log(PatientId);

    const tx = await constractInstance.addPrescription(Description, Medications, PatientId, PharmacyId);
    const receipt = await tx.wait();
    console.log(receipt);
  };

    const fetchPrescripitions = async () =>{
       const provider = new ethers.providers.Web3Provider(window.ethereum);
       const signer = provider.getSigner();
       const contractInstance = new ethers.Contract(
        contractAddress, contractAbi, signer
       );
       var prescription = await contractInstance.getDoctorPrescription();
       setPrescriptions(prescription);
      //  console.log(prescription[0].doctorId)
    }

  return (
    <div className="prescription-page">
      <div className="form-container">
        <h2>Create New Prescription</h2>
        <form onSubmit={handleClick}>
          <div className="form-group">
            <label htmlFor="patientEmail">PatientId:</label>
            <input type="text" id="patientEmail" placeholder="Enter patient email" required ref={patientId} />
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
        </form>
      </div>

      <div className="card-container">
        {prescriptions.length > 0 ? (
          prescriptions.map((prescription, index) => (
            <PrescriptionCard key={index} prescriptions={prescription} />
          ))
        ) : (
          <p>No prescriptions found.</p>
        )}
        <button onClick={fetchPrescripitions}>Get Prescription</button>
        <button onClick={LogOut}>logout</button>
      </div>
    </div>
  );
};

export default DoctorPrescription;
