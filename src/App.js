import React from "react";
import ReactDOM from "react-dom/client";
import Landing from "./pages/landing/Landing";
import Register from "./pages/register/Register";
import DoctorRegister from "./pages/doctorRegister.jsx/DoctorRegister";
import PatientRegister from "./pages/patientRegister/PatientRegister";
import PharmacistRegister from "./pages/pharmacistRegister/PharmacistRegister";
import DoctorPrescription from "./pages/doctorPrescription/DoctorPrescription";
import Prescription from "./componant/prescriptionCard/PrescriptionCard";
import Login from "./pages/login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <DoctorPrescription /> : <Landing />} />
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/register" element={<Register />} /> */}
        <Route
          path="/login"
          element={user ? <DoctorPrescription /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <DoctorPrescription /> : <Register />}
        />
        <Route
          path="/register/doctor"
          element={user ? <DoctorPrescription /> : <DoctorRegister />}
        />
        <Route
          path="/register/pharmacist"
          element={user ? <DoctorPrescription /> : <PharmacistRegister />}
        />
        <Route
          path="/register/patient"
          element={user ? <DoctorPrescription /> : <PatientRegister />}
        />
        <Route
          path="/docter-prescription"
          element={user ? <DoctorPrescription /> : <Login />}
        />
        {/* <Route path="/" element={<DoctorPrescription />} /> */}
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
