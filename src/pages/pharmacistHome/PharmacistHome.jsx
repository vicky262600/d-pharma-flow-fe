import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import PrescriptionCard  from '../../componant/prescriptionCard/PrescriptionCard';

const PharmacistHome = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const user = useSelector((state) => state.user.currentUser);
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
  }, [userId, prescriptions]);
  return (
    <div>
      <div>
        <h1>Your Orders</h1>
        {prescriptions.length > 0 ? (
          prescriptions.map((prescription) => (
            <PrescriptionCard key={prescription._id} prescription={prescription} />
          ))
        ) : (
          <p>No prescriptions found.</p>
        )}
      </div>
    </div>
  );
}

export default PharmacistHome