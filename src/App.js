import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

import Landing from "./pages/landing/Landing";
import Register from "./pages/register/Register";
import DoctorRegister from "./pages/doctorRegister.jsx/DoctorRegister";
import PatientRegister from "./pages/patientRegister/PatientRegister";
import PharmacistRegister from "./pages/pharmacistRegister/PharmacistRegister";
import DoctorPrescription from "./pages/doctorPrescription/DoctorPrescription";
import Login from "./pages/login/Login";
import PatientHome from "./pages/patientHome/PatientHome";
import PharmacistHome from "./pages/pharmacistHome/PharmacistHome";

function App() {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route
          path="/"
          element={user ? <Navigate to={`/${user.role}-home`} /> : <Landing />}
        />

        {/* Login */}
        <Route
          path="/login"
          element={user ? <Navigate to={`/${user.role}-home`} /> : <Login />}
        />

        {/* Register */}
        <Route
          path="/register"
          element={user ? <Navigate to={`/${user.role}-home`} /> : <Register />}
        />
        <Route
          path="/register/doctor"
          element={user ? <Navigate to="/doctor-home" /> : <DoctorRegister />}
        />
        <Route
          path="/register/pharmacist"
          element={
            user ? <Navigate to="/pharmacist-home" /> : <PharmacistRegister />
          }
        />
        <Route
          path="/register/patient"
          element={user ? <Navigate to="/patient-home" /> : <PatientRegister />}
        />

        {/* Role-Specific Routes */}
        <Route
          path="/doctor-home"
          element={user?.role === "doctor" ? <DoctorPrescription /> : <Login />}
        />
        <Route
          path="/patient-home"
          element={user?.role === "patient" ? <PatientHome /> : <Login />}
        />
        <Route
          path="/pharmacist-home"
          element={user?.role === "pharmacist" ? <PharmacistHome /> : <Login />}
        />
      </Routes>
    </Router>
  );
}

export default App;
