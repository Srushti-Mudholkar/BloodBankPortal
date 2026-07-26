import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../utils/axios.js";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying"); // "verifying" | "success" | "error"

  useEffect(() => {
    const verify = async () => {
      try {
        const { data } = await API.get(`/auth/verify-email/${token}`);
        if (data.success) {
          setStatus("success");
          setTimeout(() => navigate("/login"), 3000); // redirect to login after 3s
        } else {
          setStatus("error");
        }
      } catch (e) {
        setStatus("error");
      }
    };
    verify();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10 max-w-md w-full text-center">
        <div className="text-5xl mb-4">🩸</div>
        <h1 className="text-2xl font-extrabold text-gray-900 mb-2">BloodCare</h1>

        {status === "verifying" && (
          <>
            <div className="w-8 h-8 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mx-auto my-6" />
            <p className="text-gray-500">Verifying your email...</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="text-5xl my-6">✅</div>
            <h2 className="text-xl font-bold text-green-600 mb-2">Email Verified!</h2>
            <p className="text-gray-500 text-sm">Your account is now active. Redirecting to login...</p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="text-5xl my-6">❌</div>
            <h2 className="text-xl font-bold text-red-600 mb-2">Verification Failed</h2>
            <p className="text-gray-500 text-sm mb-6">The link is invalid or has already been used.</p>
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-3 bg-red-600 text-white rounded-2xl font-bold text-sm hover:bg-red-700 transition-colors">
              Go to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
