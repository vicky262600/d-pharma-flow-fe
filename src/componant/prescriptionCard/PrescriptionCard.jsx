import React from 'react';
import { useSelector } from 'react-redux';
import './PrescriptionCard.css'; // Import CSS file for styling

const PrescriptionCard = ({ prescriptions }) => {
  console.log(prescriptions.patientId);
  const currentRole = useSelector((state) => state.userRole.currentRole); // Access the current role from the Redux store
  console.log(currentRole);
  return (
    <div className="prescription-card">
      <h4>patientId: {prescriptions.patientId}</h4>
      <p>medications: {prescriptions.medications}</p>
      <p>description: {prescriptions.description}</p>
      {currentRole == "pharmasict"}
    </div>
  );
};

export default PrescriptionCard;
