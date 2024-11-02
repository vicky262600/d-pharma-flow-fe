import React from 'react';
import './DoctorPrescription.css';
import PrescriptionCard from '../../componant/prescriptionCard/PrescriptionCard';

const DoctorPrescription = () => {
  const prescriptions = [
    {
        "id": 1,
        "patientName": "SRk",
        "medications": "dola 650",
        "pharmacyID": "c0921730",
        "Status": "pending"
    },
    {
        "id": 2,
        "patientName": "VK",
        "medications": "Metasine",
        "pharmacyID": "a0021450",
        "Status": "pending"

    }
];

  return (
    <div className="prescription-page">
      <div className="form-container">
        <h2>Create New Prescription</h2>
        <form>
          <div className="form-group">
            <label htmlFor="patientName">Patient Name:</label>
            <input type="text" id="patientName" placeholder="Enter patient name" required />
          </div>
          <div className="form-group">
            <label htmlFor="medications">Medications:</label>
            <textarea id="medications" rows="4" placeholder="Enter medication details" required></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="pharmacyId">Pharmacy ID:</label>
            <input type="text" id="pharmacyId" placeholder="Enter pharmacy ID" required />
          </div>
          <button type="submit">Create Prescription</button>
        </form>
      </div>
      
      <div className="card-container">
      {/* {prescriptions
        .filter((prescription) => prescription.id === 1) // Only keep prescriptions with id of 1
        .map((prescription) => (
          <div key={prescription.id} className="prescription-card">
            <h4>{prescription.patientName}</h4>
            <p>{prescription.medications}</p> */}
        {
          prescriptions.map((prescriptions)=>(
            <PrescriptionCard key={prescriptions.id} prescriptions={prescriptions}/>
          ))
        }
      </div>
    </div>
  );
};

export default DoctorPrescription;
