import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams, useNavigate, Link } from "react-router-dom";
import API from "../../utils/axios.js";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { newPassword: "", confirmPassword: "" },
    validationSchema: Yup.object({
      newPassword: Yup.string().min(6, "Min 6 characters").required("Password is required"),
      confirmPassword: Yup.string().oneOf([Yup.ref("newPassword")], "Passwords do not match").required("Please confirm"),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await API.put(`/user/reset-password/${token}`, values);
        if (data.success) { toast.success("Password reset! Please login."); navigate("/login"); }
        else toast.error(data.message);
      } catch (e) { toast.error(e.response?.data?.message || "Invalid or expired link"); }
    },
  });

  const inputClass = "w-full px-4 py-3 rounded-2xl border text-sm outline-none transition-all border-gray-200 bg-gray-50 focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🔒</div>
          <h2 className="text-3xl font-extrabold text-gray-900">Reset Password</h2>
          <p className="text-gray-500 mt-1 text-sm">Enter your new password below</p>
        </div>
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          <form onSubmit={formik.handleSubmit} className="space-y-5">
            {[
              { name: "newPassword", label: "New Password" },
              { name: "confirmPassword", label: "Confirm Password" },
            ].map((f) => (
              <div key={f.name}>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{f.label}</label>
                <input type="password" name={f.name} placeholder="••••••••"
                  value={formik.values[f.name]} onChange={formik.handleChange} onBlur={formik.handleBlur}
                  className={inputClass} />
                {formik.touched[f.name] && formik.errors[f.name] && <p className="text-red-500 text-xs mt-1.5">⚠ {formik.errors[f.name]}</p>}
              </div>
            ))}
            <button type="submit" disabled={formik.isSubmitting}
              className="w-full py-3.5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 shadow-lg shadow-red-200 disabled:opacity-60 transition-all">
              {formik.isSubmitting ? "Resetting..." : "Reset Password →"}
            </button>
            <p className="text-center text-sm text-gray-500">
              <Link to="/login" className="text-red-600 font-bold hover:underline">← Back to Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
