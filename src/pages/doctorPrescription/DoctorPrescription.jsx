import React, { useEffect, useRef, useState } from 'react';
import './DoctorPrescription.css';
import PrescriptionCard from '../../componant/prescriptionCard/PrescriptionCard';
import axios from 'axios';
import { useSelector } from 'react-redux';

const DoctorPrescription = () => {
  const description = useRef();
  const patientEmail = useRef();
  const medications = useRef();
  const pharmacyId = useRef();
  const user = useSelector((state) => state.user.currentUser);
  const [prescriptions, setPrescriptions] = useState([]);

  console.log("Logged-in User ID:", user._id);

  const userId = user._id;

  useEffect(() => {
    const fetchPrescripition = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/prescription/"+ userId);
        console.log("Fetched Prescriptions:", response.data);
        setPrescriptions(response.data);
      } catch (err) {
        console.error("Error fetching prescriptions:", err);
      }
    };

    fetchPrescripition();
  }, [userId]);

  const handleClick = async (e) => {
    e.preventDefault();
    const newPrescription = {
      patientEmail: patientEmail.current.value,
      medications: medications.current.value,
      description: description.current.value,
      pharmacyId: pharmacyId.current.value,
      doctorId: user._id,
    };
    try {
      await axios.post('http://localhost:5000/api/v1/prescription/create', newPrescription);
      console.log("Prescription created successfully");
      // Refresh prescriptions after creation
      // const updatedPrescriptions = await axios.get("http://localhost:5000/api/v1/prescription", {
      //   params: { userId: user._id },
      // });
      // setPrescriptions(updatedPrescriptions.data);
    } catch (err) {
      console.error("Error creating prescription:", err);
    }
  };

  return (
    <div className="prescription-page">
      <div className="form-container">
        <h2>Create New Prescription</h2>
        <form onSubmit={handleClick}>
          <div className="form-group">
            <label htmlFor="patientEmail">Patient Email:</label>
            <input type="email" id="patientEmail" placeholder="Enter patient email" required ref={patientEmail} />
          </div>
          <div className="form-group">
            <label htmlFor="medications">Medications:</label>
            <textarea id="medications" rows="4" placeholder="Enter medication details" required ref={medications}></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea id="description" rows="4" placeholder="Enter description" ref={description}></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="pharmacyId">Pharmacy ID:</label>
            <input type="text" id="pharmacyId" placeholder="Enter pharmacy ID" required ref={pharmacyId} />
          </div>
          <button type="submit">Create Prescription</button>
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
