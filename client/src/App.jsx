// import './App.css'
import React,{useState} from 'react'
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import Login from './pages/auth/Login';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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
        {/* <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} /> */}

        {/* Donor */}
        {/* <Route path="/donor/dashboard" element={<ProtectedRoute allowedRoles={["donor"]}><DonorDashboard /></ProtectedRoute>} />
        <Route path="/donor/history" element={<ProtectedRoute allowedRoles={["donor"]}><DonorHistory /></ProtectedRoute>} />
        <Route path="/donor/requests" element={<ProtectedRoute allowedRoles={["donor"]}><DonorRequests /></ProtectedRoute>} /> */}

        {/* Organisation */}
        {/* <Route path="/organisation/dashboard" element={<ProtectedRoute allowedRoles={["organisation"]}><OrgDashboard /></ProtectedRoute>} />
        <Route path="/organisation/inventory" element={<ProtectedRoute allowedRoles={["organisation"]}><OrgInventory /></ProtectedRoute>} />
        <Route path="/organisation/donors" element={<ProtectedRoute allowedRoles={["organisation"]}><OrgDonors /></ProtectedRoute>} />
        <Route path="/organisation/hospitals" element={<ProtectedRoute allowedRoles={["organisation"]}><OrgHospitals /></ProtectedRoute>} />
        <Route path="/organisation/requests" element={<ProtectedRoute allowedRoles={["organisation"]}><OrgRequests /></ProtectedRoute>} /> */}

        {/* Hospital */}
        {/* <Route path="/hospital/dashboard" element={<ProtectedRoute allowedRoles={["hospital"]}><HospitalDashboard /></ProtectedRoute>} />
        <Route path="/hospital/history" element={<ProtectedRoute allowedRoles={["hospital"]}><HospitalHistory /></ProtectedRoute>} />
        <Route path="/hospital/requests" element={<ProtectedRoute allowedRoles={["hospital"]}><HospitalRequests /></ProtectedRoute>} /> */}

        {/* Admin */}
        {/* <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/donors" element={<ProtectedRoute allowedRoles={["admin"]}><AdminDonors /></ProtectedRoute>} />
        <Route path="/admin/hospitals" element={<ProtectedRoute allowedRoles={["admin"]}><AdminHospitals /></ProtectedRoute>} />
        <Route path="/admin/organisations" element={<ProtectedRoute allowedRoles={["admin"]}><AdminOrganisations /></ProtectedRoute>} /> */}

        {/* Profile — all roles */}
        {/* <Route path="/profile" element={<ProtectedRoute allowedRoles={["donor","organisation","hospital","admin"]}><Profile /></ProtectedRoute>} /> */}

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
