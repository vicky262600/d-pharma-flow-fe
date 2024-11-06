import React, { useRef } from 'react';
import './DoctorPrescription.css';
import PrescriptionCard from '../../componant/prescriptionCard/PrescriptionCard';
import axios from 'axios';

const DoctorPrescription = () => {
  const description = useRef();
  const patientName = useRef();
  const patientEmail = useRef();
  const medications = useRef();
  const pharmacyId = useRef();

  const handleClick = async (e) => {
    e.preventDefault();
    const newPrescription = {
      patientName: patientName.current.value,
      patientEmail: patientEmail.current.value,
      medications: medications.current.value,
      description: description.current.value,
      pharmacyId: pharmacyId.current.value,
    };
    try {
      await axios.post('http://localhost:5000/api/v1/prescriptions', newPrescription);
      console.log("Prescription created successfully");
    } catch (err) {
      console.error("Error creating prescription:", err);
    }
  };

  const prescriptions = [
    {
      id: 1,
      patientName: "SRk",
      medications: "dola 650",
      pharmacyID: "c0921730",
      status: "pending",
    },
    {
      id: 2,
      patientName: "VK",
      medications: "Metasine",
      pharmacyID: "a0021450",
      status: "pending",
    },
  ];

  return (
    <div className="prescription-page">
      <div className="form-container">
        <h2>Create New Prescription</h2>
        <form onSubmit={handleClick}>
          <div className="form-group">
            <label htmlFor="patientName">Patient Name:</label>
            <input type="text" id="patientName" placeholder="Enter patient name" required ref={patientName} />
          </div>
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
        {prescriptions.map((prescriptions) => (
          <PrescriptionCard key={prescriptions.id} prescriptions={prescriptions} />
        ))}
      </div>
    </div>
  );
};


export default DoctorPrescription;
