import React from 'react';
import './PrescriptionCard.css'; // Import CSS file for styling

const PrescriptionCard = ({ prescriptions }) => {
  return (
    <div className="prescription-card">
      <h4>{prescriptions.patientName}</h4>
      <p>{prescriptions.medications}</p>
      {/* <span className={`status ${prescriptions.Status.toLowerCase()}`}>{prescriptions.Status}</span> */}
    </div>
  );
};

export default PrescriptionCard;
