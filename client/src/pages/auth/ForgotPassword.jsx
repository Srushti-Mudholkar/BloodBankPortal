import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import API from "../../utils/axios.js";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [sent, setSent] = React.useState(false);

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: Yup.object({ email: Yup.string().email("Invalid email").required("Email is required") }),
    onSubmit: async (values) => {
      try {
        const { data } = await API.post("/user/forgot-password", values);
        if (data.success) { setSent(true); toast.success("Reset link sent!"); }
        else toast.error(data.message);
      } catch (e) { toast.error("Error sending reset email"); }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🩸</div>
          <h2 className="text-3xl font-extrabold text-gray-900">Forgot Password</h2>
          <p className="text-gray-500 mt-1 text-sm">Enter your email to receive a reset link</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          {sent ? (
            <div className="text-center py-4">
              <div className="text-5xl mb-4">📧</div>
              <h3 className="font-bold text-gray-800 text-lg mb-2">Check your email</h3>
              <p className="text-gray-500 text-sm mb-6">We've sent a password reset link to your email address. It expires in 1 hour.</p>
              <Link to="/login" className="text-red-600 font-bold hover:underline">← Back to Login</Link>
            </div>
          ) : (
            <form onSubmit={formik.handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Email Address</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">✉️</span>
                  <input type="email" name="email" placeholder="you@example.com"
                    value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
                    className={`w-full pl-10 pr-4 py-3 rounded-2xl border text-sm outline-none transition-all
                      ${formik.touched.email && formik.errors.email ? "border-red-300 bg-red-50" : "border-gray-200 bg-gray-50 focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100"}`} />
                </div>
                {formik.touched.email && formik.errors.email && <p className="text-red-500 text-xs mt-1.5">⚠ {formik.errors.email}</p>}
              </div>
              <button type="submit" disabled={formik.isSubmitting}
                className="w-full py-3.5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 shadow-lg shadow-red-200 disabled:opacity-60 transition-all">
                {formik.isSubmitting ? "Sending..." : "Send Reset Link →"}
              </button>
              <p className="text-center text-sm text-gray-500">
                <Link to="/login" className="text-red-600 font-bold hover:underline">← Back to Login</Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
