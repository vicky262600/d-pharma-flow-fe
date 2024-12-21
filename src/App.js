import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";
import Login from "./pages/login/Login";
import Roles from "./pages/roles/Roles";
import DoctorPrescription from "./pages/doctorPrescription/DoctorPrescription";
import PharmacistHome from "./pages/pharmacistHome/PharmacistHome";
import { useSelector } from "react-redux";

function App() {
  const role = useSelector((state) => state.role.role); // Get role from Redux store
  const { user } = usePrivy(); // Get user from Privy

  return (
    <Router>
      <Routes>
        {/* If the user is authenticated, go to Roles page, else go to Login */}
        <Route path="/" element={user ? <DoctorPrescription /> : <Login />} />

        {/* Redirect to the appropriate page based on the role */}
        <Route
          path="/login"
          element={
            role === "doctor" ? (
              <Navigate to="/doctor-prescription" />
            ) : role === "pharmacist" ? (
              <Navigate to="/pharmacist" />
            ) : (
              <DoctorPrescription />
            )
          }
        />

        {/* Doctor-specific route */}
        <Route path="/doctor-prescription" element={<DoctorPrescription />} />

        {/* Pharmacist-specific route */}
        <Route path="/pharmacist" element={<PharmacistHome />} />

        {/* Fallback for undefined roles */}
        <Route
          path="*"
          element={<Navigate to={user ? "/" : "/login"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
