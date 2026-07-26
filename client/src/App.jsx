import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";

import DonorDashboard from "./pages/donor/DonorDashboard.jsx";
import DonorHistory from "./pages/donor/DonorHistory.jsx";
import DonorRequests from "./pages/donor/DonorRequests.jsx";

import OrgDashboard from "./pages/organisation/OrgDashboard.jsx";
import OrgInventory from "./pages/organisation/OrgInventory.jsx";
import OrgDonors from "./pages/organisation/OrgDonors.jsx";
import OrgHospitals from "./pages/organisation/OrgHospitals.jsx";
import OrgRequests from "./pages/organisation/OrgRequests.jsx";

import HospitalDashboard from "./pages/hospital/HospitalDashboard.jsx";
import HospitalHistory from "./pages/hospital/HospitalHistory.jsx";
import HospitalRequests from "./pages/hospital/HospitalRequests.jsx";

import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminDonors from "./pages/admin/AdminDonors.jsx";
import AdminHospitals from "./pages/admin/AdminHospitals.jsx";
import AdminOrganisations from "./pages/admin/AdminOrganisations.jsx";

import Profile from "./pages/Profile.jsx";
import ForgotPassword from "./pages/auth/ForgotPassword.jsx";
import ResetPassword from "./pages/auth/ResetPassword.jsx";
import VerifyEmail from "./pages/auth/VerifyEmail.jsx";



// Protected Route wrapper
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, token } = useSelector((state) => state.auth);
  if (!token || !user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role))
    return <Navigate to="/login" replace />;
  return children;
};

function App() {
  // const [isAvailable,showAvailable] = useState(false);

  return (
    <>
      <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        {/* Public */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />

        {/* Donor */}
        <Route path="/donor/dashboard" element={<ProtectedRoute allowedRoles={["donor"]}><DonorDashboard /></ProtectedRoute>} />
        <Route path="/donor/history" element={<ProtectedRoute allowedRoles={["donor"]}><DonorHistory /></ProtectedRoute>} />
        <Route path="/donor/requests" element={<ProtectedRoute allowedRoles={["donor"]}><DonorRequests /></ProtectedRoute>} />

        {/* Organisation */}
        <Route path="/organisation/dashboard" element={<ProtectedRoute allowedRoles={["organisation"]}><OrgDashboard/></ProtectedRoute>} />
        <Route path="/organisation/inventory" element={<ProtectedRoute allowedRoles={["organisation"]}><OrgInventory /></ProtectedRoute>} />
        <Route path="/organisation/donors" element={<ProtectedRoute allowedRoles={["organisation"]}><OrgDonors /></ProtectedRoute>} />
        <Route path="/organisation/hospitals" element={<ProtectedRoute allowedRoles={["organisation"]}><OrgHospitals /></ProtectedRoute>} />
        <Route path="/organisation/requests" element={<ProtectedRoute allowedRoles={["organisation"]}><OrgRequests /></ProtectedRoute>} /> 

        {/* Hospital */}
        <Route path="/hospital/dashboard" element={<ProtectedRoute allowedRoles={["hospital"]}><HospitalDashboard /></ProtectedRoute>} />
        <Route path="/hospital/history" element={<ProtectedRoute allowedRoles={["hospital"]}><HospitalHistory /></ProtectedRoute>} />
        <Route path="/hospital/requests" element={<ProtectedRoute allowedRoles={["hospital"]}><HospitalRequests /></ProtectedRoute>} /> 

        {/* Admin */}
        <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/donors" element={<ProtectedRoute allowedRoles={["admin"]}><AdminDonors /></ProtectedRoute>} />
        <Route path="/admin/hospitals" element={<ProtectedRoute allowedRoles={["admin"]}><AdminHospitals /></ProtectedRoute>} />
        <Route path="/admin/organisations" element={<ProtectedRoute allowedRoles={["admin"]}><AdminOrganisations /></ProtectedRoute>} /> 

        {/* Profile — all roles */}
        <Route path="/profile" element={<ProtectedRoute allowedRoles={["donor","organisation","hospital","admin"]}><Profile /></ProtectedRoute>} /> 

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
