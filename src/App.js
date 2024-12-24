import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";
import Login from "./pages/login/Login";
import Roles from "./pages/roles/Roles";
import DoctorPrescription from "./pages/doctorPrescription/DoctorPrescription";
import PharmacistHome from "./pages/pharmacistHome/PharmacistHome";
import PatientHome from "./pages/patientHome/PatientHome";
import Navbar from "./componant/navigation/Navbar";
import { useSelector } from "react-redux";

function App() {
  const role = useSelector((state) => state.userRole?.currentRole || null); // Get role from Redux store
  const { user } = usePrivy(); // Get user from Privy

  return (
    // // <Navbar/>
    // <PatientHome/>
    <Router>
      <Routes>
        {/* If the user is authenticated, go to Roles page, else go to Login */}
        <Route path="/" element={user ? <Roles /> : <Login />} />

        {/* Redirect to the appropriate page based on the role */}
        <Route
          path="/login"
          element={user ? ( // Check if the user is authenticated
            role === "doctor" ? (
              <Navigate to="/doctor-page" />
            ) : role === "pharmacist" ? (
              <Navigate to="/pharmacist-page" />
            )  : role === "patient" ? (
              <Navigate to="/patient-page" />
            ) : (
              <Navigate to="/" /> // If no role is set, redirect to roles page
            )
          ) : (
            <Login /> // If the user is not authenticated, stay on the login page
          )}
        />

        {/* Doctor-specific route */}
        <Route path="/doctor-page" element={<DoctorPrescription />} />

        {/* Pharmacist-specific route */}
        <Route path="/pharmacist-page" element={<PharmacistHome />} />

        <Route path="/patient-page" element={<PatientHome />} />

        {/* Fallback for undefined routes */}
        <Route
          path="*"
          element={<Navigate to={user ? "/" : "/login"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
