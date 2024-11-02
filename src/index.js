import React from "react";
import ReactDOM from "react-dom/client";
import Landing from "./pages/landing/Landing";
import Register from "./pages/register/Register";
import DoctorRegister from "./pages/doctorRegister.jsx/DoctorRegister";
import PatientRegister from "./pages/patientRegister/PatientRegister";
import DoctorPrescription from "./pages/doctorPrescription/DoctorPrescription";
import Prescription from "./componant/prescriptionCard/PrescriptionCard";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <Landing /> */}
    {/* <Register /> */}
    {/* <DoctorRegister /> */}
    {/* <PatientRegister /> */}
    <DoctorPrescription />
    {/* <Prescription /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
